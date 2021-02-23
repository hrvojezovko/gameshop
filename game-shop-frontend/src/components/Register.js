import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { ProductConsumer } from './Context'
import Axios from 'axios'
import './css/Register.css'
import Logo from './img/gs.png'
import LogoTheme from './img/gs-theme.png'

export default function Register() {

    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const patterns = {
        usernameReg: new RegExp(/^[a-zA-Z0-9]{4,20}$/i),
        passwordReg: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        emailReg: new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/),
    }
    //funkcija validation
    function validate(pattern, varReg) {
        console.log(pattern.test(varReg));
        if (pattern.test(varReg)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const register = () => {
        if (validate(patterns.passwordReg, passwordReg) === 1 && validate(patterns.usernameReg, usernameReg) === 1 && validate(patterns.emailReg, emailReg) === 1) {
            Axios.post("http://localhost:3001/api/post", {
                email: emailReg,
                username: usernameReg,
            }).then((response) => {
                console.log(response);
                if (response.data.emailtaken || response.data.usernametaken) {
                    console.log("Username/email taken");
                    return;
                }
                else {
                    Axios.post("http://localhost:3001/register", {
                        email: emailReg,
                        username: usernameReg,
                        password: passwordReg,
                    }).then((response) => {
                        console.log(response);
                    });

                }
            })


        }
        else {
            console.log("Neispravni podaci");
        }
    };




    return (
        <ProductConsumer>
            {
                value => {
                    const{theme}=value
                    return(
                        <form>
                            <div>
                                <div className={theme ? "theme-login-header" : "login-header"}>
                                    {theme ? <img src={LogoTheme} alt="" height="30px"/> : <img src={Logo} alt="" height="30px"/>}
                                </div>
                                <div className={theme ? "theme-background" : "background"}>
                                    <div className={theme ? "theme-register-section" : "register-section"}>
                                        <h1>Sign Up</h1>
                                        <div className="mail">
                                            <p>Email:</p>
                                            <input onChange={(e) => {
                                                setEmailReg(e.target.value);
                                            }}
                                                type="email"
                                                className="form-control"
                                                value={emailReg}
                                                placeholder="example@gmail.com" />
                                            {/*<h6>Email mora biti oblika:primjer@gmail.com</h6>*/}
                                        </div>
                                        <div>
                                            <p>Username:</p>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={usernameReg}
                                                placeholder="Username"
                                                onChange={(e) => {
                                                    setUsernameReg(e.target.value);
                                                }}
                                            />
                                            <p className="below">Username mora imati 4-20 slova ili brojeva</p>
                                        </div>
                                        <div>
                                            <p>Password:</p>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={passwordReg}
                                                onChange={(e) => {
                                                    setPasswordReg(e.target.value);
                                                }}
                                            />
                                            <p className="below">Password mora imati minimalno 8 karaktera, veliko i malo slovo i broj</p>
                                        </div>
                                        <button onClick={register}> Sign Up </button>
                                        <div className="already">
                                            <div className="line"></div>
                                                <p>Already have an account?</p>
                                            </div>
                                        <button className="log"><Link to="/login" title="Log In">Login</Link></button>
                                        <Link to="/" title="Home"><i className="fas fa-home fa-lg"></i></Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-login-footer" : "login-footer"}>
                                <p>&#169; Copyright GameShop 2021, all rights reserved</p>
                            </div>
                            </div>
                        </form>
                    )
                }
            }
        </ProductConsumer>
    )
}
