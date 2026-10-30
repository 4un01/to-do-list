import styles from './Login.module.css';


function Login(){
    return (
        <div>
            <h1 className={styles.title}>TODO APP</h1>

            <div className={styles.loginContainer}>
                <h2 className={styles.welcomeBack}>Welcome back</h2>
                <p>Log in to your account</p>
        

                <div className={styles.emailContainer}>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required className={styles.emailInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" required className={styles.passwordInp}/>
                </div>

                <button className={styles.loginBtn}>Log in</button>

                <div className={styles.signup}>
                    <p>Don't have an account?</p>
                    <a className={styles.signupLink}>Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;