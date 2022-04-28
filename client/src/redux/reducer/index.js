import {
  GET_ALL_BREEDS,
  GET_ALL_TEMPERAMENTS,
  GET_BREED_BY_ID,
  CLEAR_BREED_BY_ID,
  NOTIFY,
  CLEAR_NOTIFICATION,
} from "../actions";

const initialState = {
  allBreeds: [],
  allTempers: [],
  notification: [],
};

/* const reducers = {
  //GET_ALL_BREED: function(payload),
}; */

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BREEDS: {
      return {
        ...state,
        allBreeds: payload,
      };
    }
    case GET_ALL_TEMPERAMENTS: {
      return {
        ...state,
        allTempers: payload,
      };
    }
    case GET_BREED_BY_ID: {
      return {
        ...state,
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
    default:
      return state;
  }
};

export default reducer;
