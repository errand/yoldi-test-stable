import styles from '@/styles/Account.module.css'
import Layout from '../components/Layout'
import {useState} from "react";
import {Button} from "antd";
import {UploadOutlined, PictureOutlined, DeleteOutlined, CameraOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons';
import {useAuth} from "../hooks/auth";

export default function Profile({user, profile, isAuthor}) {
    const { logout } = useAuth({ middleware: 'auth' })

    const [coverHover, setCoverHover] = useState(false)
    const [avatarHover, setAvatarHover] = useState(false)
    const [isBg, setBg] = useState(false)
    const [isAvatar, setAvatar] = useState(false)

    const handleBgClick = () => {
        setBg(!isBg);
    };

    const handleAvatarClick = () => {
        setAvatar(!isAvatar);
    };

    if(user && profile) {
        return (
            !user?.message && (<Layout title={`Добро пожаловать, ${profile?.user}`}>
                <main className={styles.main}>
                    <div className={styles.cover}
                         onMouseEnter={() => setCoverHover(true)}
                         onMouseLeave={() => setCoverHover(false)}
                         style={{ backgroundImage: isBg ? "url(/account-bg.jpg)" : 'none' }}
                    >
                        {coverHover && isAuthor && (<>
                            {!isBg && <Button size={"large"} icon={<UploadOutlined/>}
                                              onClick={handleBgClick}>Загрузить <PictureOutlined/></Button>}
                            {isBg && <Button size={"large"} icon={<DeleteOutlined />}
                                             onClick={handleBgClick}>Удалить <PictureOutlined/></Button>}
                        </>)
                        }
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.userAvatar}
                             onMouseEnter={() => setAvatarHover(true)}
                             onMouseLeave={() => setAvatarHover(false)}
                             style={{ backgroundImage: isAvatar ? "url(/vlad.png)" : 'none', backgroundColor: avatarHover && !isAvatar ? "black" : '', color: avatarHover ? "white" : ''}}
                        >
                            {avatarHover && isAuthor ? <span className={styles.avatarButton} onClick={handleAvatarClick}><CameraOutlined /></span> :
                                !isAvatar && <div className={styles.noAvatar}>{user?.name[0]}</div>
                            }
                        </div>
                        <div className={styles.userNameWrapper}>
                            <h1>{user?.name}</h1>
                            {isAuthor && <Button size={'large'} icon={<EditOutlined />}>Редактировать</Button> }
                        </div>
                        {user?.description && <div className={styles.userDescription}>{user?.description}</div>}

                        {isAuthor && <Button size={'large'} icon={<LogoutOutlined />} onClick={logout}>Выход</Button> }
                    </div>
                </main>
            </Layout>)
        )
    }
}
