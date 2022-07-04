let initialMovies = [];

  for(let i=1;i<=12; i++)
  {
    initialMovies.push({
      "_id": i,
      "owner": "1",
      "duration": 107,
      "nameRU": "33 слова о дизайне",
      "image": require(`../images/image${i}.jpg`),
      "trailer": "https://www.youtube.com/watch?v=__2oZSM1l1Q",
      "movieId": 1,
      "isSave": (i===3 || i===5 || i===10) ? 1 : 0
    });
  }

export default initialMovies;