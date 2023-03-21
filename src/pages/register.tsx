import styles from '../styles/Home.module.css'
import {Card, Button, Form, Input} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {useState} from "react";
import {useAuth} from "../hooks/auth";
import Layout from "../components/Layout";

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

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} обязательно!',
        types: {
            email: '${label} не валидно!',
        },
    };

    return (
        <Layout title={'Регистрация'}>
            <Card style={{ width: 400, borderColor: '#E6E6E6' }}>
                <h2 className={styles.h2}>Регистрация <br/>в Yoldi Agency</h2>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={onValuesChange}
                    validateMessages={validateMessages}
                    autoComplete="off"
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
        </Layout>
    );
}
