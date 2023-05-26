import styles from './BlogMostViewed.module.css'
import { usePublications } from '../../hooks/usePublications'
import { NavLink } from 'react-router-dom'

export const BlogMostViewed = () => {
  const { category } = usePublications()

  return (
    <div className={styles.containerBlog}>
      <main className={styles.main}>
        <div className={styles.rightMenu}>
          <h2>Lo más visto</h2>
          {category && category.map(el => {
            return (
              <ul key={el.id}>
                <li className={styles.rightMenuItem}>
                <img src={el.image} alt={el.title} />
                  <div className={styles.rightMenuItemText}>
                    <span>{el.date}</span>
                    <NavLink style={{ textDecoration: 'none' }} to={`/blog/${el.id}`}><h3>{el.title}</h3></NavLink>
                  </div>
                </li>
              </ul>
            )
          })}
        </div>
      </main>
    </div>
  )
}
