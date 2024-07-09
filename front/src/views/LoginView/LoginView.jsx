import {useEffect, useState} from "react";
import styles from "./LoginView.module.css";
import {useFetch} from "../../hooks/useFetch.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useNavigate, Link} from "react-router-dom";

export function LoginView() {
    const navigate = useNavigate();
    const {login, updateUser, isAuthenticated} = useAuth();
    const {post, data, error} = useFetch('http://localhost:3000/api/users');
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [errorForm, setErrorForm] = useState(null);

    const validateForm = () => {
        const errors = {}
        setErrorForm(null)
        if(!form.password){
            errors.password = 'Password is required'
        }
        if(!form.username){
            errors.username = 'Username is required'
        }
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm()
        if(Object.keys(errors).length > 0){
            setErrorForm(errors)
            return
        }
        post('login', form);
    }

    useEffect(() => {
        console.log(data)
        if (data && data?.token) {
            login({}, data.token);
        }
        console.log(error, 'error')
    }, [data]);

    useEffect(() => {
        if (isAuthenticated) {
            updateUser();
        }
    }, [isAuthenticated]);

    if(isAuthenticated) navigate('/user/class');

    return (
        <div className={`${styles.container}`}>
            {
                data.message && <span className={`${styles.errorServer}`}>{data.message}</span>
            }
            <h1 className={`${styles.formTitle}`}>Login</h1>
            <form onSubmit={handleSubmit} className={`${styles.formContainer}`}>
                <div className={`${styles.inputContainer}`}>
                    <input type="text" name="username" id="username" value={form.username}
                           onChange={e => setForm(state => ({...state, username: e.target.value}))}
                           placeholder={'username'}/>
                    <label htmlFor="username">Username</label>
                    {
                        errorForm && errorForm.username && <span className={`${styles.error}`}>{errorForm.username}</span>
                    }
                </div>
                <div className={`${styles.inputContainer}`}>
                    <input type="password" name="password" id="password" value={form.password}
                           onChange={e => setForm(state => ({...state, password: e.target.value}))}
                           placeholder={'password'}/>
                    <label htmlFor="password">Password</label>
                    {
                        errorForm && errorForm.password && <span className={`${styles.error}`}>{errorForm.password}</span>
                    }
                </div>
                <button type="submit" className={`${styles.submitButton}`}>Login</button>
                <span className={`${styles.registerLink}`}>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
}