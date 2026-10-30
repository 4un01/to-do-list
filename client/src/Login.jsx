function Login(){
    return (
        <div>
            <h1>TODO APP</h1>

            <div>
                <h2>Welcome back</h2>
                <p>Log in to your account</p>
        

                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" required />
                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" required/>
                </div>

                <button>Log in</button>

                <div>
                    <p>Don't have an account?</p>
                    <a >Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;