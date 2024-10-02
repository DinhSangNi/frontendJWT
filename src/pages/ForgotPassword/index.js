import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

import './ForgotPassword.scss';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {

        const errors = {};

        if (!validator.isEmail(email)) {
            errors.emailErr = 'Please enter Email format required.'
        }

        return errors;
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());
        if (Object.keys(errors).length === 0) {
            const res = await axios.post('/v1/auth/forgotpassword', { email });
            if (!res?.data.success) {
                setMessage(res?.message);
            }
            else {
                setMessage('An email has been sent to your email. Please follow the instructions in that email to reset your password.');
            }
        }

    }

    return (
        <div className='forgot-password-wrapper'>
            <div className='forgot-password-container container'>
                <h1 className='forgot-password-title row'>
                    Forgot Password
                </h1>
                {
                    !message ?
                        (<form className='forgot-password-form row container' onSubmit={handleOnSubmit}>
                            <div className='forgot-password-input-box'>
                                <label>Enter your email</label>
                                <input id='forgot-password-input' type='text' placeholder='Enter the email' value={email} onChange={handleEmailChange} />
                                <p >{errors?.emailErr}</p>
                            </div>
                            <button className='forgot-password-button btn btn-success' type='submit'>Send</button>
                        </form>)
                        :
                        (<div className='forgot-password-message row'><p>{message}</p></div>)
                }
            </div>
        </div>
    )
}


export default ForgotPassword;
