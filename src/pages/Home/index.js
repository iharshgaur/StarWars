import React, { useContext } from "react";
import logo from "./star-wars-logo.png";
import { useHistory } from "react-router-dom";
import useDebounce from "../../Hooks/useDebounce";
import { CharacterContext } from "../../Contexts/Fetch/CharacterContextprovider";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import spinnerAnimation from "../../svg/spinner.svg";
const Results = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border-radius: 20px;
  margin-bottom: 10px;

  & :nth-child(${({ active }) => active}) {
    color: #ffeb00;
  }
`;

const Character = styled.div`
  & :hover {
    color: #ffeb00;
  }
`;

function HomePage() {
  let history = useHistory();
  const [query, setQuery] = React.useState(""); // currrent query
  const [spinner, setSpinner] = React.useState(false); // spinner animation toggle
  const [active, setActive] = React.useState(0); // active selection from teh list of results
  const scrollRef = React.useRef(); // reference to the scroll element

  const { data, handleSearch, setData, setCurrentCharacter, send, changeSend } =
    useContext(CharacterContext);

  // debouncing the query so that the debouncedSearchTerm gets the serach query
  // after 500ms
  const debouncedSearchTerm = useDebounce(query, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      // handling the search term and setting spinner animation to false
      handleSearch(debouncedSearchTerm);
      setSpinner(false);
      setActive(0);
    } else {
      // clearing all the states if the user query is empty
      setData("");
      setSpinner(false);
      changeSend(false);
      setActive(0);
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  //function to change the current character whenever a choice is made from the results
  function setCharacter(character) {
    setCurrentCharacter(character);
    history.push(`/person/${character.name.trim().split(" ").join("-")}`);
  }

  function handleKeyChange(e) {
    switch (e.keyCode) {
      case 38: {
        //handling arrow key up and scrolling accordingly
        if (active === 2) {
          setActive(0);
          scrollRef.current && (scrollRef.current.scrollTop = 0);
        } else if (active <= 0) {
          setActive(data.length + 1);
          scrollRef.current &&
            (scrollRef.current.scrollTop =
              scrollRef.current.scrollTop + data.length * 50);
        } else {
          setActive((prev) => prev - 1);
          scrollRef.current && (scrollRef.current.scrollTop -= 50);
        }
        break;
      }
      case 40: {
        //handling arrow key down and scrolling accordingly
        if (active === 0) {
          setActive((prev) => prev + 2);
        } else if (active > data.length) {
          setActive(0);
          scrollRef.current && (scrollRef.current.scrollTop = 0);
        } else {
          setActive((prev) => prev + 1);
          scrollRef.current &&
            active > 4 &&
            (scrollRef.current.scrollTop += 80);
        }
        break;
      }
      case 13: {
        // handling the enter key press
        if (active && data.length > 0) {
          setCurrentCharacter(data[active - 2]);
          history.push(
            `/person/${data[active - 2].name.trim().split(" ").join("-")}`
          );
        }
        break;
      }
      default: {
        return;
      }
    }
  }

  return (
    <div className="search" onKeyUp={(e) => handleKeyChange(e)}>
      <div className="logo">
        <img
          src={logo}
          alt="Star Wars Logo"
          style={{ backgroundColor: "transparent" }}
        />
      </div>

      <div className="search__searchbox">
        <div className="search__searchbox__input">
          {/* Search Bar */}
          <input
            placeholder="Search characters"
            class="input-search"
            autoFocus={true}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSpinner(true);
            }}
          />

          {/* Spinner animations */}
          {!spinner && (
            <div>
              {data.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {/* Close Icon in Search Bar */}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDMyOS4yNjkzMyAzMjkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTE5NC44MDA3ODEgMTY0Ljc2OTUzMSAxMjguMjEwOTM4LTEyOC4yMTQ4NDNjOC4zNDM3NS04LjMzOTg0NCA4LjM0Mzc1LTIxLjgyNDIxOSAwLTMwLjE2NDA2My04LjMzOTg0NC04LjMzOTg0NC0yMS44MjQyMTktOC4zMzk4NDQtMzAuMTY0MDYzIDBsLTEyOC4yMTQ4NDQgMTI4LjIxNDg0NC0xMjguMjEwOTM3LTEyOC4yMTQ4NDRjLTguMzQzNzUtOC4zMzk4NDQtMjEuODI0MjE5LTguMzM5ODQ0LTMwLjE2NDA2MyAwLTguMzQzNzUgOC4zMzk4NDQtOC4zNDM3NSAyMS44MjQyMTkgMCAzMC4xNjQwNjNsMTI4LjIxMDkzOCAxMjguMjE0ODQzLTEyOC4yMTA5MzggMTI4LjIxNDg0NGMtOC4zNDM3NSA4LjMzOTg0NC04LjM0Mzc1IDIxLjgyNDIxOSAwIDMwLjE2NDA2MyA0LjE1NjI1IDQuMTYwMTU2IDkuNjIxMDk0IDYuMjUgMTUuMDgyMDMyIDYuMjUgNS40NjA5MzcgMCAxMC45MjE4NzUtMi4wODk4NDQgMTUuMDgyMDMxLTYuMjVsMTI4LjIxMDkzNy0xMjguMjE0ODQ0IDEyOC4yMTQ4NDQgMTI4LjIxNDg0NGM0LjE2MDE1NiA0LjE2MDE1NiA5LjYyMTA5NCA2LjI1IDE1LjA4MjAzMiA2LjI1IDUuNDYwOTM3IDAgMTAuOTIxODc0LTIuMDg5ODQ0IDE1LjA4MjAzMS02LjI1IDguMzQzNzUtOC4zMzk4NDQgOC4zNDM3NS0yMS44MjQyMTkgMC0zMC4xNjQwNjN6bTAgMCIgZmlsbD0iI2I1YjViNSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
                    alt="close"
                    width="15px"
                    style={{
                      padding: "10px",
                      borderRadius: "100%",
                    }}
                    onClick={() => {
                      setData("");
                      setQuery("");
                      changeSend(false);
                    }}
                  />

                  <hr />

                  {/* Search Icon in the search bar */}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDExOC43ODMgMTE4Ljc4MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMTE1Ljk3LDEwMS41OTdMODguNjYxLDc0LjI4NmM0LjY0LTcuMzg3LDcuMzMzLTE2LjExOCw3LjMzMy0yNS40ODhjMC0yNi41MDktMjEuNDktNDcuOTk2LTQ3Ljk5OC00Ny45OTYgICBTMCwyMi4yODksMCw0OC43OThjMCwyNi41MSwyMS40ODcsNDcuOTk1LDQ3Ljk5Niw0Ny45OTVjMTAuMTk3LDAsMTkuNjQyLTMuMTg4LDI3LjQxNC04LjYwNWwyNi45ODQsMjYuOTg2ICAgYzEuODc1LDEuODczLDQuMzMzLDIuODA2LDYuNzg4LDIuODA2YzIuNDU4LDAsNC45MTMtMC45MzMsNi43OTEtMi44MDZDMTE5LjcyLDExMS40MjMsMTE5LjcyLDEwNS4zNDcsMTE1Ljk3LDEwMS41OTd6ICAgIE00Ny45OTYsODEuMjQzYy0xNy45MTcsMC0zMi40NDMtMTQuNTI1LTMyLjQ0My0zMi40NDNzMTQuNTI2LTMyLjQ0NCwzMi40NDMtMzIuNDQ0YzE3LjkxOCwwLDMyLjQ0MywxNC41MjYsMzIuNDQzLDMyLjQ0NCAgIFM2NS45MTQsODEuMjQzLDQ3Ljk5Niw4MS4yNDN6IiBmaWxsPSIjMDAwMDAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                    alt="search"
                    width="15px"
                    style={{
                      backgroundColor: "#FFEB00",
                      padding: "10px",
                      marginLeft: "10px",
                      borderRadius: "100%",
                    }}
                  />
                </div>
              ) : (
                //  Search Icon in the search bar
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDExOC43ODMgMTE4Ljc4MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMTE1Ljk3LDEwMS41OTdMODguNjYxLDc0LjI4NmM0LjY0LTcuMzg3LDcuMzMzLTE2LjExOCw3LjMzMy0yNS40ODhjMC0yNi41MDktMjEuNDktNDcuOTk2LTQ3Ljk5OC00Ny45OTYgICBTMCwyMi4yODksMCw0OC43OThjMCwyNi41MSwyMS40ODcsNDcuOTk1LDQ3Ljk5Niw0Ny45OTVjMTAuMTk3LDAsMTkuNjQyLTMuMTg4LDI3LjQxNC04LjYwNWwyNi45ODQsMjYuOTg2ICAgYzEuODc1LDEuODczLDQuMzMzLDIuODA2LDYuNzg4LDIuODA2YzIuNDU4LDAsNC45MTMtMC45MzMsNi43OTEtMi44MDZDMTE5LjcyLDExMS40MjMsMTE5LjcyLDEwNS4zNDcsMTE1Ljk3LDEwMS41OTd6ICAgIE00Ny45OTYsODEuMjQzYy0xNy45MTcsMC0zMi40NDMtMTQuNTI1LTMyLjQ0My0zMi40NDNzMTQuNTI2LTMyLjQ0NCwzMi40NDMtMzIuNDQ0YzE3LjkxOCwwLDMyLjQ0MywxNC41MjYsMzIuNDQzLDMyLjQ0NCAgIFM2NS45MTQsODEuMjQzLDQ3Ljk5Niw4MS4yNDN6IiBmaWxsPSIjMDAwMDAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                  alt="search"
                  width="15px"
                  style={{
                    backgroundColor: "#FFEB00",
                    padding: "10px",
                    borderRadius: "100%",
                  }}
                />
              )}
            </div>
          )}

          {/* spinner animation */}
          {spinner && <img src={spinnerAnimation} alt="spinner" width="40px" />}
        </div>

        {data.length > 0 ? (
          <>
            <hr></hr>

            {/* Search results */}
            <Results className="results" active={active} ref={scrollRef}>
              <div></div>
              {data &&
                data?.map((character, index) => {
                  return (
                    // Character's Information
                    <Character
                      className="search__searchbox__results"
                      key={uuidv4()}
                      onMouseOver={() => {
                        setActive(index + 2);
                      }}
                      onClick={() => setCharacter(character, index)}
                    >
                      <div className="character__info">
                        <div>
                          <p
                            className="character__name"
                            style={{ fontSize: "15px" }}
                          >
                            {character.name}
                          </p>
                          <p style={{ fontSize: "12px", color: "#babcbe" }}>
                            {character.birth_year}{" "}
                          </p>
                        </div>
                        <p style={{ fontSize: "12px", color: "#babcbe" }}>
                          {character.gender}
                        </p>
                      </div>
                    </Character>
                  );
                })}
            </Results>
          </>
        ) : null}
      </div>

      {/* Handling no result found */}
      {send && data.length === 0 && (
        <p style={{ fontSize: "12px", color: "#babcbe" }}>
          No results found. Try again...
        </p>
      )}
    </div>
  );
}

export default HomePage;
