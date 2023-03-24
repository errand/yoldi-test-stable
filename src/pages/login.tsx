import { Card, Button, Form, Input } from 'antd';
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import {useAuth} from "../hooks/auth";
import {useEffect, useState} from "react";
import {LockOutlined, MailOutlined} from "@ant-design/icons";

export default function Login() {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [errors, setErrors] = useState([])

    const onFinish = () => {
        login({email, password, setErrors})
    };

    const onValuesChange = () => {
        if ( email.includes('@') && password) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    };

    useEffect(() => {
        onValuesChange()
    })

    return (
        <Layout title={'Войти в Yoldi'}>
            <main className={'main'}>
                <Card style={{ width: 400, borderColor: '#E6E6E6' }}>
                    <h2 className={styles.h2}>Вход в Yoldi Agency</h2>
                    <Form
                        name="basic"
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder={'E-mail'}
                                size="large"
                                prefix={<MailOutlined />}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                placeholder={'Пароль'}
                                size="large"
                                prefix={<LockOutlined />}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button
                                size={'large'}
                                type={'primary'}
                                disabled={submitDisabled}
                                htmlType="submit"
                                block
                                className={styles.primaryBtn}>
                                Войти
                            </Button>
                        </Form.Item>
                        {errors && <div className={styles.danger}>{errors}</div>}
                    </Form>
                </Card>
            </main>
        </Layout>
    );
}
