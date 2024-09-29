import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { createAxios } from '../../createInstance';
import { logoutUser } from '../../redux/apiRequest';
import { loginSuccess } from '../../redux/authSlice';



function HomePage() {


    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser(user?._id, dispatch, navigate, user?.accessToken, axiosJWT);
    }

    const handleRefreshToken = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/v1/auth/refresh');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleExit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/v1/auth/exit');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>LogOut</button>
            <button onClick={handleRefreshToken}>refresh Token</button>
            <button onClick={handleExit}>Exit</button>
        </div>
    )
}

export default HomePage;