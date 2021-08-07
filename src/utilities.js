import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "HISTORY":
      return { ...state, history: [action.payload, ...state.history] };
    // case "CHANGE-HISTORY":
    //   return {
    //     ...state,
    //     history: state.history
    //       .filter((vid) => vid.id !== action.payload.id)
    //       .concat(action.payload),
    //   };
    case "LIKE":
      return { ...state, liked: [...state.liked, action.payload] };
    case "WATCH-LATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };
    default:
      return state;
  }
};
