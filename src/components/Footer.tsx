import styles from '../styles/Footer.module.css';
import Link from "next/link";

type loginType = {
    login?: boolean
}

export default function Footer({login}: loginType) {
    return <footer className={styles.footer}>
        {login && <div>Уже есть аккаунт? <Link href={'/login'}>Войти</Link></div>}
        {!login && <div>Ещё нет аккаунта? <Link href={'/register'}>Зарегистрироваться</Link></div>}
    </footer>
}
