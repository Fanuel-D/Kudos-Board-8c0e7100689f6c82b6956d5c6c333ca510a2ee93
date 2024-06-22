import { useEffect, useState } from "react";
import "../styles/SearchForm.css";
import PropTypes from "prop-types";

function SearchForm({ formUpdate }) {
  const [search, searchQuery] = useState("");

  const handleSearchChange = (event) => {
    searchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formUpdate(search);
  };

  return (
    <form className="searchForm" action="" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type movie name"
        onChange={handleSearchChange}
        value={search}
      />
      <button type="submit">Search</button>
    </form>
  );
}

SearchForm.propTypes = {
  formUpdate: PropTypes.func,
};

export default SearchForm;
