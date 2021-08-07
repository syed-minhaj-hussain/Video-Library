import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "HISTORY":
      return { ...state, history: [action.payload, ...state.history] };
    case "CHANGE-HISTORY":
      return {
        ...state,
        history: state.history
          .filter((vid) => vid.id !== action.payload.id)
          .concat(action.payload),
      };
    default:
      return state;
  }
};
