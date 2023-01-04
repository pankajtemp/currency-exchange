import ActionConstants from "../actions/constants";

const { LATEST_RATES_SUCCESS } = ActionConstants;

const DEFAULT_STATE = { lastUpdated: null, rates: {}, currencyOptions: [] };

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LATEST_RATES_SUCCESS: {
      const { time, rates, base } = action.payload;
      return {
        ...state,
        lastUpdated: time,
        rates: {
          ...rates,
          [base]: 1
        },
        currencyOptions: [...Object.keys(rates), base]
      };
    }
    default:
      return state;
  }
};
