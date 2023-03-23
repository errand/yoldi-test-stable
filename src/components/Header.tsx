import Image from "next/image";
import styles from '../styles/Header.module.css';
import Link from "next/link";
import {profile} from "../types/profileType";

export default function Header({ profile }: {profile: profile}) {

    return <header className={styles.header}>
        <div className={styles.logo_group}>
            <Link href={'/'} title={'Back to the Future'}>
                <Image src={'/logo-yoldi.svg'} alt={'Hello Logo'} width={80} height={50} />
            </Link>
            <p className={styles.slogan}>Разрабатываем и запускаем <br/>сложные веб проекты</p>
        </div>
        <div className={'user-group'}>
            {profile ? (
                <Link href={`/account/${profile.slug}`}>
                    <div className={styles.profile}>
                        <span className={styles.profileName}>{profile.name}</span>
                        {profile.image ?
                            <Image src={profile.image.url} alt={profile.name} /> :
                            <div className={styles.noAvatar}>{profile?.name[0]}</div>
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
