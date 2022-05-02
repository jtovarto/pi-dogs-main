import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_BREED_BY_NAME,
  GET_BREED_BY_ID,
  CLEAR_BREED_BY_ID,
  NOTIFY,
  CLEAR_NOTIFICATION,
  TOGGLE_DARK_MODE,
  TOGGLE_LANGUAGE,

  TOGGLE_IS_LOADING,

} from "../actions";

import { THEME_LIGHT } from "../../hooks/useTheme";
import { ES } from "../../utils/Lang/useLang";

const initialState = {
  allBreeds: [],
  allTempers: [],
  notification: [],
  theme: THEME_LIGHT,
  lang: ES,

  isLoading: true,

};

/* const reducers = {
  //GET_ALL_BREED: function(payload),
}; */

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BREEDS: {
      return {
        ...state,
        isLoading: false,
        allBreeds: payload,
      };
    }
    case GET_ALL_TEMPERAMENTS: {
      return {
        ...state,
        allTempers: payload,
      };
    }
    case GET_BREED_BY_NAME: {
      return {
        ...state,
        isLoading: false,
        allBreeds: payload,
      };
    }
    case GET_BREED_BY_ID: {
      return {
        ...state,
        isLoading: false,
        breed: payload,
      };
    }
    case CLEAR_BREED_BY_ID: {
      return {
        ...state,
        breed: {},
      };
    }
    case NOTIFY: {
      return {
        ...state,
        notification: [payload],
      };
    }
    case CLEAR_NOTIFICATION: {
      return {
        ...state,
        notification: [],
      };
    }
    case TOGGLE_DARK_MODE: {
      return {
        ...state,
        theme: payload,
      };
    }
    case TOGGLE_LANGUAGE: {
      return {
        ...state,
        language: payload,
      };
    }

    case TOGGLE_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
