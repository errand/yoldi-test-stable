import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Card, Button, Form, Input} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {useState} from "react";
import useSWRMutation from "swr/mutation";
import {register, useAuth} from "../hooks/auth";
import {router} from "next/client";
import {useCookies} from "react-cookie";

export default function Register() {

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');

    const onValuesChange = () => {
        if ( name && email && password) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    };

    const onFinish = async () => {
        register({name,  email, password})
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Card style={{ width: 400, borderColor: '#E6E6E6' }}>
                    <h2 className={styles.h2}>Регистрация <br/>в Yoldi Agency</h2>
                    <Form
                        name="basic"
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        onValuesChange={onValuesChange}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Поле имя обязательно!' }]}
                        >
                            <Input placeholder={'Имя'} size="large" prefix={<UserOutlined />}  onChange={(e) => setName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Поле e-mail обязательно!' }]}
                        >
                            <Input placeholder={'E-mail'} size="large" prefix={<MailOutlined />} onChange={(e) => setEmail(e.target.value)}  />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Пароль нужен обязательно!' }]}
                        >
                            <Input.Password placeholder={'Пароль'} size="large" prefix={<LockOutlined />}  onChange={(e) => setPwd(e.target.value)} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button size={'large'} type={'primary'} disabled={submitDisabled} htmlType="submit" block className={styles.primaryBtn}>
                                Создать аккаунт
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </main>
            <Footer login />
        </>
    );
}
