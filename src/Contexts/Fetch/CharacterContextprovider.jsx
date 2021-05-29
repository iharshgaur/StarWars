import React from "react";
import axios from "axios";
export const CharacterContext = React.createContext();
export function CharacterContextProvider({ children }) {
  const [data, setData] = React.useState([]); // data recieved from the api
  const [send, setSend] = React.useState(false); // toggle to check if the request is sent or not
  const [currentCharacter, setCharacter] = React.useState({}); // current character selected by the user

  // fetching the characters according to query match
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

  // function to toggle send
  function changeSend(val) {
    setSend(val);
  }

  //function to set current character
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
