import axios from "axios";
const server = 'http://localhost:3004'


// create user
export const setUser = (token) => async (dispatch) => {
    try {
      dispatch({
        type: "userRequest",
      });
      let user = null
      if(token){
      const {data} = await axios.get(`${server}/token`,{headers:{Authorization:`Bearer ${token}`}})
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
