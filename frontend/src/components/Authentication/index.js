import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../../App.css"

export default function Authentication  () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(false)
    const [usernameColor, setUsernameColor] = useState("white")
    const [passwordColor, setPasswordColor] = useState("white")



    function passwordIsValid (password) {
        const sampleForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
        if(!sampleForPassword.test(password)){
            setPasswordColor("yellow");
        }
        else setPasswordColor("green");
    }

    function usernameIsValid (username){
        if (username.length > 3) {
            setUsernameColor("green")
        }
        else setUsernameColor("yellow")
    }


    function tryToAuth () {
        if (usernameColor === "green" && passwordColor === "green")
        {
            setLoading(true)
            const loginPacket = {
                username: username,
                password: password
            }
            fetch("/api/user/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password})
            }).then(res => res.json()).then(data => {
                setData(data);
                console.log(data);
                setLoading(false);
                if (data.token){ localStorage.setItem(`token`, `${data.token}`) }
            })
        }
        else {return;}
    }

    if (loading){
        return (<div>Loading...</div>)
    }
    else {
        return (
            <div>
                <p>Authentication</p>
                <form
                    className="Form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        tryToAuth();
                    }}
                >
                    <input
                        style={{backgroundColor: `${usernameColor}`}}
                        type="text"
                        placeholder="username"
                        onChange={(e) => {
                            usernameIsValid(e.target.value);
                            setUsername(e.target.value);
                        }}
                    />
                    <input
                        style={{backgroundColor: `${passwordColor}`}}
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                            passwordIsValid(e.target.value);
                            setPassword(e.target.value);
                        }}
                    />
                    <button>LogIn</button>
                </form>
                <Link to="/reg">Registration</Link>
            </div>
        );
    }

}