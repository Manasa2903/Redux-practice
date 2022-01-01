const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// const initialState = {
//     cakeCount: 50,
//     icecreamCount: 20,
// };

const iceCreamState = {
    icecreamCount: 20,
};

const cakeState = {
    cakeCount: 50,
};

const buyCake = () => ({ type: BUY_CAKE, info: "First redux" });
const buyIceCream = () => ({ type: BUY_ICECREAM, info: "Second redux" });

const cakeReducer = (state = cakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                cakeCount: state.cakeCount - 5,
            };
        default:
            return state;
    }
};

const iceCreamReducer = (state = iceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {...state, icecreamCount: state.icecreamCount - 1 };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial Count : ", store.getState());
const unsubscribe = store.subscribe(() => {
    console.log("Updated Count : ", store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
store.dispatch(buyCake());
console.log(store.getState());