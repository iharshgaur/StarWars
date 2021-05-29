import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import StarfieldAnimation from "react-starfield-animation";
import Sound from "react-sound";
import Theme from "./sounds/Theme.mp3";
import "./App.css";

function App() {
  const [playSound, setPlaySound] = React.useState(false); // to toggle the theme music on the landing page

  return (
    <>
      {/* Sound button */}
      <button
        style={{
          color: "#ffeb00",
          position: "absolute",
          top: "5%",
          right: "5%",
          zIndex: "500",
          padding: "10px",
          border: 0,
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
        onClick={() => setPlaySound(!playSound)}
      >
        {playSound ? (
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDkzLjAzOCA5My4wMzgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTQ2LjU0Nyw3NS41MjFjMCwxLjYzOS0wLjk0NywzLjEyOC0yLjQyOSwzLjgyM2MtMC41NzMsMC4yNzEtMS4xODcsMC40MDItMS43OTcsMC40MDJjLTAuOTY2LDAtMS45MjMtMC4zMzItMi42OTYtMC45NzMgICBsLTIzLjA5OC0xOS4xNEg0LjIyNUMxLjg5Miw1OS42MzUsMCw1Ny43NDIsMCw1NS40MDlWMzguNTc2YzAtMi4zMzQsMS44OTItNC4yMjYsNC4yMjUtNC4yMjZoMTIuMzAzbDIzLjA5OC0xOS4xNCAgIGMxLjI2Mi0xLjA0NiwzLjAxMi0xLjI2OSw0LjQ5My0wLjU2OWMxLjQ4MSwwLjY5NSwyLjQyOSwyLjE4NSwyLjQyOSwzLjgyM0w0Ni41NDcsNzUuNTIxTDQ2LjU0Nyw3NS41MjF6IE02Mi43ODQsNjguOTE5ICAgYy0wLjEwMywwLjAwNy0wLjIwMiwwLjAxMS0wLjMwNCwwLjAxMWMtMS4xMTYsMC0yLjE5Mi0wLjQ0MS0yLjk4Ny0xLjIzN2wtMC41NjUtMC41NjdjLTEuNDgyLTEuNDc5LTEuNjU2LTMuODIyLTAuNDA4LTUuNTA0ICAgYzMuMTY0LTQuMjY2LDQuODM0LTkuMzIzLDQuODM0LTE0LjYyOGMwLTUuNzA2LTEuODk2LTExLjA1OC01LjQ4NC0xNS40NzhjLTEuMzY2LTEuNjgtMS4yNC00LjEyLDAuMjkxLTUuNjVsMC41NjQtMC41NjUgICBjMC44NDQtMC44NDQsMS45NzUtMS4zMDQsMy4xOTktMS4yMzFjMS4xOTIsMC4wNiwyLjMwNSwwLjYyMSwzLjA2MSwxLjU0NWM0Ljk3Nyw2LjA5LDcuNjA2LDEzLjQ4NCw3LjYwNiwyMS4zOCAgIGMwLDcuMzU0LTIuMzI1LDE0LjM1NC02LjcyNSwyMC4yNEM2NS4xMzEsNjguMjE2LDY0LjAwNyw2OC44MzIsNjIuNzg0LDY4LjkxOXogTTgwLjI1Miw4MS45NzYgICBjLTAuNzY0LDAuOTAzLTEuODY5LDEuNDQ1LTMuMDUyLDEuNDk1Yy0wLjA1OCwwLjAwMi0wLjExNywwLjAwNC0wLjE3NywwLjAwNGMtMS4xMTksMC0yLjE5My0wLjQ0Mi0yLjk4OC0xLjIzN2wtMC41NTUtMC41NTUgICBjLTEuNTUxLTEuNTUtMS42NTYtNC4wMjktMC4yNDYtNS43MDdjNi44MTQtOC4xMDQsMTAuNTY4LTE4LjM5NiwxMC41NjgtMjguOTgyYzAtMTEuMDExLTQuMDE5LTIxLjYxMS0xMS4zMTQtMjkuODQ3ICAgYy0xLjQ3OS0xLjY3Mi0xLjQwNC00LjIwMywwLjE3LTUuNzgzbDAuNTU0LTAuNTU1YzAuODIyLTAuODI2LDEuODktMS4yODEsMy4xMTUtMS4yNDJjMS4xNjMsMC4wMzMsMi4yNjMsMC41NDcsMy4wMzYsMS40MTcgICBjOC44MTgsOS45MjgsMTMuNjc1LDIyLjcxOCwxMy42NzUsMzYuMDFDOTMuMDQsNTkuNzgzLDg4LjQ5OSw3Mi4yMDcsODAuMjUyLDgxLjk3NnoiIGZpbGw9IiNmZmViMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
            alt="sound-on"
            width="25px"
          />
        ) : (
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ0OC4wNzUgNDQ4LjA3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0iTTM1Mi4wMjEsMTYuMDc1YzAtNi4wOC0zLjUyLTExLjg0LTguOTYtMTQuNGMtNS43Ni0yLjg4LTEyLjE2LTEuOTItMTYuOTYsMS45MmwtMTQxLjc2LDExMi45NmwxNjcuNjgsMTY3LjY4VjE2LjA3NXoiIGZpbGw9IiNmZmViMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJNNDQzLjM0OSw0MjAuNzQ3bC00MTYtNDE2Yy02LjI0LTYuMjQtMTYuMzg0LTYuMjQtMjIuNjI0LDBzLTYuMjQsMTYuMzg0LDAsMjIuNjI0bDEwMC42NzIsMTAwLjcwNGgtOS4zNzYgIGMtOS45MiwwLTE4LjU2LDQuNDgtMjQuMzIsMTEuNTJjLTQuOCw1LjQ0LTcuNjgsMTIuOC03LjY4LDIwLjQ4djEyOGMwLDE3LjYsMTQuNCwzMiwzMiwzMmg3NC4yNGwxNTUuODQsMTI0LjQ4ICBjMi44OCwyLjI0LDYuNCwzLjUyLDkuOTIsMy41MmMyLjI0LDAsNC44LTAuNjQsNy4wNC0xLjZjNS40NC0yLjU2LDguOTYtOC4zMiw4Ljk2LTE0LjR2LTU3LjM3Nmw2OC42NzIsNjguNjcyICBjMy4xMzYsMy4xMzYsNy4yMzIsNC43MDQsMTEuMzI4LDQuNzA0czguMTkyLTEuNTY4LDExLjMyOC00LjY3MkM0NDkuNTg5LDQzNy4xMzEsNDQ5LjU4OSw0MjcuMDE5LDQ0My4zNDksNDIwLjc0N3oiIGZpbGw9IiNmZmViMDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
            alt="sound-off"
            width="25px"
          />
        )}
      </button>

      {/* Sound component */}
      <Sound
        url={Theme}
        playStatus={playSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        playFromPosition={0 /* in milliseconds */}
        loop={true}
      />

      {/* background star animation component */}
      <StarfieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Main app components */}
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/person/:id">
              <Person />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
