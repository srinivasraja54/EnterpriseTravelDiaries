import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';
import { setUser } from '../store/userProfileSlice';
import store from '../store/store';
import { useEffect } from 'react';

const GetUserInfo = () => {

    const { instance, accounts } = useMsal();
    
    const fetchUserLoginDetails = async () => {
      await instance.initialize();
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => store.dispatch(setUser(response)));
            });
    }
    useEffect(() => {
        fetchUserLoginDetails();
    }, []);

    return null;
}

export default GetUserInfo;
