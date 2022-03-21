import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
Layout.propTypes = {};

function Layout(props) {
    const { loading } = props;
    return (
        <div>
            {loading && <Loader />}
            <Header />
            <div className="content">{props.children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
