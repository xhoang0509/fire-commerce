import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";
import "../stylesheets/Products.scss";
HomePage.propTypes = {};

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cartItems } = useSelector((state) => state.cartReducer);

    useEffect(() => {
        handleGetProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleGetProducts = async () => {
        try {
            setLoading(true);
            const products = await getDocs(collection(fireDB, "products"));
            const productArray = [];
            products.forEach((product) => {
                const obj = {
                    id: product.id,
                    ...product.data(),
                };

                productArray.push(obj);
            });

            setProducts(productArray);
            setLoading(false);
        } catch (error) {
            console.log("Failed to get user: ", error);
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });
    };

    return (
        <Layout loading={loading}>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <div className="product m-2 p-2 position-relative">
                                <div className="product__content">
                                    <p>{product.name}</p>
                                    <div className="text-center">
                                        <img
                                            src={product.imageURL}
                                            alt=""
                                            className="product__img"
                                        />
                                    </div>
                                </div>
                                <div className="product__actions">
                                    <h2>{product.price}$</h2>
                                    <div className="d-flex">
                                        <button
                                            className="mx-2"
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                        >
                                            ADD TO CART
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/productinfo/${product.id}`
                                                )
                                            }
                                        >
                                            VIEW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
