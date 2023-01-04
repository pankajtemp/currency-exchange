import ActionConstants from "./constants";

const requestURL = "https://api.exchangerate.host";

const {
  HTTP_REQUEST_INIT,
  HTTP_REQUEST_SUCCESS,
  HTTP_REQUEST_ERROR,
  LATEST_RATES_SUCCESS,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  DELETE_ALL_CARDS,
  FLIP_CARD
} = ActionConstants;

const actionCreator = (type, payload = null) => {
  return {
    type,
    payload
  };
};

const getLatestRates = () => {
  return async (dispatch, getState) => {
    dispatch(actionCreator(HTTP_REQUEST_INIT));
    await fetch(`${requestURL}/latest`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch(actionCreator(HTTP_REQUEST_SUCCESS));
        dispatch(
          actionCreator(LATEST_RATES_SUCCESS, {
            ...data,
            time: new Date()
          })
        );
      })
      .catch((e) => dispatch(actionCreator(HTTP_REQUEST_ERROR, e)));
  };
};

const getLatestConversionRate = (payload = {}) => {
  return async (dispatch, getState) => {
    dispatch(actionCreator(HTTP_REQUEST_INIT));
    const { from = "USD", to = "INR", identifier } = payload;
    fetch(`${requestURL}/convert?from=${from}&to=${to}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch(actionCreator(HTTP_REQUEST_SUCCESS));
        dispatch(
          actionCreator(UPDATE_CARD, {
            ...data,
            identifier,
            time: new Date()
          })
        );
      })
      .catch((e) => dispatch(actionCreator(HTTP_REQUEST_ERROR, e)));
  };
};

const addCard = (payload = {}) => {
  return (dispatch, getState) => {
    const { from, to } = payload;
    const {
      rateData: {
        rates: { [from]: fromRate, [to]: toRate }
      }
    } = getState();
    dispatch(
      actionCreator(ADD_CARD, {
        from,
        to,
        fromRate,
        toRate,
        time: new Date()
      })
    );
  };
};

const deleteCard = (payload = {}) => {
  return (dispatch, getState) => {
    const { allCards = false, ...restPayload } = payload;
    if (allCards) dispatch(actionCreator(DELETE_ALL_CARDS));
    else
      dispatch(
        actionCreator(DELETE_CARD, {
          ...restPayload
        })
      );
  };
};

const flipCard = (payload = {}) => {
  return (dispatch, getState) => {
    dispatch(actionCreator(FLIP_CARD, payload));
  };
};

export {
  getLatestRates,
  getLatestConversionRate,
  addCard,
  deleteCard,
  flipCard
};
