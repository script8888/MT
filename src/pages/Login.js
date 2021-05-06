import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Route, Switch, Link, Redirect } from "react-router-dom";
import { UserContext } from './../hooks/auth/UserContext';
import useAuth from './../hooks/auth/useAuth';



function Login() {

    const { user } = useContext(UserContext);
    const { loginUser, error } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginText, setLoginText] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userNameOrEmailAddress: "",
            password: "",
            rememberClient: true })
      });
    
      const { userNameOrEmailAddress, password, rememberClient } = formData;

    
      const onInputChange = (e) => {
        const value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
        setFormData({
          ...formData,
          [e.target.name]: value
        });
      };

      const onSubmit = async (e) => {
        setLoginText(false);
        setLoading(true);

        e.preventDefault();
        console.log("formData", formData);
    
        try {
          await loginUser(formData);
        } catch (error) {
            if (error) {
              setLoginText(true);
              setLoading(false);
            }
          }

      };
    
    return <div>
    <Helmet>
        <title>Login | Verigo</title>
    </Helmet>
    {loggedIn ?
      <Redirect to="/Dashboard" /> : null
    }
    <section id="login-sec">
        <div className="login-div">
            <h3>Login</h3>

            <form id="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" name="userNameOrEmailAddress" value={userNameOrEmailAddress} onChange={onInputChange} className="form-control rounded-pill leave-message-input login-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email address"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={password} onChange={onInputChange} className="form-control rounded-pill leave-message-input login-input" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" name="rememberClient" value={rememberClient} onChange={onInputChange} className="form-check-input" id="exampleCheck1"/>
                    <p className="rem-me">Remember me</p>
                </div>
                {loginText ?
                <button type="submit" className="btn login-btn rounded-pill"> LOGIN 
                </button> : null}
                
                {loading ?
                <button type="submit" className="btn login-btn rounded-pill">
                   <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> 
                </button> : null }
            </form>
            <Link className="login-fp-p" to="/PasswordReset">Forgot Password?</Link>
        </div>
    </section>
    <section id="white-space">&nbsp;</section>
    </div>
}

export default Login;