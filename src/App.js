import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import "./stylesheets/layout.scss";
import "./stylesheets/products.scss";
import "./stylesheets/productInfo.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/login" exact element={<LoginPage />} />
                    <Route path="/register" exact element={<RegisterPage />} />
                    <Route
                        path="/productinfo/:productId"
                        exact
                        element={<ProductInfo />}
                    />
                    <Route path="/cart" exact element={<CartPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
