import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
function Person(playSound, togglePlaySound) {
  let currentCharacter = JSON.parse(localStorage.getItem("currentCharacter"));
  let history = useHistory();
  return (
    <div
      className={currentCharacter.name === "Darth Vader" ? "dark" : "person"}
    >
      <h1>{currentCharacter.name}</h1>
      <div>
        <div>
          <h2>Personal Info</h2>
          <h4>Birth Year : {currentCharacter.birth_year}</h4>
          <h4>Gender : {currentCharacter.gender}</h4>
          <h4>Height : {currentCharacter.height}</h4>
        </div>
        <div>
          <h2>Anatomy</h2>
          <h4>Eye Color : {currentCharacter.eye_color}</h4>
          <h4>Mass : {currentCharacter.mass}</h4>
          <h4>Hair Color : {currentCharacter.hair_color}</h4>
        </div>
      </div>
      <button
        className={
          currentCharacter.name === "Darth Vader"
            ? "backButtonDark"
            : "backButton"
        }
        onClick={() => {
          history.push("/");
          localStorage.clear();
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default Person;
