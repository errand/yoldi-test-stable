import styles from '@/styles/Accounts.module.css'
import Link from "next/link";
import {profile} from "../types/profileType";

export default function UserRow({user}: {user: profile}) {
    return <Link href={`/account/${user.slug}`} className={styles.row}>

       <div className={styles.image}>
           {user.image ? <img src={user.image.url} width={50} height={50} className={styles.avatar} /> : <div className={styles.avatar}>{user.name[0]}</div>}
       </div>

        <div className={styles.info}>

            <div className={styles.name}>
                {user.name}
            </div>

            <div className={styles.email}>
                {user.email}
            </div>

        </div>
    </Link>
}
