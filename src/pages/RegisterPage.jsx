import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../stylesheets/Register.scss";

RegisterPage.propTypes = {};
const auth = getAuth();
function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(result);
            setLoading(false);
            toast.success("Registration successfully !");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Registration failed !");
        }
    };
    return (
        <div className="register">
            {loading && <Loader />}
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
                        <button onClick={handleRegister}>REGISTER</button>
                        <hr />
                        <Link to="/login">Click here to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
