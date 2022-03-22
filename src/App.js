import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/cartPage.scss";
import "./css/layout.scss";
import "./css/loader.scss";
import "./css/login.scss";
import "./css/orderPage.scss";
import "./css/product.scss";
import "./css/productInfo.scss";
import "./css/register.scss";
import "./App.css";

import NotFound from "./components/NotFound";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <ProtectedRoutes>
                                <HomePage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/productinfo/:productId"
                        exact
                        element={
                            <ProtectedRoutes>
                                <ProductInfo />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/cart"
                        exact
                        element={
                            <ProtectedRoutes>
                                <CartPage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/orders"
                        exact
                        element={
                            <ProtectedRoutes>
                                <OrderPage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                    path="/admin"
                    exact
                    element={
                        <ProtectedRoutes>
                            <AdminPage />
                        </ProtectedRoutes>
                    }
                />

                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
    if (localStorage.getItem("currentUser")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};
