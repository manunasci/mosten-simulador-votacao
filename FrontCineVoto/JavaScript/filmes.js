// A URL base da sua API
const API_URL = 'http://sua-api.com/api'; // Substitua por a URL real da sua API

// Função para buscar os filmes da API
async function buscarFilmesDaAPI() {
    try {
        const response = await fetch(`${API_URL}/filmes`);
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes da API');
        }
        const filmes = await response.json();
        return filmes;
    } catch (error) {
        console.error("Não foi possível carregar os filmes:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para renderizar os filmes
async function renderizarFilmes() {
    const filmes = await buscarFilmesDaAPI();
    const container = document.getElementById('filmes-container');
    container.innerHTML = ''; // Limpa o container

    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${filme.imagem}" alt="${filme.titulo}">
            <h3>${filme.titulo}</h3>
            <p>Gênero: ${filme.genero}</p>
            <button onclick="votar(1, ${filme.id})">Gostei (${filme.gostei})</button>
            <button onclick="votar(-1, ${filme.id})">Não Gostei (${filme.naoGostei})</button>
        `;
        container.appendChild(card);
    });
}

// Função para enviar um voto para a API
async function votar(tipoVoto, id) {
    try {
        const response = await fetch(`${API_URL}/votar/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ voto: tipoVoto === 1 ? 'gostei' : 'naoGostei' })
        });
        if (!response.ok) {
            throw new Error('Erro ao registrar o voto');
        }
        // Atualiza a interface após o voto
        renderizarFilmes(); 
    } catch (error) {
        console.error("Não foi possível registrar o voto:", error);
        alert('Ocorreu um erro ao votar. Tente novamente.');
    }
}

// Função para o cadastro de novos itens
async function cadastrarItem(item) {
    try {
        const response = await fetch(`${API_URL}/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o item');
        }
        // Se o cadastro foi bem-sucedido, você pode redirecionar ou mostrar uma mensagem
        alert('Item cadastrado com sucesso!');
        // Por exemplo, recarregar a página ou a lista de filmes
        // renderizarFilmes(); 
    } catch (error) {
        console.error("Não foi possível cadastrar o item:", error);
        alert('Ocorreu um erro ao cadastrar. Tente novamente.');
    }
}

// Chama a função para renderizar os filmes quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarFilmes);