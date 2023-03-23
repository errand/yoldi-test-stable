import {useAuth} from "../hooks/auth";
import {useState} from "react";
import useSWR from "swr";
import UserRow from "../components/UserRow";
import Layout from "../components/Layout";
import styles from '@/styles/Accounts.module.css'

export default function Accounts() {
    const {user} = useAuth({middleware: 'auth'})
    const [list, setList] = useState<any[]>([])

    const { data: usersList } = useSWR(`/api/user`,() => {
        return fetch(`https://frontend-test-api.yoldi.agency/api/user`).then((res) => res.json()).then(data => setList(data))
    });

    return <Layout title={'Список пользователей'}>
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <h1 className={styles.h1}>Список аккаунтов</h1>
                {list && list.map(user => <UserRow key={user.name+user.slug} user={user} />)}
            </div>
        </main>
    </Layout>
}
