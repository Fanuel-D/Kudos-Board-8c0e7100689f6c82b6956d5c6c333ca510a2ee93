import { useState } from "react";
// import PropTypes from "prop-types";
import "../styles/cardModal.css";

function CardModal({ isOpenBool, isClosedFunc, id }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [gifURLOptions, setGifURLOptions] = useState([]);
  const [formData, setFormData] = useState({
    cardTitle: "",
    message: "",
    author: "",
    gif: "",
  });
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const handleSelectGif = (gifUrl) => {
    setGifURLOptions([]);
    setFormData((prevState) => ({
      ...prevState,
      gif: gifUrl,
    }));
  };

  const searchGifs = async (e) => {
    e.preventDefault();
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchPhrase}&limit=6&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GIFs.");
        }
        return response.json();
      })
      .then((data) => {
        const gifData = data.data;
        const gifURLs = gifData.map((gif) => gif.images.original.url);
        setGifURLOptions(gifURLs);
      })
      .catch((error) => {
        console.error("Error searching for GIFs:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(`https://kudos-board-4dsm.onrender.com/boards/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add pet.");
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      {isOpenBool && (
        <div className="cardModalBackDrop">
          <div className="cardModalContent">
            <form onSubmit={handleSubmit}>
              <label style={{ color: "white" }} htmlFor="">
                Title
              </label>
              <input
                style={{ border: "solid black 1px" }}
                name="cardTitle"
                type="text"
                onChange={handleChange}
                value={formData.cardTitle}
              />
              <label style={{ color: "white" }} htmlFor="">
                Author
              </label>
              <input
                style={{ border: "solid black 1px" }}
                name="author"
                onChange={handleChange}
                type="text"
                value={formData.author}
              />
              <label style={{ color: "white" }} htmlFor="">
                Message
              </label>
              <input
                style={{ border: "solid black 1px" }}
                name="message"
                onChange={handleChange}
                type="text"
                value={formData.message}
              />
              <input
                type="text"
                placeholder="Search GIFs..."
                value={searchPhrase}
                onChange={(e) => setSearchPhrase(e.target.value)}
              />
              <button
                className="search-button"
                type="search"
                onClick={searchGifs}
              >
                Search
              </button>
              {gifURLOptions.length > 0 && (
                <div className="gifOptions">
                  {gifURLOptions.map((gifUrl) => (
                    <div className="gifContainer">
                      <img
                        className="gif"
                        key={gifUrl}
                        src={gifUrl}
                        alt="GIF"
                        onClick={() => handleSelectGif(gifUrl)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <button type="submit">Submit</button>
            </form>

            <button
              className="closeButton"
              style={{ width: "40%" }}
              onClick={isClosedFunc}
            >
              {" "}
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal.propTypes = {
//   isOpenBool: PropTypes.bool,
//   isClosedFunc: PropTypes.func,
// };
export default CardModal;
