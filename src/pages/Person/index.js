import React from "react";
import "./index.css";
function Person() {
  const currentCharacter = JSON.parse(localStorage.getItem("currentCharacter"));

  return (
    <div className="person">
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
    </div>
  );
}

export default Person;
