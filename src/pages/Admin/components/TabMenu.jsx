import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/TabMenu.scss";

function TabMenu() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }} className="tabmenu mb-3">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                    <NavLink className="tabmenu__link" to="/admin" end>
                        <Tab label="Products" />
                    </NavLink>
                    <NavLink className="tabmenu__link" to="/admin/user">
                        <Tab label="Users" />
                    </NavLink>
                    <NavLink className="tabmenu__link" to="/admin/order">
                        <Tab label="Orders" />
                    </NavLink>
                </Tabs>
            </Box>
        </Box>
    );
}

export default TabMenu;
