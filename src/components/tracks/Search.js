import React, { useState, useEffect, useContext } from "react";
import LyricContext from "../../context/lyricContext";

const Search = () => {
  const lyricContext = useContext(LyricContext);

  const { getSearchResult } = lyricContext;

  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");

  useEffect(() => {
    getSearchResult(trackTitle);
    // eslint-disable-next-line
  }, [trackTitle]);

  const findTrack = (e) => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = (e) => setUserInput(e.target.value);

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            value={userInput}
            placeholder="Song Title..."
            name="userInput"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block mb-5">
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
