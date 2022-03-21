import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Register.scss";
RegisterPage.propTypes = {};

function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    return (
        <div className="register">
            <div className="register__top"></div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_yr6zz3wv.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                </div>
                <div className="col-md-4 z1">
                    <div className="register__form p-4">
                        <h2>Register</h2>
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
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Comfim password"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                        <button>REGISTER</button>
                        <hr />
                        <Link to="/login">Click here to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
