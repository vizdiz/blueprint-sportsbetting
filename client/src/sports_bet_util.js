const API_KEY = "1c17793a176c39bc954c5c0c70e8e4c9"

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
      const game = response[random]["game"];
      // console.log(game["teams"]["home"]["name"] + " vs " + game["teams"]["away"]["name"]);
      return game["id"]
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
          console.log("Found Marathon bet")
          const bets = bookmakers[i]["bets"];
          let targetBetNames = [
            "Home/Away",
            "Highest Scoring Quarter"
          ]
          let targetBets = {}
          for (let j = 0; j < bets.length; j ++) {
            if (targetBetNames.includes(bets[j]["name"])) {
              targetBets[bets[j]["name"]] = bets[j];
            }
          }
          return targetBets
        }
      }
      return {}
    })
}