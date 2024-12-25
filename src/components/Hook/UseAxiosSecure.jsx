import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogOut } = useContext(AuthContext);

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (import.meta.env.MODE === 'production') {
          console.log('axios error', error.response);
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
            userLogOut().then(() => {
            navigate("/LogIn");
          });
        }
        return Promise.reject(error);
      }
    );
  }, [userLogOut,navigate]);

  return axiosInstance;
};

export default UseAxiosSecure;
