import React from "react";
import axios from "axios";
export const CharacterContext = React.createContext();
export function CharacterContextProvider({ children }) {
  const [data, setData] = React.useState([]);
  const [send, setSend] = React.useState(false);
  const [currentCharacter, setCharacter] = React.useState({});
  const handleSearch = (query) => {
    axios
      .get(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => {
        setData(res.data.results);
        if (res.data.results.length === 0) {
          setSend(true);
        } else {
          setSend(false);
        }
      })
      .catch((err) => {});
  };
  function changeSend(val) {
    setSend(val);
  }
  function setCurrentCharacter(payload) {
    setCharacter(payload);

    localStorage.setItem("currentCharacter", JSON.stringify(payload));
  }

  const values = {
    data,
    handleSearch,
    setData,
    setCurrentCharacter,
    currentCharacter,
    send,
    changeSend,
  };
  return (
    <CharacterContext.Provider value={values}>
      {children}
    </CharacterContext.Provider>
  );
}
