const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn'); 

function switchCards(e){
    e.preventDefault();

    const loginCard = document.querySelector('.loginContainer');
    const signupCard = document.querySelector('.signupContainer');
    
    if(loginCard.style.display === 'flex' && signupCard.style.display === 'none'){
        loginCard.style.display = 'none';
        signupCard.style.display = 'flex';
    }else{
        loginCard.style.display = 'flex';
        signupCard.style.display = 'none';
    }

}

function getLoginData(){
    const email = document.getElementById('email');
    const psswrd = document.getElementById('password');

    const user = {
        email: email.value,
        password: psswrd.value
    };

    return user;
}

async function sendLoginData(){
    const user = getLoginData();
    const {email} = user;

    try{
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        if(response.ok){
            const result = await response.text();
            await loginResult(result, email);
        }else{
            throw new Error('user doesnt exist');
        }
    }catch(e){
        alert(e);
    }
}

function loginResult(result, email){
    if(result === 'true'){
        localStorage.setItem('email', email);
        window.location.href = '/tasks.html';
        console.log('test');
    }else{
        console.log(result);
    }
};

function getSignupData(){
    const email = document.getElementById('signupEmail');
    const psswrd = document.getElementById('signupPassword');

    const user = {
        email: email.value,
        password: psswrd.value
    };

    return user;
}

async function sendSignupData(){
    const user = getSignupData();
    const {email} = user;

    try{
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        if(response.ok){
            const result = await response.text();
            await signupResult(result, email);

        }else{
            throw new Error('Something went wrong');
        }
    }catch(e){
        console.log(e.message);
    }
}

function signupResult(result, email){
    if(result === 'created'){
        localStorage.setItem('email', email);
        window.location.href = '/tasks.html';
        console.log('success');
    }else{
        console.log('result');
    }
}


signupLink.addEventListener('click', switchCards);
loginLink.addEventListener('click', switchCards);

loginBtn.addEventListener('click', sendLoginData);
signupBtn.addEventListener('click', sendSignupData);