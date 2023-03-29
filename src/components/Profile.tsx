import styles from '@/styles/Account.module.css'
import Layout from '../components/Layout'
import {useEffect, useRef, useState} from "react";
import {Button, Modal} from "antd";
import {UploadOutlined, PictureOutlined, DeleteOutlined, CameraOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons';
import {useAuth} from "../hooks/auth";
import ProfileEditForm from "./ProfileEditForm";
import {profile} from "../types/profileType";
import useSWRMutation from "swr/mutation";
import {useCookies} from "react-cookie";
import Loader from "./Loader";

interface profileType {
    user: profile,
    profile: profile,
    isAuthor: boolean
}

export default function Profile({user, profile, isAuthor}: profileType) {
    const { logout } = useAuth({ middleware: 'auth' })
    const actualBtnRef = useRef(null);

    const [coverHover, setCoverHover] = useState(false)
    const [avatarHover, setAvatarHover] = useState(false)
    const [cover, setCover] = useState<any>()
    const [isAvatar, setAvatar] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoadingCover, setLoadingCover] = useState(false)
    const [cookies] = useCookies(["yoldiToken"])

    useEffect(() => {
        if(isAuthor && profile?.cover?.url) {
            setCover(profile?.cover?.url!)
        } else if(!isAuthor && user?.cover?.url) {
            setCover(profile?.cover?.url!)
        } else {
            setCover(null)
        }
    })

    const handleUploadClick = (e: any, type: string) => {
        setLoadingCover(true)
        if (!e.target.files) {
            setLoadingCover(false)
            return;
        }

        const body = new FormData();
        body.append("file", e.target.files[0]);

        fetch('https://frontend-test-api.yoldi.agency/api/image', {
            method: 'POST',
            body: body,
        })
            .then((res) => res.json())
            .then((data) => trigger({
                name: profile?.name,
                slug: profile?.slug,
                [type]: data.id
            }))
            .catch((err) => console.error(err));
    };

    const showModal = () => {
        setModalOpen(true);
    };

    const handleBgClick = () => {
        trigger({
            name: profile?.name,
            slug: profile?.slug,
            coverId: null
        })
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
            .then(() => setLoadingCover(false))
    }

    return <>
        {user && profile &&
        !user?.message && (<Layout title={`Добро пожаловать, ${profile?.name}`}>
            <main className={styles.main}>
                <div className={styles.cover}
                     onMouseEnter={() => setCoverHover(true)}
                     onMouseLeave={() => setCoverHover(false)}
                     style={{backgroundImage: cover ? `url(${cover})` : `none`}}
                >
                    <Loader isLoading={isLoadingCover} />

                    {!isLoadingCover && coverHover && isAuthor && (<>
                        {!cover && <label className={styles.labelButton} htmlFor={"actual-btn"}><UploadOutlined/> Загрузить <PictureOutlined/>
                            <input type="file" ref={actualBtnRef} hidden id="actual-btn" onChange={(e) => handleUploadClick(e, 'coverId')} /></label> }
                        {cover && <Button size={"large"} icon={<DeleteOutlined/>}
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
