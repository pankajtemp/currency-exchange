import ActionConstants from "../actions/constants";

const {
  HTTP_REQUEST_INIT,
  HTTP_REQUEST_SUCCESS,
  HTTP_REQUEST_ERROR
} = ActionConstants;

const DEFAULT_STATE = { httpCallInProgress: false };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case HTTP_REQUEST_INIT: {
      return { httpCallInProgress: true };
    }
    case HTTP_REQUEST_SUCCESS:
    case HTTP_REQUEST_ERROR: {
      return { httpCallInProgress: false };
    }
    default:
      return state;
  }
};
