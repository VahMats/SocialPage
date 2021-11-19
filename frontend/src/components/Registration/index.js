import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../../App.css"

export default function Registration  () {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordColor, setPasswordColor] = useState("white")
    const [confirmColor, setConfirmColor] = useState("white")
    const [emailColor, setEmailColor] = useState("white")
    const [usernameColor, setUsernameColor] = useState("white")

    const sampleForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    const sampleForEmail = /\S+@\S+\.\S+/

    function passwordIsValid (password) {
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

    function posswordIsConfirmed (confirmPassword){
        if (confirmPassword === password){
            setConfirmColor("green");
        }
        else setConfirmColor("yellow")
    }

    function emailIsValid (email){
        if (sampleForEmail.test(email)){
            setEmailColor("green");
        }
        else setEmailColor("yellow")
    }

    function tryToReg () {
        if (emailColor === "green" && passwordColor === "green" && confirmColor === "green" && usernameColor === "green") {
            const regPacket = {
                firstName,
                lastName,
                email,
                username,
                password
            }
            fetch("/api/user/register", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(regPacket)
            }).then(res => res.json()).then(data => {
                if (!data.isUniqeUsername){
                    alert(`This Username is alredy used`)
                }
                if (!data.isUniqeEmail){
                    alert(`This Email is alredy used`)
                }
            })
        }
        else { return; }
    }

    return(
        <div>
            <p>Registration</p>
            <form className="Form" onSubmit={e=>{
                e.preventDefault();
                tryToReg();
            }}>
                <input
                    type="text"
                    placeholder="firstName"
                    onChange={(e)=>{
                        setFirstName(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="lastName"
                    onChange={(e)=>{
                        setLastName(e.target.value)
                }}
                />
                <input
                    style={{backgroundColor: `${usernameColor}`}}
                    type="text"
                    placeholder="username"
                    onChange={(e)=>{
                        setUsername(e.target.value);
                        usernameIsValid(e.target.value);
                    }}
                />
                <input
                    style={{backgroundColor: `${emailColor}`}}
                    type="text"
                    placeholder="email"
                    onChange={(e)=>{
                        setEmail(e.target.value);
                        emailIsValid(e.target.value);
                    }}
                />
                <input
                    style={{backgroundColor: `${passwordColor}`}}
                    type="password"
                    placeholder="password"
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        passwordIsValid(e.target.value);
                    }}
                />
                <input
                    style={{backgroundColor: `${confirmColor}`}}
                    type="password"
                    placeholder="confirm your password"
                    onChange={(e)=>{
                        posswordIsConfirmed(e.target.value);
                    }}
                />
                <button>Register</button>
            </form>
            <span>
                <Link to="/auth">Authentication</Link>
            </span>
        </div>
    );

}