
const API_URL = 'http://localhost:5174'; 


async function cadastrarItem(item) {
    try {
        const response = await fetch(`{http://localhost:5174}/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao cadastrar o item.');
        }
        
       
        alert('Item cadastrado com sucesso!');
        return true;
    } catch (error) {
        console.error("Não foi possível cadastrar o item:", error);
        alert('Ocorreu um erro ao cadastrar o item. Tente novamente.');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroItemForm');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            
        
            const newItem = {
                titulo: document.getElementById('titulo').value,
                genero: document.getElementById('genero').value,
                imagem: document.getElementById('imagem').value,
                descricao: document.getElementById('descricao').value,
            };
            
            
            const sucesso = await cadastrarItem(newItem);
            
            
            if (sucesso) {
                form.reset();
            }
        });
    }
});