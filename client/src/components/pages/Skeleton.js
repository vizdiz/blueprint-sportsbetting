import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Input from "../modules/input";
import { getBets, getRandomGame } from "../../sports_bet_util";
import Display from "../modules/disp.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "575558179875-rgo4ik0dami2mu3mb48gh9s761gpf0s6.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
    getRandomGame()
        .then((id) => {
            // console.log(id);
            getBets(id)
                .then((bets) => console.log(bets))
        })

    return (
        <div>
            <div className="NavBar-container">
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    {userId ? (
                        <button className="NavBar-login"
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
                </GoogleOAuthProvider>
            </div>
            <div className="Element">
                <Input />
            </div>
            <div className="Element">
                <Display team1={145} team2={140} day={1} month={4} year={2006} />
            </div>
        </div>
    );
};

export default Skeleton;