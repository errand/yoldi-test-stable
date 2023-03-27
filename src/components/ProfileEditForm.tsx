import styles from "../styles/ProfileEditForm.module.css";
import {Button, Form, Input, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import {useState} from "react";
import useSWRMutation from "swr/mutation";
import {useAuth} from "../hooks/auth";
import {useCookies} from "react-cookie";
import {profile} from "../types/profileType";

interface editType {
    profile: profile,
    setModalOpen: (arg0: boolean) => void
}

export default function ProfileEditForm({profile, setModalOpen}: editType) {

    const [name, setName] = useState(profile.name);
    const [cookies] = useCookies(["yoldiToken"])
    const [slug, setSlug] = useState(profile.slug);
    const [description, setDescription] = useState(profile.description);
    const { TextArea } = Input;

    const {logout} = useAuth()

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

    const handleCancel = () => {
        setModalOpen(false)
    }

    const onFinish = () => {
        const data = {
            name,
            imageId: null,
            slug,
            coverId: null,
            description,
        };
        trigger(data);
    }


    return <>
        <h2 className={styles.h2}>Редактировать профиль</h2>
        <Form
            name="edit"
            layout="vertical"
            initialValues={{ name: profile.name, slug: profile.slug, description: profile.description }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Имя"
                name="name"
            >
                <Input
                    size="large"
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label={'Адрес профиля'}
                name="slug"
            >
                <Input
                    size="large"
                    addonBefore={process.env.NEXT_PUBLIC_BACKEND_URL}
                    onChange={(e) => setSlug(e.target.value)}
                    suffix={
                        <Tooltip title="После изменения адреса, нужно будет авторизоваться заново">
                            <InfoCircleOutlined style={{ color: 'rgba(181,181,181,.45)' }} />
                        </Tooltip>
                    }
                />

            </Form.Item>

            <Form.Item
                label={'Описание'}
                name="description"
            >
                <TextArea
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <div className={styles.buttons}>
                <Button
                    size={'large'}
                    key="cancel"
                    onClick={handleCancel}
                >
                    Отмена
                </Button>
                <Button
                    size={'large'}
                    key="submit"
                    type="primary"
                    htmlType="submit"
                >
                    Сохранить
                </Button>
            </div>
        </Form>
    </>
}
