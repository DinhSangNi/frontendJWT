import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apiRequest';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            password
        }
        loginUser(user, dispatch, navigate);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={username} onChange={handleUsernameChange} />
            <input type='password' value={password} onChange={handlePasswordChange} />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login;