import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Login.scss";
LoginPage.propTypes = {};

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="login">
            <div className="row justify-content-center">
                <div className="col-md-4 z1">
                    <div className="login__form p-4">
                        <h2>Login</h2>
                        <hr />
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button>LOGIN</button>
                        <hr />
                        <Link to="/register">Click here to Regsiter</Link>
                    </div>
                </div>
                <div className="col-md-5 z1">
                    <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_q5pk6p1k.json"
                        background="transparent"
                        style={{ width: "600px" }}
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>
            <div className="login__bottom"></div>
        </div>
    );
}

export default LoginPage;
