import React, { useReducer } from "react";
import axios from "axios";
import LyricContext from "./lyricContext";
import lyricReducer from "./lyricReducer";
import { GET_LYRICS, LYRICS_ERROR, SEARCH_RES, LYRICS_RES, TRACK_RES } from "../types";

const LyricsFinder = (props) => {
  const initialState = {
    trackList: [],
    track: {},
    lyrics: {},
    heading: "",
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(lyricReducer, initialState);

  // GET TRACKS - @GET
  const getTracks = async () => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      );

      // console.log(res.data.message.body);

      dispatch({ type: GET_LYRICS, payload: res.data.message.body.track_list });
    } catch (error) {
      dispatch({ type: LYRICS_ERROR, payload: "GET Request Failed" });
    }
  };

  // GET SEARCH RESULT - @GET
  const getSearchResult = async (trackTitle) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page=1&page_size=10&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      );

      // console.log(res.data.message.body.track_List);

      dispatch({ type: SEARCH_RES, payload: res.data.message.body.track_list });
    } catch (error) {
      dispatch({ type: LYRICS_ERROR, payload: "GET Request Failed" });
    }
  };

  // LYRICS SEARCH RESULT - @GET
  const getLyricsResult = async (id) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );

      console.log(res.data.message.body.lyrics);

      dispatch({ type: LYRICS_RES, payload: res.data.message.body.lyrics });
    } catch (error) {
      dispatch({ type: LYRICS_ERROR, payload: "GET Request Failed" });
    }
  };
  
  // GET TRACK RESULT - @GET
  const getTrackResult = async (id) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
      );

      console.log(res.data.message.body.track);

      dispatch({ type: TRACK_RES, payload: res.data.message.body.track });
    } catch (error) {
      dispatch({ type: LYRICS_ERROR, payload: "GET Request Failed" });
    }
  };

  return (
    <LyricContext.Provider
      value={{
        trackList: state.trackList,
        track: state.track,
        lyrics: state.lyrics,
        heading: state.heading,
        loading: state.loading,
        error: state.error,
        getTracks,
        getSearchResult,
        getLyricsResult,
        getTrackResult
      }}
    >
      {props.children}
    </LyricContext.Provider>
  );
};

export default LyricsFinder;
