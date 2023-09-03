import React from 'react';
import {useHistory} from 'react-router-dom';

const RegisterPageFooter = () => {
  const history = useHistory();
  const handleLoginClick = () => {
    // 处理点击“没有账号？”时的跳转逻辑
    // 跳转到注册页面
    history.push('/user/login');
  };

  return (
    <div>
      <div style={{float: 'right'}}>
        已有账号？
        <a onClick={handleLoginClick}>登录</a>
      </div>
    </div>
  );
};

export default RegisterPageFooter;
