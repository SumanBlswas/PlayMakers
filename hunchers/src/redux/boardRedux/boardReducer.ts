import { GET_API_FAIL, GET_API_REQ, GET_API_SUC } from "./boardTypes";

let initValue = {
  board: [],
  isLoading: false,
  isError: false,
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
    default:
      return state;
  }
};

export { reducer };
