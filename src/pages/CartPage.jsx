import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

CartPage.propTypes = {};

function CartPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartReducer);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [totalAmount, setTotalAmount] = useState(0);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPinCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp += cartItem.price * cartItem.quantity;
        });
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

    const handlePlaceOrder = async () => {
        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
        };

        const orderInfo = {
            cartItems,
            addressInfo,
            email: currentUser.user.email,
            userId: currentUser.user.uid,
            totalPrice: totalAmount,
        };

        try {
            setLoading(true);
            await addDoc(collection(fireDB, "orders"), orderInfo);
            setLoading(false);
            handleClose();
            toast.success("Order successfully 🎉");
            localStorage.removeItem("cartItems");
            dispatch({
                type: "DELETE_ALL",
            });
            navigate("/order");
        } catch (error) {
            setLoading(false);
            toast.error("Order failed");
            console.log(error);
        }
    };

    return (
        <Layout loading={loading}>
            <div className="container">
                {cartItems.length === 0 ? (
                    <h1>Cart Empty</h1>
                ) : (
                    <>
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
                                                    handleDeleteFormCart(
                                                        product.id
                                                    )
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
                            <button onClick={handleShow}>PLACE ORDER</button>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add your address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <input
                                    className="form-control my-3"
                                    placeholder="Pincode"
                                    type="number"
                                    value={pincode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                                <input
                                    className="form-control my-3"
                                    placeholder="Phone number"
                                    type="number"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handlePlaceOrder}
                                >
                                    ORDER
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default CartPage;
