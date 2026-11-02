import { useState } from 'react';
import styles from './Login.module.css';

function LoginForm({onSwitch, page}){
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    return(
        <div className={styles.container}>
                <h2 className={styles.subtitle}>Welcome back</h2>
                <p>Log in to your account</p>
        

                <div className={styles.emailContainer}>
                    <label>Email</label>
                    <input placeholder="you@example.com" required className={styles.emailInp} onChange={({target}) => setEmail(target.value)} value={email}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label>Password</label>
                    <input required className={styles.passwordInp} onChange={({target}) => setPsswd(target.value)} value={psswd}/>
                </div>

                <button className={styles.authBtn} onClick={() => handleBtnClick(page, email, psswd)}>Log in</button>

                <div className={styles.changeAuth}>
                    <p>Don't have an account?</p>
                    <a className={styles.changeAuthLink} onClick={() => onSwitch('signup')}>Sign up</a>
                </div>
        </div>
    ); 
};

function SignupForm({onSwitch, page}){
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [confirmPsswd, setConfirmPsswd] = useState('');
    return(
        <div className={styles.container}>
                <h2 className={styles.subtitle}>Create account</h2>
                <p>Sign up to get started</p>
        

                <div className={styles.emailContainer}>
                    <label>Email</label>
                    <input placeholder="you@example.com" required className={styles.emailInp} onChange={({target}) => setEmail(target.value)} value={email}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label>Password</label>
                    <input required className={styles.passwordInp} onChange={({target}) => setPsswd(target.value)} value={psswd}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label>Confirm password</label>
                    <input required className={styles.passwordInp} onChange={({target}) => setConfirmPsswd(target.value)} value={confirmPsswd}/>
                </div>

                <button className={styles.authBtn} onClick={() => handleBtnClick(page, email, psswd, confirmPsswd)}>Sign Up</button>

                <div className={styles.changeAuth}>
                    <p>Already have an account?</p>
                    <a className={styles.changeAuthLink} onClick={() => onSwitch('login')}>Log in</a>
                </div>
        </div>
    );
}

async function handleBtnClick(authType, email, psswd, confirmPsswd){
    const authDetails = {
        email: email,
        password: psswd
    };

    if(authType === 'signup' && psswd !== confirmPsswd){
        alert('Passwords do not match');
    }

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
        alert(e.message);
    }
};

function Auth(){
    const [authPage, setAuthPage] = useState('login');
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [confirmPsswd, setConfirmPsswd] = useState('');
    return (
        <div>
            <h1 className={styles.title}>TODO APP</h1>
            {/*Depending on authPage state, render either login or signup component and pass in a prop called onSwitch which sets the authPage state*/}
            {authPage === 'login' ? <LoginForm onSwitch={setAuthPage} page={authPage}/> : <SignupForm onSwitch={setAuthPage} page={authPage}/>}
        </div>
    );
}

export default Auth;