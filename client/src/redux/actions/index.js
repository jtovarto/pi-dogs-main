import axios from "axios";

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";

export function getAllBreeds(dispatch) {
  return function (name, source) {
    let query;
    if (name) query += "?name=" + name;
    if (source) {
      query ? (query += "&") : (query += "?");
      query += "source=" + source;
    }
    return axios("http://localhost:3001/dogs")
      .then((response) => {
        dispatch({
          type: GET_ALL_BREEDS,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getAllTemperaments(dispatch) {
  return function () {  
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
