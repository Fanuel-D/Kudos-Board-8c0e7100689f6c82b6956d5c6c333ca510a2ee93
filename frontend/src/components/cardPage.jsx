import { useState, useEffect } from "react";
import CardModal from "./cardModal";
import { useParams } from "react-router-dom";
import "../styles/cardPage.css";
import KudosCard from "./kudosCard";

function CardPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const isClosedFunc = () => {
    setModalOpen(false);
  };

  const handleCreateButtonClicked = () => {
    setModalOpen(true);
  };

  const handleDelete = (cardId) => {
    fetch(`http://localhost:3000/boards/${id}/${cardId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the pet.");
        }

        setCards(cards.filter((card) => card.cardId !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to delete pet. Please try again later.");
      });
  };

  useEffect(() => {
    const URL = `http://localhost:3000/boards/${id}`;
    fetch(URL, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response failed");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [cards]);
  // console.log(cards);

  return (
    <div>
      <div
        className="createButton"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button onClick={handleCreateButtonClicked}>Create Cards</button>
      </div>

      <div className="cardList">
        {cards.map((card) => {
          return (
            <div key={card.cardId} className="cardList">
              <KudosCard id={id} card={card} handleDelete={handleDelete} />
            </div>
          );
        })}
      </div>
      <CardModal isOpenBool={isModalOpen} isClosedFunc={isClosedFunc} id={id} />
    </div>
  );
}

export default CardPage;
