
const API_URL = 'http://localhost:5174'; 


async function buscarVotosTotais() {
    try {
        const response = await fetch(`${API_URL}/votos-gerais`); 
        if (!response.ok) {
            throw new Error('Erro ao buscar os votos gerais da API');
        }
        const totais = await response.json();
        return totais;
    } catch (error) {
        console.error("Não foi possível carregar os votos totais:", error);
        return { totalGostei: 0, totalNaoGostei: 0 };
    }
}


async function renderizarVotosTotais() {
    const totais = await buscarVotosTotais();
    const container = document.getElementById('votos-totais-container');

    if (container) {
        container.innerHTML = `
            <h2>Votos Totais</h2>
            <div class="totais-card">
                <p>Gostei: <span>${totais.totalGostei}</span></p>
                <p>Não Gostei: <span>${totais.totalNaoGostei}</span></p>
            </div>
        `;
    }
}


document.addEventListener('DOMContentLoaded', renderizarVotosTotais);


document.addEventListener('DOMContentLoaded', () => {
    const menuHambuguer = document.querySelector('.menu-hamburguer');
    const navLinks = document.querySelector('.nav-links');

    if (menuHambuguer && navLinks) {
        menuHambuguer.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});