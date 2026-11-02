import { useState } from 'react';
import styles from './Login.module.css';

function LoginForm({onSwitch}){
    return(
        <div className={styles.container}>
                <h2 className={styles.subtitle}>Welcome back</h2>
                <p>Log in to your account</p>
        

                <div className={styles.emailContainer}>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required className={styles.emailInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required className={styles.passwordInp}/>
                </div>

                <button className={styles.authBtn}>Log in</button>

                <div className={styles.changeAuth}>
                    <p>Don't have an account?</p>
                    <a className={styles.changeAuthLink} onClick={() => onSwitch('signup')}>Sign up</a>
                </div>
        </div>
    ); 
};

function SignupForm({onSwitch}){
    return(
        <div className={styles.container}>
                <h2 className={styles.subtitle}>Create account</h2>
                <p>Sign up to get started</p>
        

                <div className={styles.emailContainer}>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required className={styles.emailInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required className={styles.passwordInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" required className={styles.passwordInp}/>
                </div>

                <button className={styles.authBtn}>Sign Up</button>

                <div className={styles.changeAuth}>
                    <p>Already have an account?</p>
                    <a className={styles.changeAuthLink} onClick={() => onSwitch('login')}>Log in</a>
                </div>
        </div>
    );
}

async function handleBtnClick(authType, email, psswd){
    const authDetails = {
        email: email,
        password: psswd
    };

    try{
        const response  = await fetch(`/api/auth/${authType}`, {
            method: 'POST',
            headers: {'ContentType': 'application/json'},
            body: JSON.stringify(authDetails)
        });
        if(response.ok){
            const resTxt = await response.text();
            alert(resTxt)
        }else{
            const errJson = await response.json();
        }
    }catch(e){
        alert(e);
    }
}

function Auth(){
    const [authPage, setAuthPage] = useState('login');
    return (
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            {/*Depending on authPage state, render either login or signup component and pass in a prop called onSwitch which sets the authPage state*/}
            {authPage === 'login' ? <LoginForm onSwitch={setAuthPage}/> : <SignupForm onSwitch={setAuthPage}/>}
        </div>
    );
}

export default Auth;