import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reqGuestSession } from '@/store/features/users/usersSlice';
import axios from '@/data';

const GuestAuth = ({ children }) => {
    let dispatch = useDispatch();
    let { guestSessionId } = useSelector((state) => state.users);

    useEffect(() => {
        if (!localStorage.getItem('g_session')) dispatch(reqGuestSession());
        else axios.defaults.params.guest_session_id = guestSessionId || localStorage.getItem('g_session');
    }, [dispatch, guestSessionId]);

    return <>{children}</>;
}

export default GuestAuth;