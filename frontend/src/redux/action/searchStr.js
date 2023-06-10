
export const searchQuery = (query) => async (dispatch) => {
      
      dispatch({
        type: "searchRequest",
        payload: query?query:'',
      });

  };