import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

OrderPage.propTypes = {};

function OrderPage(props) {
    const [loading, setLoading] = useState(false);
    const [orders, serOrders] = useState([]);
    const [searchKey, setSearchKey] = useState("");
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
            const orders = await getDocs(collection(fireDB, "orders"));
            console.log(orders);
            const orderArray = [];
            orders.forEach((obj) => {
                const item = {
                    id: obj.id,
                    ...obj.data(),
                };

                orderArray.push(item);
            });

            serOrders(orderArray);
            setLoading(false);
        } catch (error) {
            console.log("Failed to get user: ", error);
            setLoading(false);
        }
    };

    return (
        <Layout loading={loading}>
            <div className="container">
                {orders.length === 0 ? (
                    <h1>Loading</h1>
                ) : (
                    <>
                        <input
                            type="text"
                            className="form-control w-50 my-3"
                            placeholder="search order by phone"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Products</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders
                                    .filter((order) =>
                                        order.addressInfo.phoneNumber.includes(
                                            searchKey
                                        )
                                    )
                                    .map((order, index) => {
                                        const {
                                            id,
                                            addressInfo,
                                            cartItems,
                                            totalPrice,
                                        } = order;
                                        return (
                                            <tr className="products" key={id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <p>
                                                        <b>
                                                            {addressInfo.name}
                                                        </b>
                                                    </p>
                                                    <p>
                                                        {
                                                            addressInfo.phoneNumber
                                                        }
                                                    </p>
                                                    <p>{addressInfo.address}</p>
                                                </td>

                                                <td>
                                                    {cartItems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="item mt-2"
                                                        >
                                                            <img
                                                                src={
                                                                    item.imageURL
                                                                }
                                                                className="item__img"
                                                                alt=""
                                                            />
                                                            <div className="item__info">
                                                                <p>
                                                                    {item.name}
                                                                </p>
                                                                Quantity:{" "}
                                                                {item.quantity}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="products__price ">
                                                    {totalPrice}$
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default OrderPage;
