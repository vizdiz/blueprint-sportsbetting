import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Display from "../disp.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "575558179875-rgo4ik0dami2mu3mb48gh9s761gpf0s6.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      <Team num = {133} />
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
