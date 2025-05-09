const buttonturmas = document.getElementById("listar-turmas");
const listarturmas = document.getElementById("turmas-lista");

buttonturmas.addEventListener("click", async () => {
    const api = await fetch(API_URL_TURMAS);
    const dados = await api.json();
    console.log(dados);

    listarturmas.innerHTML = "<h2>Turmas</h2>" +
    dados.map((turma) => 
        `
        <div>
            <h3>Nome: ${turma.nome}</h3>
            <p>Idade: ${turma.idade}</p>
        </div>
        `
    ).join("");
})