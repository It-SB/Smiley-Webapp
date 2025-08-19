import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f6fa"
        }}>
            <SignIn path="/login" routing="path" />
        </div>
    );
};

export default Login;