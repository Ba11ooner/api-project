import Footer from '@/components/Footer';

import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React from 'react';
import {history, useModel} from 'umi';
import styles from './index.less';
import LoginPageFooter from "@/pages/user/Login/components/LoginPageFooter";
import {getLoginUserUsingGET, userLoginUsingPOST} from "@/services/stateful-backend/userController";

//函数组件（不带参数）：登录
const Login: React.FC = () => {
  //通过 useModel 处理初始状态
  const {initialState, setInitialState} = useModel('@@initialState');

  //获取用户信息
  //1.尝试从初始状态中获取
  //2.初始状态中不存在用户信息，则尝试从接口中获取，并将信息保存到初始状态中
  const fetchUserInfo = async () => {
    //尝试从初始状态中获取用户信息
    const userInfo = initialState?.currentUser;
    console.log("login:fetchUserInfo")
    console.log(userInfo)
    //初始状态中的用户信息不存在，则通过后端接口获取信息
    if (!userInfo) {
      console.log("login:getLoginUserUsingGET")
      const msg = await getLoginUserUsingGET();
      console.log(msg)
      if (msg.code === 200) {
        const res: API.CurrentUser = {
          name: msg.data?.userAccount,
          userid: msg.data?.id?.toString(),
          access: msg.data?.userRole
        }
        console.log(res)
        //设置初始状态，保存获取的用户信息
        await setInitialState((s) => ({
          ...s,
          currentUser: res,
        }));
        //返回用户信息
        return userInfo;
      }
    }
    return userInfo;
  };

  //登录函数，对接自动生成的接口函数
  const handleSubmit = async (values: API.loginUserParams) => {
    try {
      console.log("login:userLoginUsingPOST")
      const res = await userLoginUsingPOST({
        userAccount: values.username,
        userPassword: values.password
      });
      console.log(res)
      //根据返回值判断是否登录成功
      if (res.code === 200) {
        //登录成功，则提示成功信息
        message.success("登录成功");
        //获取已登录的用户信息
        await fetchUserInfo();
        //页面跳转
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      } else {
        //登录失败，
        message.error(res.message + " : " + res.description)
      }
    } catch (error) {
      message.error("内部错误，请联系管理员！");
    }
  }

  //页面元素描述，等效于 React 类组件中的 render()
  return (
    //只允许一个根组件
    <div className={styles.container}>
      <div className={styles.content}>

        {/* 登录表单 */}
        <LoginForm
          logo={<img alt="logo" src="/logo.svg"/>}
          title="登录页面"
          subTitle={'本项目为基于 Ant Design Pro 的通用中后台系统模板'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.loginUserParams);
          }}
        >
          <Tabs>
            <Tabs.TabPane tab={'账户密码登录'}/>
          </Tabs>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon}/>,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '用户名是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon}/>,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
          <LoginPageFooter/>
          <div style={{height: "3vh"}}/>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
