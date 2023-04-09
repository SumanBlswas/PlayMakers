import {
  GET_API_FAIL,
  GET_API_REQ,
  GET_API_SUC,
  GET_WORDS,
} from "./boardTypes";

let initValue = {
  board: [],
  isLoading: false,
  isError: false,
  words: [],
};

const reducer = (state = initValue, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_API_REQ: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_API_SUC: {
      return {
        ...state,
        isLoading: false,
        board: payload,
      };
    }
    case GET_API_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case GET_WORDS: {
      return { ...state, words: payload };
    }
    default:
      return state;
  }
};

export { reducer };
