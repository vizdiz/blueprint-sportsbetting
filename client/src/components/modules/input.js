import React, { useState } from "react"
import "./input.css"
import { calculateWinnings, getBets, getRandomGame } from "../../sports_bet_util";

// function bet() {
//     const game = getRandomGame();
//     const bets = getBets(game['id']);
//     const winning = calculateWinnings(game,)
// }

const Input = (props) => {
    const quarters = [...Array(4).keys()].map((i) => (i + 1));
    const teams = ["Home", "Away"];

    const [amount, setAmount] = useState(0);
    const [points, setPoints] = useState({ "Home": [0, 0, 0, 0], "Away": [0, 0, 0, 0] });
    const [values, setValues] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    const handleAmount = (event) => {
        setAmount(event.target.value);
    };

    const handleQuarter = (event) => {
        let pointsCopy = { ...points };

        if (event.target.key >= 4) {
            pointsCopy.Away[event.target.key % 4] = parseInt(event.target.value);
        }
        else {
            pointsCopy.Home[event.target.key % 4] = parseInt(event.target.value);
        }

        console.log(event.target.key);

        let valuesCopy = { ...values }
        valuesCopy[event.target.key] = parseInt(event.target.value);

        console.log(valuesCopy);

        setValues(valuesCopy);

        setPoints(pointsCopy);
    };


    const Quarter = (props) => {
        return <div className="Input-Div">
            <span>{"Quarter " + (props.key % 4) + ": "}</span>
            <input
                type="text"
                className="Input-Text"
                placeholder="Enter"
                value={values[props.key]}
                key={props.key}
                onChange={handleQuarter}
            />
        </div>
    }

    const team_displays = teams.map((team, t) => (
        <div className="Games">
            <h3>{team + ":"}</h3>
            {
                quarters.map((quarter, i) => (
                    <Quarter key={(team === "Home") ? (4 + i) : i} className="Games" />
                ))
            }
        </div>
    ));

    return <div className="Input-Container">
        <div>
            <div className="Bet">
                <h3>Bet: </h3>
                <span>Amount: </span>
                <input
                    type="text"
                    className="Input-Text"
                    placeholder="Bet"
                    value={amount}
                    onChange={handleAmount}
                />
            </div>
            <div>
                {team_displays}
            </div>
            <div className="Button">
                <button type="button">Submit</button>
            </div>
        </div>
    </div>;
}

export default Input;