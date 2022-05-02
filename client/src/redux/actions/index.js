import axios from "axios";

export const GET_ALL_BREEDS = "GET_ALL_BREEDS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const GET_BREED_BY_NAME = "GET_BREED_BY_NAME";
export const GET_BREED_BY_ID = "GET_BREED_BY_ID";
export const CLEAR_BREED_BY_ID = "CLEAR_BREED_BY_ID";

export const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";

export const NOTIFY = "NOTIFY";

export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const TOGGLE_LANGUAGE = "TOGGLE_LANGUAGE";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export function getAllBreeds() {
  return function (dispatch) {
    dispatch(activateLoading());
    return axios(`${API_URL}/dogs`)
      .then((response) => {
        dispatch({
          type: GET_ALL_BREEDS,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export const getBreedsByName = (name) => {
  return function (dispatch) {
    dispatch(activateLoading());
    return axios(`${API_URL}/dogs?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_BREED_BY_NAME,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export function getAllTemperaments() {
  return function (dispatch) {
    return axios(`${API_URL}/temperament`)
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
    dispatch(activateLoading());
    return axios(`${API_URL}/dogs/${id}`)
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

export const createBreed = (data) => {
  return function (dispatch) {
    return axios
      .post(`${API_URL}/dog`, data)
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

export function changeTheme(payload) {
  return { type: TOGGLE_DARK_MODE, payload };
}

export function changeLang(payload) {
  return { type: TOGGLE_LANGUAGE, payload };
}

export function activateLoading() {
  return { type: TOGGLE_IS_LOADING };
}
