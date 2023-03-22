import Link from "next/link";
import styles from '@/styles/Home.module.css'
import Layout from '../components/Layout'

export default function Home() {

  return (
    <Layout title={'Добро пожаловать'}>
        <main className={styles.main}>
            <div>
                <h1>Привет!</h1>
                <p>Меня зовут <Link className={styles.link}  href={'https://github.com/errand'}>Саша</Link>, я web-разработчик.</p>
                <p>Сайт, на которм ты находишься сделан в рамках  <Link className={styles.link} target={'_blank'} href={'https://yoldi-agency.notion.site/Yoldi-7552752e30964431ab0ca03d54908148'}>тестового задания</Link> для <Link className={styles.link}  href={'https://yoldi.agency/development'}>Yoldi</Link>.</p>
                <p>Это мой первый опыт c Next.js, но не первый с React.</p>
            </div>
        </main>
    </Layout>
  )
}
