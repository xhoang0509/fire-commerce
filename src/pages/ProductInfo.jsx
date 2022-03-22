import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

ProductInfo.propTypes = {};

function ProductInfo(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleGetProducts = async () => {
        try {
            setLoading(true);
            const product = await getDoc(
                doc(fireDB, "products", params.productId)
            );

            const obj = {
                id: product.id,
                ...product.data(),
            };

            setProduct(obj);
            setLoading(false);
        } catch (error) {
            console.log("Failed to get user: ", error);
        }
    };

    const handleAddToCart = () => {
        toast.success("You cool product is in the cart 🎉");
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });
    };

    return (
        <Layout loading={loading}>
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
                                    <button onClick={handleAddToCart}>
                                        ADD TO CART
                                    </button>
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
