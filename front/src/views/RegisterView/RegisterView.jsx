import styles from './RegisterView.module.css';
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.jsx";
import {useNavigate} from "react-router-dom";

export function RegisterView() {
    const {post, data} = useFetch('http://localhost:3000/api/users')
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'student'
    });

    const [errorForm, setErrorForm] = useState(null);

    const validateForm = () => {
        const errors = {}
        setErrorForm(null)
        if(form.password.length < 6){
            errors.password = 'Password must be at least 6 characters'
        }
        if(form.username.length < 6){
            errors.username = 'Username must be at least 6 characters'
        }
        if(form.name.length < 3){
            errors.name = 'Name must be at least 3 characters'
        }
        if(!form.password){
            errors.password = 'Password is required'
        }
        if(!form.username){
            errors.username = 'Username is required'
        }
        if(!form.name){
            errors.name = 'Name is required'
        }
        if(!form.confirmPassword){
            errors.confirmPassword = 'Confirm password is required'
        }
        if(form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
            errors.password = 'Passwords do not match'
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
        post('', form);
    }

    useEffect(() => {
        if(data && data.username){
            navigate('/')
        }
    }, [data])
    return (
        <div className={`${styles.container}`}>
        {
            data.message && <span className={`${styles.errorServer}`}>{data.message}</span>
        }
            <h1 className={`${styles.formTitle}`}>Register</h1>
            <form onSubmit={handleSubmit} className={`${styles.formContainer}`}>
                <div className={`${styles.inputContainer}`}>
                    <select name="userType" id="userType" value={form.userType}
                            onChange={e => setForm(state => ({...state, userType: e.target.value}))}>
                        <option value="student">Student</option>
                        <option value="moderator">Moderator</option>
                    </select>
                    <label htmlFor="userType">User type</label>
                </div>
                <div className={`${styles.inputContainer}`}>
                    <input type="text" name="name" id="name" value={form.name}
                           onChange={e => setForm(state => ({...state, name: e.target.value}))}
                           placeholder={'name'}/>
                    <label htmlFor="name">Name</label>
                    {
                        errorForm && errorForm.name && <span className={`${styles.error}`}>{errorForm.name}</span>
                    }
                </div>
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
                <div className={`${styles.inputContainer}`}>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword}
                           onChange={e => setForm(state => ({...state, confirmPassword: e.target.value}))}
                           placeholder={'password'}/>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    {
                        errorForm && errorForm.confirmPassword && <span className={`${styles.error}`}>{errorForm.confirmPassword}</span>
                    }
                </div>
                <button type="submit" className={`${styles.submitButton}`}>Register</button>
                <span className={`${styles.registerLink}`}>
                    Already have an account? <a href="/">Login</a>
                </span>
            </form>
        </div>
    )
}