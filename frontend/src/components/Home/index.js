import React from "react";
import {Link} from "react-router-dom";
import "../../App.css"

export default function Home  () {
    return(
        <div className="">
            <h1>Hello</h1>
            <Link to="/auth">Login</Link>
            <Link to="/reg">Register</Link>
        </div>
    );

}