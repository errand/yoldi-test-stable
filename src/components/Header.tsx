import Image from "next/image";
import styles from '../styles/Header.module.css';
import Link from "next/link";
import useSWR from "swr";
import {getProfile} from "../hooks/auth";
import {useCookies} from "react-cookie";

export default function Header() {

    const [cookies] = useCookies(["yoldiToken"])

    const { data: profile } = useSWR(
        { url: `https://frontend-test-api.yoldi.agency/api/profile`, cookies },
        getProfile
    );

    return <header className={styles.header}>
        <div className={styles.logo_group}>
            <Link href={'/'} title={'Back to the Future'}>
                <Image src={'/logo-yoldi.svg'} alt={'Hello Logo'} width={80} height={50} />
            </Link>
            <p className={styles.slogan}>Разрабатываем и запускаем <br/>сложные веб проекты</p>
        </div>
        <div className={'user-group'}>
            {profile && <div className={styles.profile}>
                <span>{profile.name}</span>
                {profile.image && <Image src={profile.image} alt={profile.name} />}
                {!profile.image && <div className={styles.noAvatar}>{profile.name[0]}</div> }
            </div>}
            {!profile && <Link href={'/login'} className={styles.btn}>Войти</Link>}
        </div>
    </header>
}
