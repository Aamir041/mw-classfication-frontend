import "./LoginForm.css";
const LoginForm = () => {
  return (
    <div className="login-form">
      
      <div className="login-form-background">
        <div className="login-form-background-shape"></div>
        <div className="login-form-background-shape"></div>
      </div>

      <div className="login-form-form">
        <h3>Login</h3>
        
        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password"/>

            <button>Log In</button>
      </div>

    </div>
  );
};

export default LoginForm;
