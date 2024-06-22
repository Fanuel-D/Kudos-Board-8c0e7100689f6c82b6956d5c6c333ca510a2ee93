import { useEffect, useState } from "react";
import "../styles/kudosCard.css";
function KudosCard({ id, card, handleDelete }) {
  const [voteCount, setVoteCount] = useState(card.voteCount);

  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };


  const handleSubmit = () => {
    fetch(`http://localhost:3000/boards/comments/${id}/${card.cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update board.");
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

  const handleVoteClicked = () => {
    let newCount = voteCount + 1;
    fetch(`http://localhost:3000/boards/${id}/${card.cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ voteCount: newCount }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update board.");
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setVoteCount(newCount);
  };

  const deleteClicked = (e) => {
    e.stopPropagation();
    handleDelete(card.cardId);
  };

  return (
    <div className="kudosCard">
      <img className="cardGif" src={card.gif} alt="there is a gif here" />
      <div>
        <h4>Title: {card.cardTitle}</h4>
        <h4>Message: {card.message}</h4>
        <h4>Author: {card.author}</h4>
        <h4>Comment: {card.comment}</h4>
      </div>
      <div className="cardButtons">
        <button
          style={{ backgroundColor: "dark", height: "25px" }}
          className="deleteBoard"
          onClick={deleteClicked}
        >
          Delete Board
        </button>
        <button
          onClick={handleVoteClicked}
          style={{ backgroundColor: "dark", height: "25px" }}
        >
          Upvote: {card.voteCount}
        </button>
        <form onSubmit={handleSubmit}>
              <input
                style={{ border: "solid black 1px", height:"30px", width: "110px" }}
                name="title"
                type="text"
                onChange={handleChange}
                value= {comment}
                placeholder="Add comments"
              />
              <button>Submit</button>
          </form>

      </div>
    </div>
  );
}

export default KudosCard;
