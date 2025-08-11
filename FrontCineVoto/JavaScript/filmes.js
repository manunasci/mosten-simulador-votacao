
const API_URL = 'http://localhost:5174'; 



async function buscarFilmesDaAPI() {
    try {
        const response = await fetch(`{http://localhost:5174}/filmes`);
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes da API');
        }
        const filmes = await response.json();
        return filmes;
    } catch (error) {
        console.error("Não foi possível carregar os filmes:", error);
        return []; 
    }
}


async function renderizarFilmes() {
    const filmes = await buscarFilmesDaAPI();
    const container = document.getElementById('filmes-container');
    container.innerHTML = ''; 

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
      
        renderizarFilmes(); 
    } catch (error) {
        console.error("Não foi possível registrar o voto:", error);
        alert('Ocorreu um erro ao votar. Tente novamente.');
    }
}


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
        
        alert('Item cadastrado com sucesso!');
        
    } catch (error) {
        console.error("Não foi possível cadastrar o item:", error);
        alert('Ocorreu um erro ao cadastrar. Tente novamente.');
    }
}


document.addEventListener('DOMContentLoaded', renderizarFilmes);