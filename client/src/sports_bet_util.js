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
      // console.log(response);
      const random = Math.floor(Math.random() * response.length);
      return response[random]["game"];
      // console.log(game["teams"]["home"]["name"] + " vs " + game["teams"]["away"]["name"]);
    })
    .catch((error) => {
      throw `GET request to "${url}" failed with error:\n${error}`
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

}

