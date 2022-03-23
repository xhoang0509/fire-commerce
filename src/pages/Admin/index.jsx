import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import Order from "./components/Order";
import ProductAdmin from "./components/Product";
import TabMenu from "./components/TabMenu";
import User from "./components/User";

AdminPage.propTypes = {};

function AdminPage(props) {
    const [loading, setLoading] = useState(false);

    return (
        <Layout loading={loading}>
            <div className="container">
                <TabMenu />
                <Routes>
                    <Route index element={<ProductAdmin />} />
                    <Route path="user" element={<User />} />
                    <Route path="order" element={<Order />} />
                </Routes>
            </div>
        </Layout>
    );
}

export default AdminPage;
