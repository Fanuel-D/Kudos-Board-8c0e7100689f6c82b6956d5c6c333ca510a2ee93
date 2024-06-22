import "../styles/kudosBoard.css";

import { Link } from "react-router-dom";

function KudosBoard({ board, handleDelete }) {
  const deleteClicked = (e) => {
    e.stopPropagation();
    handleDelete(board.boardId);
  };
  const imgURL = board.image;
  return (
    <div
      className="kudos-card"
      // onClick={(e) => onClickSelectedCard(movie.id, e)}
    >
      <img src={imgURL} alt="there is an image here" className="imageTag" />
      <div
        className="lowerMovieCardPart"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="boardDetails">
          <h5 style={{ margin: "4px" }}> Title: {board.title}</h5>
          <h5 style={{ margin: "4px" }}>
            Author: {board.author ? board.author : "No name provided"}
          </h5>
          <h5 style={{ margin: "4px" }}> category: {board.category}</h5>
        </div>

        <div className="bottomButtons">
          <Link to={"/boards/" + board.boardId}>
            <button className="viewBoard"> View Board</button>
          </Link>
          <button
            style={{ backgroundColor: "blue" }}
            className="deleteBoard"
            onClick={deleteClicked}
          >
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
}

// MovieCard.propTypes = {
//   onClickSelectedCard: PropTypes.func,
//   watchedMoviesHandler: PropTypes.func,
//   likedMoviesHandler: PropTypes.func,
//   movie: PropTypes.object,
// };

export default KudosBoard;
{
  /* <a
href={`http://localhost:3000/boards/${board.boardId}`}
className="view-board"
> */
}
