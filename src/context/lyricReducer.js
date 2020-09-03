import {
  GET_LYRICS,
  LYRICS_ERROR,
  SEARCH_RES,
  LYRICS_RES,
  TRACK_RES,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LYRICS:
      return {
        ...state,
        trackList: action.payload,
        heading: "Top 10 Tracks",
        loading: false,
        error: null,
      };
    case SEARCH_RES:
      return {
        ...state,
        trackList: action.payload,
        heading: "Search Results",
        loading: false,
        error: null,
      };
    case TRACK_RES:
      return {
        ...state,
        track: action.payload,
        loading: false,
        error: null,
      };
    case LYRICS_RES:
      return {
        ...state,
        lyrics: action.payload,
        loading: false,
        error: null,
      };
    case LYRICS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
