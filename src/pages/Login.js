import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 后端认证逻辑
    alert('后端还没搞好呢，老板！😅');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title glitch" data-text="ADMIN ACCESS">
              ADMIN ACCESS
            </h1>
            <p className="login-subtitle">// 管理员控制台</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="输入用户名"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入密码"
                required
              />
            </div>

            <button type="submit" className="login-button">
              <span>LOGIN</span>
              <span className="button-glow"></span>
            </button>
          </form>

          <div className="login-footer">
            <p>🚧 后端开发中...</p>
          </div>
        </div>

        {/* 装饰性元素 */}
        <div className="deco-circle deco-1"></div>
        <div className="deco-circle deco-2"></div>
        <div className="deco-circle deco-3"></div>
      </div>
    </div>
  );
}

export default Login;
