import styles from './Login.module.css';


function Login(){
    return (
        <div>
            <h1 className={styles.title}>TODO APP</h1>

            <div className={styles.container}>
                <h2 className={styles.subtitle}>Welcome back</h2>
                <p>Log in to your account</p>
        

                <div className={styles.emailContainer}>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required className={styles.emailInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" required className={styles.passwordInp}/>
                </div>

                <button className={styles.authBtn}>Log in</button>

                <div className={styles.changeAuth}>
                    <p>Don't have an account?</p>
                    <a className={styles.changeAuthLink}>Sign up</a>
                </div>
            </div>

            <div className={styles.container}>
                <h2 className={styles.subtitle}>Create account</h2>
                <p>Sign up to get started</p>
        

                <div className={styles.emailContainer}>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required className={styles.emailInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" required className={styles.passwordInp}/>
                </div>

                <div className={styles.psswrdContainer}>
                    <label for="confirmPassword">Confirm password</label>
                    <input type="text" name="password" id="confirmPassword" required className={styles.passwordInp}/>
                </div>

                <button className={styles.authBtn}>Sign Up</button>

                <div className={styles.changeAuth}>
                    <p>Already have an account?</p>
                    <a className={styles.changeAuthLink}>Log in</a>
                </div>
            </div>
        </div>
    );
}

export default Login;