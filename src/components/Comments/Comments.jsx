import styles from './Comments.module.css'
import { useComments } from '../../hooks/useComments'
import { Modal } from '../Modal/Modal'
import { useState } from 'react'
import { useFunction } from '../../hooks/useFunction'

export const Comments = () => {
  const [modal, setModal] = useState(false)
  const { ToastContainer } = useFunction()

  const { 
    comment, 
    comments, 
    handleChange, 
    handleSubmit, 
    handleDelete, 
    handleUpdate,
    handleLike,
    handleUnlike,
    handleEdit,
    id, 
    user, 
    isAuthenticated,
    isEditing,
    editingItem,
    textAreaRef
  } = useComments()

  return (
    <section className={styles.comments}>
      <h2>Mi comentario</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea onChange={handleChange} name='text' value={comment.text}></textarea>
        <button type='submit' className={styles.buttonAddComment}>Agregar comentario</button>
      </form>

      <main className={styles.usersComments}>
        <h2>Comentarios</h2>
        <ul>
        {
          isAuthenticated && comments.length > 0 && comments.map(el => {
            return (
              <li className={isAuthenticated && id === el.publicationId ? '' : styles.hide} key={el.id}>
                <header>
                  <img src={el.image} alt={el.username} title={el.username} />
                  <span>{el.username}</span>
                </header>

                { 
                  isEditing && editingItem === el.id
                  ? <textarea ref={editingItem === el.id ? textAreaRef : undefined} className={styles.editInput} type="text" onChange={handleChange} name='text' value={comment.text}></textarea>
                  : <p>{el.text}</p>
                }

                <div className={styles.like}>
                  <span
                    className={styles.buttonLike}
                    onClick={() => handleLike(el.id, el.like)} 
                    title='Me gusta'>
                    <i className='bx bx-like'></i>
                  </span>
                  <span className={styles.counter}>{el.like}</span>
                </div>

                <div className={styles.unlike}>
                  <span
                    className={styles.buttonUnlike}
                    onClick={() => handleUnlike(el.id, el.unlike)} 
                    title='No me gusta'>
                   <i className='bx bx-dislike' ></i>
                  </span>
                  <span className={styles.counter}>{el.unlike}</span>
                </div>

                <div className={styles.fecha}>
                  <span>{el.createdAt.slice(0, 10) + ' ' + el.createdAt.slice(11, 16)}</span>
                </div>

                <div className={styles.deleteButton}>
                { modal && 
                  <Modal 
                    setModal={setModal} 
                    titulo='¿Estás seguro?' 
                    mensaje={'Esta acción ELIMINARÁ tu comentario'} 
                    textButton1={'Eliminar'} 
                    textButton2={'Cancelar'} 
                    handleFunction={handleDelete} 
                    el={el}
                  />
                }
                  <span 
                    className={isAuthenticated && el.userID === user.email ? '' : styles.hide} 
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"
                    onClick={() => setModal(true)}
                    title='Eliminar comentario'>
                    <i className='bx bx-trash'></i>
                  </span>
                </div>

                <div className={isAuthenticated && el.userID === user.email ? styles.editButton : styles.hide}>
                  <span
                    className={isEditing && editingItem === el.id ? styles.isEditing : ''}
                    onClick={() => handleEdit(el.id, el.text)}
                    title='Editar comentario'>
                    <i className='bx bx-edit'></i>
                  </span>
                </div>

                <div className={isEditing && editingItem === el.id ? styles.updateButton : styles.hide}>
                  <button
                    onClick={() => handleUpdate(el.id, comment.text)}
                    title='Actualizar comentario'>Actualizar
                  </button>
                </div>
              </li>
            )
          })
        }
        </ul>
        <ToastContainer />
      </main>
    </section>
  )
}
