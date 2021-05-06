import { useState, useEffect } from 'react';
import axios from './useHttpClient'; 

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        async function findUser() {
        await axios.get('/api/services/app/Session/GetCurrentLoginInformations')
        .then(res => {
            setUser(res.data.result.user);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
        }
        
        findUser();  
    }, []);
    
    return {
        user,
        setUser,
        isLoading
    }
}