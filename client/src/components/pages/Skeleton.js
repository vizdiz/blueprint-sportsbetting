import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Input from "../modules/input";
import { getBets, getRandomGame } from "../../sports_bet_util";
import Display from "../modules/disp.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "575558179875-rgo4ik0dami2mu3mb48gh9s761gpf0s6.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
    const [game, setGame] = useState(undefined);
    console.log("Created Skeleton")
    useEffect(() => {
        console.log("Fetching game data");
        getRandomGame()
            .then((gameJSON) => {
                console.log(gameJSON);
                setGame(gameJSON);
                return getBets(gameJSON["id"]);
            })
            .then((bets) => console.log(bets))
            .catch((error) => console.error("Failed to fetch game or bets", error));
    }, []);

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
                <Display team1={game ? game["teams"]["home"]["id"] : 0} team2={game ? game["teams"]["away"]["id"] : 0} date={game ? game["date"] : "0000-00-00"} />
            </div>
        </div>
    );
};

//< Display team1={game ? game["teams"]["home"]["id"] : 0} team2={game ? game["teams"]["away"]["id"] : 0} date={game ? game["date"] : "0000-00-00"} />

export default Skeleton;