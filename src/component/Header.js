import React from "react";
import "./Header.css";

const Header = () => {
    // console.log("Header upated...");
    return (
        <div className="Header">
            <h3>Today 📆</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};
export default React.memo(Header);//Header component : Applied memoization.