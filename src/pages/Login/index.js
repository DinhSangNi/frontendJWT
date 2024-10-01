import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';

import { loginUser } from '../../redux/apiRequest';
import './Login.scss';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate email and password
        setFormErrors(validate(email, password));

        if (Object.keys(formErrors).length === 0) {
            const user = {
                email,
                password
            }

            // call api login
            loginUser(user, dispatch, navigate);
        }


    };

    const validate = (email, password) => {
        const errors = {};
        if (!validator.isEmail(email)) {
            errors.emailErr = 'Please enter Email format required.'
        };
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 })) {
            errors.passwordErr = 'Password require at least 8 characters.'
        }

        return errors;

    }


    return (
        <>
            <div className="login-wrapper">

                <form className='container form-container' onSubmit={handleSubmit}>
                    <h1 className='row'>Login</h1>
                    <div className="divider row"></div>
                    <div className="form row">
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <p>{formErrors?.emailErr}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <p>{formErrors?.passwordErr}</p>
                        <div className='field login-addition'>
                            <div className='login-remember-me'>
                                <input id='login-input-remember-me' type='checkbox' />
                                <label htmlFor='login-input-remember-me'>Remember me</label>
                            </div>
                            <div className='login-forgot-password'>
                                <Link to='/forgot_password'>Forgot password</Link>
                            </div>
                        </div>
                        <button className="fluid ui login-button blue">Log in</button>
                    </div>
                </form>
                <div className="text">
                    Already have no an account? <span><Link to='/register'>Register</Link></span>
                </div>
            </div>
        </>
    );
}


export default Login;