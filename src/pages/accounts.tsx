import {useAuth} from "../hooks/auth";
import {useState} from "react";
import useSWR from "swr";
import UserRow from "../components/UserRow";
import Layout from "../components/Layout";
import styles from '@/styles/Accounts.module.css'
import {LoadingOutlined} from '@ant-design/icons';
import {Button} from "antd";

export default function Accounts() {
    const {user} = useAuth({middleware: 'auth'})
    const [list, setList] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const limit = 10
    const maxPage = Math.ceil(list.length/limit)

    const onNextPage = () => setPage((page+1)%maxPage)
    const onPrevPage = () => setPage((page+limit-1)%maxPage)

    const { data: usersList } = useSWR(`/api/user?page=${page}`,() => {
        return fetch(`https://frontend-test-api.yoldi.agency/api/user`).then((res) => res.json()).then(data => setList(data))
    });

    return <Layout title={'Список пользователей'}>
        <main className={styles.main}>
            <div className={'wrapper'}>

                <h1 className={styles.h1}>Список аккаунтов</h1>

                {list.length < 1 && <div className={'loader'}><LoadingOutlined /></div>}

                {list && list.slice(page*limit,limit*(page+1)).map(user => <UserRow key={user.name+user.slug} user={user} />)}

                <div className={styles.buttons}>
                    <Button size={'large'} onClick={onPrevPage}>Назад</Button>
                    <Button size={'large'} onClick={onNextPage}>Вперёд</Button>
                </div>

            </div>
        </main>
    </Layout>
}
