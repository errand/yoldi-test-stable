import styles from '../styles/Home.module.css'
import {Card, Button, Form, Input} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/auth";
import Layout from "../components/Layout";

export default function Register() {

    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [form] = Form.useForm();

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        if(email && password) {
            setSubmitDisabled(hasErrors);
        }
    }

    const onFinish = async () => {
        await register({name,  email, password})
    };

    const validateMessages = {
        required: '${label} обязательно!',
        types: {
            email: '${label} не валидно!',
        },
    };

    return (
        <Layout title={'Регистрация'}>
            <main className={styles.main}>
                <Card style={{ width: 400, borderColor: '#E6E6E6' }}>
                    <h2 className={styles.h2}>Регистрация <br/>в Yoldi Agency</h2>
                    <Form
                        name="register"
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        form={form}
                        onFieldsChange={handleFormChange}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder={'Имя'}
                                size="large"
                                prefix={<UserOutlined />}
                                onChange={(e) => setName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ type: 'email', required: true }]}
                        >
                            <Input
                                placeholder={'E-mail'}
                                size="large"
                                prefix={<MailOutlined />}
                                onChange={(e) => setEmail(e.target.value)}  />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                placeholder={'Пароль'}
                                size="large"
                                prefix={<LockOutlined />}
                                onChange={(e) => setPwd(e.target.value)} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button
                                size={'large'}
                                type={'primary'}
                                disabled={submitDisabled}
                                htmlType="submit"
                                block
                                className={styles.primaryBtn}>
                                Создать аккаунт
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </main>
        </Layout>
    );
}
