import ActionConstants from "../actions/constants";

const {
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  DELETE_ALL_CARDS,
  FLIP_CARD
} = ActionConstants;

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { from, to, time, fromRate, toRate } = action.payload;
      return [
        ...state,
        {
          identifier: from + "_" + to,
          from,
          to,
          created: time,
          factor: toRate / fromRate
        }
      ];
    }
    case UPDATE_CARD: {
      // console.log("update called with ", action.payload);
      const { time, identifier, result } = action.payload;
      return state.map((card) => {
        if (card.identifier === identifier)
          return {
            ...card,
            lastUpdated: time,
            factor: result
          };
        else return card;
      });
    }
    case DELETE_CARD: {
      // console.log("delete called with ", action.payload);
      const { identifier } = action.payload;
      return state.filter((card) => card.identifier !== identifier);
    }
    case DELETE_ALL_CARDS: {
      return DEFAULT_STATE;
    }
    case FLIP_CARD: {
      const { identifier, from, to, factor } = action.payload;
      return state.map((card) => {
        if (card.identifier === identifier)
          return {
            ...card,
            identifier: to + "_" + from,
            from: to,
            to: from,
            factor: 1 / factor
          };
        else return card;
      });
    }
    default:
      return state;
  }
};
