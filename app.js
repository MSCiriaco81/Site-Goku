// Dados de usuários para login
function dados() {
    return [ 
        {id:1, login:"matheus", password:"1234", email:"matheus@gmail.com"}, 
        {id:2, login:"allan", password:"1234", email:"allan@gmail.com"}, 
        {id:3, login:"larissa", password:"1234", email:"larissa@gmail.com"}, 
        {id:4, login:"yasmin", password:"1234", email:"yasmin@gmail.com"}, 
        {id:5, login:"zico", password:"1234", email:"zico@gmail.com"} 
    ];
}

const usuarios = dados();

// Função de login
function Login() {
    let log = document.querySelector("#login").value.trim();
    let senha = document.querySelector("#password").value.trim();
    let loginSuccessful = false;

    for (let i = 0; i < usuarios.length; i++) {
        if (log === usuarios[i].login && senha === usuarios[i].password) {
            loginSuccessful = true;
            break;
        }
    }

    if (loginSuccessful) {
        alert("Você Logou!");
        window.location.href = "no_login_index.html"; 
    } else {
        alert("Login ou senha inválidos!");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.querySelector("#loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", Login);
    }

    const carrinhoBtn = document.querySelector('#carrinhoBtn');
    if (carrinhoBtn) {
        carrinhoBtn.addEventListener('click', exibirCarrinho);
    }

    // Fecha o carrinho ao clicar fora dele, exceto no botão do carrinho
    window.addEventListener('click', function(event) {
        let carrinho = document.querySelector('#carrinho-lista');
        let carrinhoBtn = document.querySelector('#carrinhoBtn');
        
        if (carrinho && !carrinho.contains(event.target) && event.target !== carrinhoBtn && !carrinhoBtn.contains(event.target)) {
            esconderCarrinho();
        }
    });
});

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${produto} foi adicionado ao carrinho!`);
    atualizarContadorCarrinho();
}

// Função para exibir os itens no carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let carrinhoLista = document.querySelector('#carrinho-lista ul');
    if (!carrinhoLista) return;

    carrinhoLista.innerHTML = ''; // Limpa a lista

    if (carrinho.length === 0) {
        carrinhoLista.innerHTML = '<li class="carrinho-vazio">Carrinho vazio</li>';
    } else {
        carrinho.forEach((item, index) => {
            let li = document.createElement('li');
            li.textContent = `${index + 1}. ${item}`;
            carrinhoLista.appendChild(li);
        });
    }

    document.querySelector('#carrinho-lista').style.display = 'block'; // Exibe o carrinho
}

// Função para esconder o carrinho
function esconderCarrinho() {
    let carrinho = document.querySelector('#carrinho-lista');
    if (carrinho) {
        carrinho.style.display = 'none'; // Esconde o carrinho
    }
}

// Função para atualizar o contador de itens no carrinho
function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let contador = document.querySelector('#contador-carrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// Atualiza o contador ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    atualizarContadorCarrinho();
});
