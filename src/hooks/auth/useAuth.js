import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from './useHttpClient';
import { UserContext } from './UserContext';  

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return await axios.get('/api/services/app/Session/GetCurrentLoginInformations').then(res => {         
            setUser(res.data.result.user);  
            history.push('/Settings');                     
            }).catch((err) => {
            setError(err.data);
        })
    }

    //register user  
    const registerUser = async (data) => {
        console.log(data);
        const { username, email, password, passwordConfirm } = data;
            return axios.post(`auth/register`, {
                  username,
                  email,
                  password,
                  passwordConfirm
                }).then(async () => {
                    await setUserContext();
                })
                .catch((err) => {
                   return setError(err.response.data);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { userNameOrEmailAddress, password, rememberClient } = data;
            return axios.post('/api/TokenAuth/Authenticate', {
                userNameOrEmailAddress,
                password,
                rememberClient
            }).then(async (res) => {
                window.localStorage.setItem('token', res.data.result.accessToken)
                await setUserContext();
            }).catch((err) => {
                setError(err.data);
            })
        };

    return {
        registerUser,
        loginUser,
        error
    }
}
