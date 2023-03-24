import styles from '@/styles/Account.module.css'
import Layout from '../components/Layout'
import {useState} from "react";
import {Button, Modal} from "antd";
import {UploadOutlined, PictureOutlined, DeleteOutlined, CameraOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons';
import {useAuth} from "../hooks/auth";
import ProfileEditForm from "./ProfileEditForm";
import {profile} from "../types/profileType";
import useSWRMutation from "swr/mutation";
import {useCookies} from "react-cookie";

interface profileType {
    user: profile,
    profile: profile,
    isAuthor: boolean
}

export default function Profile({user, profile, isAuthor}: profileType) {
    const { logout } = useAuth({ middleware: 'auth' })

    const [coverHover, setCoverHover] = useState(false)
    const [avatarHover, setAvatarHover] = useState(false)
    const [isBg, setBg] = useState(false)
    const [isAvatar, setAvatar] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [cookies] = useCookies(["yoldiToken"])
    const [file, setFile] = useState<File>();


    const handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }

        if (!file) {
            return;
        }

        console.log(file)

        // 👇 Uploading the file using the fetch API to the server
        fetch('https://frontend-test-api.yoldi.agency/api/image', {
            method: 'POST',
            body: file,
            // 👇 Set headers manually for single file upload
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    const showModal = () => {
        setModalOpen(true);
    };

    const handleBgClick = () => {
        setBg(!isBg);
    };

    const handleAvatarClick = () => {
        setAvatar(!isAvatar);
    };

    const { trigger } = useSWRMutation(
        {
            url: "https://frontend-test-api.yoldi.agency/api/profile",
            cookies,
        },
        editUserInfo
    );
    async function editUserInfo(
        { url, cookies }: { url: string; cookies: string | any },
        { arg }: { arg: any }
    ) {
        return fetch(url, {
            method: "PATCH",
            body: JSON.stringify(arg),
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": cookies.yoldiToken,
            },
        })
            .then((res) => res.json())
            .then(data => {
                if(profile.slug !== data.slug) {
                    logout()
                }
                setModalOpen(false)
            });
    }

    return <>
        {user && profile &&
        !user?.message && (<Layout title={`Добро пожаловать, ${profile?.name}`}>
            <main className={styles.main}>
                <div className={styles.cover}
                     onMouseEnter={() => setCoverHover(true)}
                     onMouseLeave={() => setCoverHover(false)}
                     style={{backgroundImage: isBg ? "url(/account-bg.jpg)" : user.cover?.url ? `url(${user.cover?.url})` : 'none'}}
                >
                    {coverHover && isAuthor && (<>
                        {!isBg && <input type={"file"}  onChange={handleUploadClick} /> }
                        {isBg && <Button size={"large"} icon={<DeleteOutlined/>}
                                         onClick={handleBgClick}>Удалить <PictureOutlined/></Button>}
                    </>)
                    }
                </div>
                <div className={'wrapper'}>
                    <div className={styles.userAvatar}
                         onMouseEnter={() => setAvatarHover(true)}
                         onMouseLeave={() => setAvatarHover(false)}
                         style={{
                             backgroundImage: isAvatar ? "url(/vlad.png)" : user.image?.url ? `url(${user.image?.url})` : 'none',
                             backgroundColor: avatarHover && !isAvatar ? "black" : '',
                             color: avatarHover ? "white" : ''
                         }}
                    >
                        {avatarHover && isAuthor ?
                            <span className={styles.avatarButton} onClick={handleAvatarClick}><CameraOutlined/></span> :
                            !isAvatar && !user.image?.url && <div className={styles.noAvatar}>{profile?.name[0]}</div>
                        }
                    </div>
                    <div className={styles.userNameWrapper}>
                        <div className={styles.userInfo}>
                            <h1 className={styles.h1}>{isAuthor? profile.name : user?.name}</h1>
                            <div className={styles.email}>{isAuthor ? profile.email : user?.email}</div>
                        </div>
                        {isAuthor && <>
                            <Modal
                                title={false}
                                closable={false}
                                maskClosable={false}
                                centered
                                open={modalOpen}
                                className={styles.modal}
                                footer={false}
                            >
                                <ProfileEditForm profile={profile} setModalOpen={(e: any) => setModalOpen(e)} />
                            </Modal>
                            <Button className={styles.editButton} size={'large'} icon={<EditOutlined/>} onClick={showModal}>Редактировать</Button>
                        </>}
                    </div>
                    {user?.description && <div className={styles.userDescription}>{isAuthor ? profile.description : user?.description}</div>}

                    {isAuthor && <div className={styles.exit}>
                        <Button size={'large'} icon={<LogoutOutlined/>} onClick={logout}>Выход</Button>
                    </div> }
                </div>
            </main>
        </Layout>)
        }
    </>
}
