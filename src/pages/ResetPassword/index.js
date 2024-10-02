import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {

    axios.defaults.withCredentials = true;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const { id, token } = useParams();

    const validate = () => {

        const errors = {};

        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 })) {
            errors.passwordErr = 'Password require at least 8 characters.';
        }

        if (password !== confirmPassword) {
            errors.confirmPasswordErr = 'Comfirm password is not match password.';
        }

        return errors;
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());
        console.log(Object.keys(errors));
        console.log('hello');
        try {
            const url = `/v1/auth/resetpassword/${id}/${token}`;
            const res = await axios.post(url, { password });

            if (!res.data?.success) {
                setMessage(res.data?.message);
            }
            else {
                setMessage('Successfully Reset Password .');
                navigate('/login');
            }



        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='reset-password-wrapper'>
            <div className='reset-password-container container'>
                <h1 className='reset-password-title row'>
                    Reset Password
                </h1>
                {
                    !message ?
                        (<form className='reset-password-form row container' onSubmit={handleOnSubmit}>
                            <div className='reset-password-input-box'>
                                <label>Enter your password</label>
                                <input id='reset-password-input' type='text' placeholder='Enter the password' value={password} onChange={handlePasswordChange} />
                                <p >{errors?.passwordErr}</p>
                            </div>
                            <div className='reset-password-input-box'>
                                <label>Enter your confirm password</label>
                                <input id='reset-password-input' type='text' placeholder='Enter the confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <p >{errors?.confirmPasswordErr}</p>
                            </div>
                            <button className='reset-password-button btn btn-success' type='submit'>Reset</button>
                        </form>)
                        :
                        (<div className='reset-password-message row'><p>{message}</p></div>)
                }
            </div>
        </div>
    )
}

export default ResetPassword;