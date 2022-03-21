import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

ProductInfo.propTypes = {};

function ProductInfo(props) {
    const params = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleGetProducts = async () => {
        try {
            const product = await getDoc(
                doc(fireDB, "products", params.productId)
            );

            const obj = {
                id: product.id,
                ...product.data(),
            };

            setProduct(obj);
        } catch (error) {
            console.log("Failed to get user: ", error);
        }
    };
    console.log(product);
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {product && (
                            <div>
                                <h3>
                                    <b>{product.name}</b>
                                </h3>
                                <img
                                    src={product.imageURL}
                                    alt={product.name}
                                    className="product-info__img"
                                />
                                <hr />
                                <p>{product.description}</p>
                                <div className="d-flex justify-content-end my-3">
                                    <button>ADD TO CART</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductInfo;
