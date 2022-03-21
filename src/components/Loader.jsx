import React from "react";
import "../stylesheets/Loader.scss";
Loader.propTypes = {};

function Loader(props) {
    return (
        <div className="loader text-center">
            <div className="spinner-border" role="status"></div>
        </div>
    );
}

export default Loader;
