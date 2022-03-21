import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

HomePage.propTypes = {};

function HomePage(props) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleGetProducts = async () => {
        try {
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
        } catch (error) {
            console.log("Failed to get user: ", error);
        }
    };

    return (
        <Layout>
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
                                        <button className="mx-2">
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
