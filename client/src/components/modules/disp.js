import React, { useState } from 'react';
import './disp.css'

const Team = (props) => {
    const teams = [
        "Atlanta Hawks",
        "Boston Celtics",
        "Brooklyn Nets",
        "Charlotte Hornets",
        "Chicago Bulls",
        "Cleveland Cavaliers",
        "Dallas Mavericks",
        "Denver Nuggets",
        "Detroit Pistons",
        "Golden State Warriors",
        "Houston Rockets",
        "Indiana Pacers",
        "Los Angeles Clippers",
        "Los Angeles Lakers",
        "Memphis Grizzlies",
        "Miami Heat",
        "Milwaukee Bucks",
        "Minnesota Timberwolves",
        "New Orleans Pelicans",
        "New York Knicks",
        "Oklahoma City Thunder",
        "Orlando Magic",
        "Philadelphia 76ers",
        "Phoenix Suns",
        "Portland Trail Blazers",
        "Sacramento Kings",
        "San Antonio Spurs",
        "Toronto Raptors",
        "Utah Jazz",
        "Washington Wizards"]
    let img = 'https://media.api-sports.io/basketball/teams/' + props.teamID + '.png'

    return (
        <div className="team-display">
            <p>{teams[props.teamID - 132]}</p>
            <img src={img} alt="image not found" />
        </div>


    )
}

const Date = (props) => {
    return (
        <div>
            <p text-align='center'>{props.month}/{props.day}/{props.year}</p>
        </div>
    )
}

const Display = (props) => {
    let year = props.date.slice(0, 4);
    let month = props.date.slice(5, 7);
    let day = props.date.slice(8, 10);
    return (
        <div>
            <div className='teams-display'>
                <Team teamID={props.team1} />
                <p>VS.</p>
                <Team teamID={props.team2} />
            </div>
            <div className='date-display'>
                <Date month={month} day={day} year={year} />
            </div>
        </div>

    )
}

export default Display;