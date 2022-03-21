import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import "../stylesheets/CartPage.scss";
CartPage.propTypes = {};

function CartPage(props) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartReducer);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp += cartItem.price * cartItem.quantity;
        });
        console.log("temp: ", temp);
        setTotalAmount(temp);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleDeleteFormCart = (id) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: id,
        });
    };
    return (
        <Layout>
            <div className="container">
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={product.imageURL}
                                        style={{ width: "100px" }}
                                        alt=""
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <th>{product.quantity}</th>
                                <th>
                                    <FaTrash
                                    className="btn-delete-all"
                                        onClick={() =>
                                            handleDeleteFormCart(product.id)
                                        }
                                    />
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <h1 className="total-amount">
                        Total Amount = {totalAmount}$
                    </h1>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button>PLACE ORDER</button>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
