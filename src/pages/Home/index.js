import React, { useContext } from "react";
import logo from "./star-wars-logo.png";
import { useHistory } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";
import { CharacterContext } from "../../Contexts/Fetch/CharacterContextprovider";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
  const [query, setQuery] = React.useState("");
  let history = useHistory();
  const { data, handleSearch, setData, setCurrentCharacter } =
    useContext(CharacterContext);
  const debouncedSearchTerm = useDebounce(query, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      handleSearch(debouncedSearchTerm);
    } else {
      setData("");
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  function setCharacter(character, id) {
    setCurrentCharacter(character);
    history.push(`/person/${id}`);
  }

  return (
    <div className="search">
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>

      <div className="search__searchbox">
        <div className="search__searchbox__input">
          <input
            placeholder="Search by name"
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDExOC43ODMgMTE4Ljc4MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMTE1Ljk3LDEwMS41OTdMODguNjYxLDc0LjI4NmM0LjY0LTcuMzg3LDcuMzMzLTE2LjExOCw3LjMzMy0yNS40ODhjMC0yNi41MDktMjEuNDktNDcuOTk2LTQ3Ljk5OC00Ny45OTYgICBTMCwyMi4yODksMCw0OC43OThjMCwyNi41MSwyMS40ODcsNDcuOTk1LDQ3Ljk5Niw0Ny45OTVjMTAuMTk3LDAsMTkuNjQyLTMuMTg4LDI3LjQxNC04LjYwNWwyNi45ODQsMjYuOTg2ICAgYzEuODc1LDEuODczLDQuMzMzLDIuODA2LDYuNzg4LDIuODA2YzIuNDU4LDAsNC45MTMtMC45MzMsNi43OTEtMi44MDZDMTE5LjcyLDExMS40MjMsMTE5LjcyLDEwNS4zNDcsMTE1Ljk3LDEwMS41OTd6ICAgIE00Ny45OTYsODEuMjQzYy0xNy45MTcsMC0zMi40NDMtMTQuNTI1LTMyLjQ0My0zMi40NDNzMTQuNTI2LTMyLjQ0NCwzMi40NDMtMzIuNDQ0YzE3LjkxOCwwLDMyLjQ0MywxNC41MjYsMzIuNDQzLDMyLjQ0NCAgIFM2NS45MTQsODEuMjQzLDQ3Ljk5Niw4MS4yNDN6IiBmaWxsPSIjMDAwMDAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
            alt="center"
            width="15px"
            style={{
              backgroundColor: "#FFEB00",
              padding: "10px",
              borderRadius: "100%",
            }}
          />
        </div>

        {data.length > 0 ? (
          <>
            <hr></hr>
            <div className="results">
              {data &&
                data?.map((character) => (
                  <div
                    className="search__searchbox__results"
                    key={uuidv4()}
                    onClick={() => setCharacter(character, uuidv4())}
                  >
                    <div className="character__info">
                      <div>
                        <p style={{ fontSize: "15px" }}>{character.name}</p>
                        <p style={{ fontSize: "12px", color: "#babcbe" }}>
                          {character.birth_year}{" "}
                        </p>
                      </div>
                      <p style={{ fontSize: "12px", color: "#babcbe" }}>
                        {character.gender}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
