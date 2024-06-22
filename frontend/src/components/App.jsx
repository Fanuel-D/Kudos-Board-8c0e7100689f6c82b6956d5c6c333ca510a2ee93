import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import KudosBoard from "./kudosBoard";
import CardPage from "./cardPage.jsx";
import "../styles/App.css";
import Modal from "./modal.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  let filteredBoards;
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewClicked, setViewClicked] = useState(false);
  const [boards, setBoards] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleClosed = (event) => {
    event.stopPropagation();
    setModalOpen(false);
  };

  const handleFormSubmit = (curr) => {
    setSearchQuery(curr);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/boards/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the pet.");
        }

        setBoards(boards.filter((board) => board.boardId !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to delete pet. Please try again later.");
      });
  };

  useEffect(() => {
    let URL = `http://localhost:3000/boards`;
    if (searchQuery != "") {
      URL = `http://localhost:3000/boards/search?boardName=${searchQuery}`;
    }
    fetch(URL, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response failed");
        }
        return response.json();
      })
      .then((data) => {
        setBoards(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [boards]);

  const filterBoardsFunction = () => {
    filteredBoards = boards;
    if (filter === "recent") {
      filteredBoards.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

        return dateB - dateA;
      });
    } else if (filter == "all") {
      filteredBoards = boards;
    } else if (filter) {
      filteredBoards = filteredBoards.filter(
        (board) => board.category === filter
      );
    } else {
      filteredBoards.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

        return dateA - dateB;
      });
    }
    return filteredBoards;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App" style={{ textAlign: "center" }}>
              <header className="appHeader">
                <h1 className="nameOfSite" style={{ marginLeft: "20px" }}>
                  Kudos Board
                </h1>
                <SearchForm
                  className="searchForm"
                  formUpdate={handleFormSubmit}
                />
                <div>
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("recent")}>Recent</button>
                  <button onClick={() => setFilter("celebration")}>
                    Celebrations
                  </button>
                  <button onClick={() => setFilter("thankYou")}>
                    Thank You
                  </button>
                  <button onClick={() => setFilter("inspiration")}>
                    Inspiration
                  </button>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="createNewBoardButton"
                  style={{ width: "30%" }}
                >
                  Create New Board
                </button>
              </header>

              <Modal isOpenBool={isModalOpen} isClosedFunc={handleClosed} />
              <div className="bodyPart">
                <div className="innerBodyPart">
                  {filterBoardsFunction().map((board) => {
                    return (
                      <KudosBoard
                        key={board.boardId}
                        board={board}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                </div>
              </div>
              <footer className="appFooter">Designed by Fanuel Dana</footer>
            </div>
          }
        />
        <Route path="/boards/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
