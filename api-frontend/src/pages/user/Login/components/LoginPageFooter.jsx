import React from 'react';
import {useHistory} from 'react-router-dom';

const LoginPageFooter = () => {
  const history = useHistory();
  const handleRegisterClick = () => {
    // 处理点击“没有账号？”时的跳转逻辑
    // 跳转到注册页面
    history.push('/user/register');
  };

  const handleForgotPasswordClick = () => {
    // 处理点击“忘记密码？”时的跳转逻辑
    // 跳转到找回密码页面
    history.push('/user/forget');
  };

  return (
    <div>
      <div style={{float: 'left'}}>
        没有账号？
        <a onClick={handleRegisterClick}>注册</a>
      </div>
      <div style={{float: 'right'}}>
        <a onClick={handleForgotPasswordClick}>忘记密码？</a>
      </div>
    </div>
  );
};

export default LoginPageFooter;
