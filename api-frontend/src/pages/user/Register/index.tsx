import Footer from '@/components/Footer';
import {history} from 'umi';
import React from 'react';
import {
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import styles from './index.less';
import RegisterPageFooter from "@/pages/user/Register/components/RegisterPageFooter";
import message from "antd/es/message";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {userRegisterUsingPOST as register} from "@/services/stateful-backend/userController";

//相当于 sleep()，缺省时默认参数为 100 ms
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

//注册函数
const handleSubmit = async (values: any) => {
  console.log(values);
  if (values.password != values.checkPassword) {
    message.error("两次输入的密码不一致");
    return;
  }
  const req: API.UserRegisterRequest = {
    userAccount: values.username,
    userPassword: values.password,
    checkPassword: values.checkPassword
  }
  const msg = await register(req);
  console.log("register");
  console.log(msg);
  if (msg.code === 200) {
    message.success("注册成功")
    history.push("/user/login")
  } else {
    message.error(msg.message + ":" + msg.description);
  }
}

//页面渲染器
const Register: React.FC = () => {
  //页面元素描述，等效于 React 类组件中的 render()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            style={{
              margin: 24,
            }}
          >
            <ProForm
              onFinish={async (values: any) => {
                await waitTime(2000);
                await handleSubmit(values);
              }}
            >
              <ProFormText
                // width="md"
                name="username"
                label="用户名"
                tooltip="长度限制为 4 到 20 个字符"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    min: 4,
                    max: 20,
                    required: true,
                    message: '请输入  4 到 20 个字符的用户名！',
                  },
                ]}
              />
              <ProFormText.Password
                label="用户密码"
                name="password"
                tooltip="长度至少为 8 个字符"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                // placeholder={'密码: ant.design'}
                placeholder={'请输入密码'}
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: '至少输入 8 位密码！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                label="密码检验"
                tooltip="长度至少为 8 个字符"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: '至少输入 8 位密码！',
                  },
                ]}
              />
              <RegisterPageFooter/>
            </ProForm>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
