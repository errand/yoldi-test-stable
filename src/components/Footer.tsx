import styles from '../styles/Footer.module.css';
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Footer() {

    const [login, setLogin] = useState(true);

    const { asPath } = useRouter()

    useEffect(() => {
        if(asPath.includes('login')) setLogin(false)
    }, [])

    return <footer className={styles.footer}>
        {login && <div>Уже есть аккаунт? <Link href={'/login'}>Войти</Link></div>}
        {!login && <div>Ещё нет аккаунта? <Link href={'/register'}>Зарегистрироваться</Link></div>}
    </footer>
}
