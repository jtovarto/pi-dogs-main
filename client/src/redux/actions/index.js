import axios from "axios";

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_BREED_BY_ID = "GET_BREED_BY_ID";
export const CLEAR_BREED_BY_ID = "CLEAR_BREED_BY_ID";

export const NOTIFY = "NOTIFY";

export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

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

export function getBreedById(id) {
  return function (dispatch) {
    return axios("http://localhost:3001/dogs/" + id)
      .then((response) => {
        dispatch({
          type: GET_BREED_BY_ID,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function clearBreedById() {
  return { type: CLEAR_BREED_BY_ID };
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION };
}

export const getBreedsByName = () => {
  return (dispatch) => {
    console.log("dispatch");
    dispatch({ type: GET_ALL_BREEDS });
  };
};

export const createBreed = (data) => {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/dog", data)
      .then((response) => {
        if (response.status === 400) {
          throw new Error();
        }

        dispatch({
          type: NOTIFY,
          payload: {
            type: "success",
            message: "Breed has been created",
          },
        });
      })
      .catch((err) => {
        return dispatch({
          type: NOTIFY,
          payload: {
            type: "fail",
            message: "There was a problem creating a dog",
          },
        });
      });
  };
};
