const buttonProfessores = document.getElementById("listar-professores");
const listarProfessores = document.getElementById("professores-lista");

buttonProfessores.addEventListener("click", async () => {
    const api = await fetch(API_URL_PROFESSOR);
    const dados = await api.json();
    console.log(dados);

    listarProfessores.innerHTML = "<h2>Professores</h2>" +
    dados.map((professor) => 
        `
        <div>
            <h3>Nome: ${professor.nome}</h3>
            <p>Idade: ${professor.idade}</p>
        </div>
        `
    ).join("");
})
