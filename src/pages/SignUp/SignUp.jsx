import React, { useState } from 'react';
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { makeUnAuthenticatedPOSTRequest } from '../../utils/helper';
import { useCookies } from 'react-cookie';
import Notification from '../../components/Notification/Notification';

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hospital_id, setHospitalId] = useState(null);
    const [cookie, setCookie] = useCookies(["token"]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        const requestBody = validateForm(username, password, hospital_id);
        console.log(requestBody);
        if (!requestBody) return;
        try {
            const response = await makeUnAuthenticatedPOSTRequest("/users/signup", requestBody);
            if (response?.status >= 400) {
                showError(response?.message);
                return;
            }
            else {
                const token = response?.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie("token", token, { path: "/", expires: date });
                navigate("/");
            }
        }
        catch (error) {
            showError(error.message);
        }

    }

    const validateForm = (username, password, hospital_id) => {
        username = username.replace(/\s/g, '');
        password = password.replace(/\s/g, '');

        if (username == null || username?.length == 0) {
            showError("Enter username");
            return null;
        }
        if (password == null || password?.length == 0) {
            showError("Enter password");
            return null;
        }
        if (!hospital_id) {
            showError("Enter Password");
            return null;
        };

        return { username, password, hospital_id }
    }

    const showError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3500);
    }

    return (
        <div className="signup-form">

            <div className="signup-form-background">
                <div className="signup-form-background-shape"></div>
                <div className="signup-form-background-shape"></div>
            </div>

            <form onSubmit={(e) => signUp(e)}>

                <div className="signup-form-form">
                    <h3>Sign Up</h3>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" autoComplete="off" id="username" onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="username">Hospital Id</label>
                    <input type="text" placeholder="Enter Hospital Number" autoComplete="off" id="username" onChange={(e) => setHospitalId(e.target.value)} />

                    <button onClick={signUp}>SignUp</button>
                    <div>
                        <div>Already have an account ? <Link to={"/login"}>Login</Link> </div>
                    </div>
                </div>
            </form>

            {
                error && <Notification msg={error} errorColor={"red"} />
            }

        </div>
    )
}

export default SignUp