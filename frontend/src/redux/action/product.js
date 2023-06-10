import axios from "axios";
import { SERVER } from '../../config';

// get all products
export const getAllProducts = (query) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest",
      });
      let category = query?.category
      category = category ? `/category/${category}` : ''
      const response = await axios.get(`${SERVER}/products${category}`);

      const data = response?.data || []

      dispatch({
        type: "getAllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFailed",
        payload: error.response.data.message,
      });
    }
  };