const redux = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    data: [],
    error: "",
};

const FETCH_USERS_DATA = "FETCH_USERS_DATA";
const FETCH_USERS_DATA_SUCCESS = "FETCH_USERS_DATA_SUCCESS";
const FETCH_USERS_DATA_FAILURE = "FETCH_USERS_DATA_FAILURE";

const fetchUsersData = () => ({ type: FETCH_USERS_DATA });
const fetchUsersDataSuccess = (users) => ({
    type: FETCH_USERS_DATA_SUCCESS,
    payload: users,
});
const fetchUsersDataFailure = (error) => ({
    type: FETCH_USERS_DATA_FAILURE,
    payload: error,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_DATA:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_DATA_SUCCESS:
            return {
                error: "",
                loading: false,
                data: action.payload,
            };
        case FETCH_USERS_DATA_FAILURE:
            return {
                data: [],
                loading: false,
                error: action.error,
            };
    }
};

const fetchData = () => {
    return (dispatch) => {
        dispatch(fetchUsersData());
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                users = response.data.map((item) => item.id);
                dispatch(fetchUsersDataSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersDataFailure(error.message));
            });
    };
};

const store = createStore(reducer, applyMiddleware(thunk));
const unsubscribe = store.subscribe(() => {
    console.log("Users Data : ", store.getState());
});
store.dispatch(fetchData());