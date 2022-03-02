import { Dispatch } from "redux";

export const GetFiles = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "LOADING_FILES",
    });
  } catch (error) {}
};
