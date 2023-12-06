import { useContext } from 'react';
import {AuthContext} from '../Context/AuthContext'
import axiosInstance from '../Utils/AxiosInstance'
import { useNavigate } from 'react-router-dom';

const useApi = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiCall = async ({ url, method, data = null }) => {
        try {
            const response = await axiosInstance({
                url,
                method,
                data
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.error(error.response.data.message)
                    setUser(null);
                    navigate('/')

                } else if (error.response.status === 403) {
                    console.error("Forbidden Access")
                }
            }
            throw error; 
        }
    };

    return { apiCall };
};

export default useApi;