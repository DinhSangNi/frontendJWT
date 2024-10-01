import { StrictMode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';

import { registerUser } from '../../redux/apiRequest';
import './Register.scss';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState({});


    // get error form redux if it exist
    const register = useSelector(state => state.auth?.register);
    console.log(register);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(username, email, password, phone));
        if (Object.keys(formErrors).length === 0) {
            const newUser = {
                username,
                email,
                password,
                phone,
            }
            registerUser(newUser, dispatch, navigate);
        }
    };

    const validate = (username, email, password, phone) => {
        const errors = {};
        if (!validator.isLength(username, { min: 6, max: undefined }) || validator.contains(username, ' ')) {
            errors.usernameErr = 'username requires at least 6 characters and without space.'
        }
        if (!validator.isEmail(email)) {
            errors.emailErr = 'Email format required.'
        }
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            errors.passwordErr = 'Password requires at least 8 characters, at least 1 uppercase letter, 1 special character, 1 number';
        }
        if (!validator.isMobilePhone(phone) || phone.length !== 10) {
            errors.phoneErr = 'Phone number is not valid.';
        }

        return errors;
    }

    return (
        <>
            <div className="register-wrapper">

                <form className='container form-container' onSubmit={handleSubmit}>
                    <h1 className='row'>Sign Up</h1>
                    <div className="divider row"></div>
                    <div className="form row">
                        <div className="field">
                            <label htmlFor='register-username'>Username</label>
                            <input
                                id='register-username'
                                type="text"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <p>{formErrors?.usernameErr}</p>
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
                            <label >Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <p>{formErrors?.passwordErr}</p>
                        <div className="field">
                            <label>Phone</label>
                            <input
                                type="phone"
                                name="phone"
                                placeholder="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <p>{formErrors?.phoneErr}</p>
                        <div className='field register-policy'>
                            <p>By signing up, you agree to our <span><a href="#">terms of service</a></span> & <span><a href="#">privacy policy</a></span></p>
                        </div>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
                <div className="text">
                    Already have an account? <span><Link to='/login'>Login</Link></span>
                </div>
            </div>{" "}
        </>
    );
}

export default Register;