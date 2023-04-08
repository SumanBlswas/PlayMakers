import axios from "axios";
import { AppDispatch } from "../store";
import { GET_API_FAIL, GET_API_REQ, GET_API_SUC } from "./boardTypes";

const getApiReq = () => {
  return {
    type: GET_API_REQ,
  };
};

const getApiSuc = (payload: any) => {
  return {
    type: GET_API_SUC,
    payload,
  };
};

const getApiFail = () => {
  return {
    type: GET_API_FAIL,
  };
};

const getBoardApi = () => async (dispatch: AppDispatch) => {
  dispatch(getApiReq());
  try {
    const response = await axios.get(
      `https://maroon-sea-urchin-tam.cyclic.app/users`
    );
    dispatch(getApiSuc(response.data));
  } catch (error) {
    dispatch(getApiFail());
  }
};

export { getBoardApi };
