import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import "../styles.css";

const api = "https://kitsu.io/api/edge/";

export default function PagesAnime() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    setInfo({})
    if (text) {
      console.log(text)
      fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <div className="animes-h1">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(str) => setText(str)} />
      {text && !info.data && (
        <span>Carregando...</span>
      )}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img src={anime.attributes.posterImage.small} alt="imagens" />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
