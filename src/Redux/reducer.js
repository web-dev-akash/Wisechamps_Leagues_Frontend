import {
  ERROR,
  LEAGUE_CATEGORY,
  LOADING,
  PREVIOUS_LEAGUE,
  USERS,
  USER_STATUS,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  users: [],
  leagueCategory: "",
  userStatus: "",
  prevLeague: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ERROR: {
      return {
        loading: false,
        error: true,
        users: [],
        leagueCategory: "",
        userStatus: "",
      };
    }
    case USERS: {
      return {
        ...state,
        loading: false,
        error: null,
        users: payload,
      };
    }
    case LEAGUE_CATEGORY: {
      return {
        ...state,
        loading: false,
        error: null,
        leagueCategory: payload,
      };
    }
    case USER_STATUS: {
      return {
        ...state,
        loading: false,
        error: null,
        userStatus: payload,
      };
    }
    case PREVIOUS_LEAGUE: {
      return {
        ...state,
        loading: false,
        error: null,
        prevLeague: payload,
      };
    }
    default: {
      return state;
    }
  }
};
