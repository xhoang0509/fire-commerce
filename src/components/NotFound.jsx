import React from "react";
import { Link } from "react-router-dom";

NotFound.propTypes = {};

function NotFound(props) {
    return (
        <div>
            <h1>NotFound</h1>
            <Link to="/">Go back home</Link>
        </div>
    );
}

export default NotFound;
