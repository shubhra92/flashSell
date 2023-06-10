
// set Order
export const setOrder = (product) => async (dispatch) => {
    try {
      dispatch({
        type: "setOrderSuccess",
        payload: product,
      });
    } catch (error) {
      dispatch({
        type: "setOrderFailed",
        payload:error.message
      });
    }
  };