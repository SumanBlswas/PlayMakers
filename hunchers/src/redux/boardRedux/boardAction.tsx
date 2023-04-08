import axios from "axios";
import { AppDispatch } from "../store";
import { GET_API_FAIL, GET_API_REQ, GET_API_SUC, GET_WORDS } from "./boardTypes";

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

const CreateRoom = (id: string) => async (dispatch: AppDispatch) => {

  try {
    // console.log(client.userID);
    const res = await axios.post(
      "https://ivory-donkey-suit.cyclic.app/rooms/create-room",
      {
        userID: id,
      }
    );
    console.log(res.data)
    dispatch({ type: GET_WORDS, payload: res.data.randomWords })
    // console.log("response", res.data);
  } catch (error) {
    console.log(error);
  }
}

const JoinRoom = (id: string) => async (dispatch: AppDispatch) => {
  console.log(id)
  try {
    const res = await axios.get(
      `https://ivory-donkey-suit.cyclic.app/rooms/${id}`);
    console.log("response", res.data)
    dispatch({ type: GET_WORDS, payload: res.data.randomWords })
  } catch (error) {
    console.log(error);
  }
}
export { getBoardApi, CreateRoom, JoinRoom };
