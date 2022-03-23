import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
Header.propTypes = {};

function Header(props) {
    const { cartItems } = useSelector((state) => state.cartReducer);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { user } = currentUser;

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.onload();
    };
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        FireCommerce
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FaBars color="white" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    aria-current="page"
                                    to="#"
                                >
                                    {user.email.substring(
                                        0,
                                        user.email.length - 10
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">
                                    Orders
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="#"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <FaCartPlus /> {cartItems.length}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
