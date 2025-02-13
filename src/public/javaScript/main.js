async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    try {
        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = '/minhas-compras';
        } else {
            alert(data.mensagem);
        }
    } catch (error) {
        alert('Erro ao fazer login');
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

// Adicionar token em todas as requisições
fetch = new Proxy(fetch, {
    apply: function(target, thisArg, argumentsList) {
        const token = localStorage.getItem('token');
        if (token) {
            if (!argumentsList[1]) {
                argumentsList[1] = {};
            }
            if (!argumentsList[1].headers) {
                argumentsList[1].headers = {};
            }
            argumentsList[1].headers['Authorization'] = `Bearer ${token}`;
        }
        return target.apply(thisArg, argumentsList);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});