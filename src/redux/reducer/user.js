const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  dataOrder: [],
};

const update = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    case "ORDER_HISTORY_PENDING":
      return {
        ...state,
        dataOrder: [],
      };
    case "ORDER_HISTORY_FULFILLED":
      return {
        ...state,
        dataOrder: action.payload.data.data,
      };
    case "ORDER_HISTORY_REJECTED":
      return {
        ...state,
        dataOrder: [],
      };
    default:
      return state;
  }
};

export default update;