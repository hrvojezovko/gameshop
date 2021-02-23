import React, { Component, useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Axios from 'axios'
import './css/Login.css'
import Logo from './img/gs.png'
import LogoTheme from './img/gs-theme.png'
import { ProductConsumer } from './Context'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);
    const login = () => {

        Axios.defaults.withCredentials = true;
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
            }
        });
    };

    useEffect(() => {
        console.log("component mounted");
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username);
            }
        });
    }, []);

    const userAuthenticated = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: { "x-access-token": localStorage.getItem("token") }


        }).then((response) => {
            console.log(response);
        });
    }


    return (
        <ProductConsumer>
            {
                value => {
                    const{theme}=value
                    return(
                        <div>
                        <div className={theme ? "theme-login-header" : "login-header"}>
                            {theme ? <img src={LogoTheme} alt="" height="30px"/> : <img src={Logo} alt="" height="30px"/>}
                        </div>
                        <div className={theme ? "theme-background" : "background"}>
                            <div className={theme ? "theme-login-section" : "login-section"}>
                                <h1>Log In</h1>
                                <div>
                                    <p>Username:</p>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <p>Password:</p>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <button onClick={login}> Login </button>
                                { loginStatus ? 
                                    <Redirect to="home" />
                                    : <div></div>
                                }
                                <div className="dont-have">
                                    <div className="line"></div>
                                    <p>Don't have an account?</p>
                                </div>
                                <button className="sign"><Link to="/signup" title="Sign Up">Sign Up</Link></button>
                                <Link to="/" title="Home"><i className="fas fa-home fa-lg"></i></Link>
                            </div>
                        </div>
                        <div className={theme ? "theme-login-footer" : "login-footer"}>
                            <p>&#169; Copyright GameShop 2021, all rights reserved</p>
                        </div>
                    </div>
                    )
                }
            }
        </ProductConsumer> 
    )
}

export default Login;