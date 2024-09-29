import { useState, } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../redux/apiRequest';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password
        };
        registerUser(user, dispatch, navigate);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} placeholder='Enter the Username' onChange={handleUserName} />
                <input type='email' value={email} placeholder='Enter the Email' onChange={handleEmail} />
                <input type='password' value={password} placeholder='Enter the Password' onChange={handlePassword} />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register;