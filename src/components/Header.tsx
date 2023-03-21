import Image from "next/image";
import styles from '../styles/Header.module.css';
import Link from "next/link";

export default function Header({ user }) {

    return <header className={styles.header}>
        <div className={styles.logo_group}>
            <Link href={'/'} title={'Back to the Future'}>
                <Image src={'/logo-yoldi.svg'} alt={'Hello Logo'} width={80} height={50} />
            </Link>
            <p className={styles.slogan}>Разрабатываем и запускаем <br/>сложные веб проекты</p>
        </div>
        <div className={'user-group'}>
            {user ? (
                <Link href={`/account/owner/${user.slug}`}>
                    <div className={styles.profile}>
                        <span className={styles.profileName}>{user.name}</span>
                        {user.image ?
                            <Image src={user.image} alt={user.name} /> :
                            <div className={styles.noAvatar}>{user?.name[0]}</div>
                        }
                    </div>
                </Link>
                )
            : (
                <Link href={'/login'} className={styles.btn}>Войти</Link>
                )
            }
        </div>
    </header>
}
