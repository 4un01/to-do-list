const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

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

signupLink.addEventListener('click', switchCards);
loginLink.addEventListener('click', switchCards);
