const apiProfessor = {

    async  getProfessor() {
        try {
            const API_URL_PROFESSOR = "https://school-system-spi.onrender.com/api/professores";
            const response = await API_URL_PROFESSOR.json(); 
            return response; 
        } catch (error) { 
            alert("Erro ao buscar professores: " + error);
            console.log('erro ao buscar o professor')
        }
},
    async put() {
        try {
            const API_URL_TURMAS = "https://school-system-spi.onrender.com/api/turmas";
            const response = await API_URL_TURMAS.json(); 
            return response; 
        } catch (error) { 
            alert("Erro ao buscar turmas: " + error);
            console.log('erro ao buscar a turma')
        }
    }

}
