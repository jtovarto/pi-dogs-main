import { GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS } from "../actions";

const initialState = {
  allBreeds: [],
  allTempers: [],
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
    default:
      return state;
  }
};

export default reducer;
