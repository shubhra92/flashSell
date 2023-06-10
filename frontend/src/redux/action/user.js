import axios from "axios";
// const server = 'http://localhost:3004'
import { SERVER } from "../../config";


// create user
export const setUser = (token) => async (dispatch) => {
    try {
      dispatch({
        type: "userRequest",
      });
      let user = null
      if(token){
      const {data} = await axios.get(`${SERVER}/token`,{headers:{Authorization:`Bearer ${token}`}})
      user = data
      }
      dispatch({
        type: "userSuccess",
        payload: user,
      });
    } catch (error) {
    //   dispatch({
    //     type: "userFailed",
    //     payload: error.response?.data?.message,
    //   });
    console.log(error)
    }
  };
