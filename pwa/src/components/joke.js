import React, { useEffect, useState } from "react";
import MD5 from "crypto-js/md5";
const Joke = () => {
  const [heroes, setHeroes] = useState("");
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {
        //Nunca me ocnecté al endpoint
        setHeroes("Se cayó la conexión");
      } else {
        setHeroes(JSON.stringify(localStorage.getItem("heroes")));
      }
    } else {
      let publicKey = "245dc2421cd72c6dc9a31c0a3c23036a";
      let privateKey = "7dc7db98ef857a86dbdbb6ad5c2c6c3b4760462d";
      let ts = new Date().getTime();
      let hash = MD5(ts.toString() + privateKey + publicKey);
      const URLMarvel = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`;
      fetch(URLMarvel)
        .then((res) => res.json())
        .then((res) => {
          setHeroes(JSON.stringify(res.data.results));
          localStorage.setItem("heroes", JSON.stringify(res.data.results));
          console.log(res.data.results);
        });
    }
  }, []);
  return (
    <div>
      <h1>MARVEL</h1>
      <p>{heroes}</p>
    </div>
  );
};
export default Joke;
