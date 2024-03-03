import React, {useState} from 'react';
<link rel="stylesheet" href="../DisplayStyles.css" />

const Team = (props) => {
    let img = 'https://media.api-sports.io/basketball/teams/'+props.num+'.png'
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
    return (
        <div className = "Team">
            <h2>{teams[props.num - 132]}</h2>
            <img src={img} alt="image not found"/>
        </div>


    )
}

const Date = (props) => {
    return (
        <div>
            <h5>{props.month}/{props.day}/{props.year}</h5>
        </div>
    )
}

const Display = (props) => {

    return (
        <div>
            <Team num = {props.team1} />
            <Date month={props.month} day={props.day} year={props.year} />
            <Team num = {props.team2} />
        </div>

    )
}

export default Display;