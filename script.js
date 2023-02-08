const getJoke = async (category) => {
    if (category === "") {
      category = "Programming";
    }
    res = await fetch(
      `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      10000
    )

    json_res = await res.json()

    return json_res.joke;
  }

module.exports = getJoke;