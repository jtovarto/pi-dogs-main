import axios from "axios";

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";

export function getAllBreeds(name, source) {
  return function (dispatch) {
    let query = "";
    if (name) query += "?name=" + name;
    if (source) {
      query ? (query += "&") : (query += "?");
      query += "source=" + source;
    }
    
    return axios("http://localhost:3001/dogs" + query)
      .then((response) => {
        dispatch({
          type: GET_ALL_BREEDS,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getAllTemperaments() {
  return function (dispatch) {
    return axios("http://localhost:3001/temperament")
      .then((response) => {
        dispatch({
          type: GET_ALL_TEMPERAMENTS,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export const getBreedsByName = () => {
  return (dispatch) => {
    console.log("dispatch");
    dispatch({ type: GET_ALL_BREEDS });
  };
};
