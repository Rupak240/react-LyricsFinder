import React, { useContext, useEffect, Fragment } from "react";
import LyricContext from "../../context/lyricContext";
import Spinner from "../layout/Spinner";
import Track from "./Track";

const Tracks = () => {
  const lyricsContext = useContext(LyricContext);

  const { trackList, heading, loading, getTracks } = lyricsContext;

  useEffect(() => {
    getTracks();
    // eslint-disable-next-line
  }, []);

  if (trackList === undefined || trackList.length === 0 || loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h3 className="text-center mb-4">{heading}</h3>
      <div className="row">
        {trackList.map((item) => (
          <Track key={item.track.track_id} track={item.track} />
        ))}
      </div>
    </Fragment>
  );
};

export default Tracks;
