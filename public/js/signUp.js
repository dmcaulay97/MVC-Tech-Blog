const signUp = async () => {
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signUp', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

const login = async () => {
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (usernam && password) {
        const response = await fetch('/api/users/login', {
            method: 'PPOST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

const signUpBtn = document.querySelector('#create');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUp();
})