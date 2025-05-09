async function getTurmas() {
    try {
        const API_URL_TURMAS = "https://school-system-spi.onrender.com/api/turmas";
        const response = await API_URL_TURMAS.json(); 
        return response; 
    } catch (error) { 
        alert("Erro ao buscar turmas: " + error);
        console.log('erro ao buscar a turma')
    }
}