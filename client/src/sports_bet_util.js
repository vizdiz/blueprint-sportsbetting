const API_KEY = "8097ad8b9eb665d99d8e442839cce0cc"

export function getRandomGame() {
  const year = 2023 // Math.floor(Math.random() * 7 + 2015);
  const url = `https://v1.basketball.api-sports.io/odds?league=12&season=${year + "-" + (year+1)}`
  return fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY
    }
  })
    .then((response) => response.json())
    .then((json) => {
      const response = json["response"];
      // console.log(response)
      let games = []
      for (let i = 0; i < response.length; i ++) {
        if (response[i]["game"]["status"]["short"] === "FT") {
          games.push(response[i]);
        }
      }
      const random = Math.floor(Math.random() * games.length);
      return games[random]["game"];
    })
}

export function getBets(gameId) {
  const url = `https://v1.basketball.api-sports.io/odds?game=${gameId}`
  return fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY
    }
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const bookmakers = json["response"][0]["bookmakers"];
      for (let i = 0; i < bookmakers.length; i ++) {
        if (bookmakers[i]["name"] === "Marathon Bet") {
          // console.log("Found Marathon bet")
          const bets = bookmakers[i]["bets"];
          let targetBetNames = [
            2, // Home/Away
            23, // Home Team Total Points (1st Quarter)
            52, // Home Team Total Points (2nd Quarter)
            54, // Home Team Total Points (3rd Quarter)
            56, // Home Team Total Points (4th Quarter)
            24, // Away Team Total Points (1st Quarter)
            53, // Away Team Total Points (2nd Quarter)
            55, // Away Team Total Points (3rd Quarter)
            57, // Away Team Total Points (4th Quarter)
          ]
          let targetBets = {}
          for (let j = 0; j < bets.length; j ++) {
            if (targetBetNames.includes(bets[j]["id"])) {
              targetBets[bets[j]["id"]] = bets[j]["values"];
            }
          }
          return targetBets
        }
      }
      return {}
    })
}

// targetBet, targetChoice, money
// let bets = [
//   [23, 0, 10],
//   ...
// ]

export function calculateWinnings(game, odds, bets) {
  let away = game["scores"]["away"]; // Dictionary of home scores for game(quarters and overtime)
  let home = game["scores"]["home"]; // Dictionary of away scores for game(quarters and overtime)
  let oddsChoice;
  let value;
  let winnings = 0
  for (let bet in bets)
  {
    let score = 0;
    winnings -= bet[2]
    oddsChoice = odds[bets[0]][bet[1]];//Dictionary with odds and value
    let arr = oddsChoice["value"].split(" ");
    switch(bet[0])
    {
      case 23:
        score = home["quarter_1"]
        break;
      case 52:
        score = home["quarter_2"]
        break;
      case 54:
        score = home["quarter_3"]
        break;
      case 56:
        score = home["quarter_4"]
        break;
      case 24:
        score = away["quarter_1"]
        break;
      case 53:
        score = away["quarter_2"]
        break;
      case 55:
        score = away["quarter_3"]
        break;
      case 57:
        score = away["quarter_4"]
        break;
    }
    if (arr[0] === "O" ? score > arr[1] : score < arr[1])
    {
      winning += arr[1] * bet[2];
    }
    
  }
  return winnings;
}
