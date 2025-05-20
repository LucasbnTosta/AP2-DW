const API_URL = "https://school-system-spi.onrender.com/api/professores";

document.getElementById("professor-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        nome: form.nome.value,
        materia: form.materia.value,
        observacao: form.observacao.value,
        idade: parseInt(form.idade.value),
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Professor cadastrado!");
    console.log(result);
    form.reset();
});

// Função de Listar Professores
document.getElementById("listar-professor").addEventListener("click", async () => {
    const res = await fetch(API_URL);
    const professores = await res.json();

    const container = document.getElementById("professor-lista");
    container.innerHTML =
        "<h2>Lista de Professores</h2>" +
        professores
            .map(
                (p) => `
        <div>
            <strong>${p.nome}</strong> (ID: ${p.id})<br>
            Matéria: ${p.materia} | Idade: ${p.idade}<br>
            Observação: ${p.observacao}<br>
            <button onclick="editarProfessor(${p.id})">Editar</button>
            <button onclick="excluirProfessor(${p.id})">Excluir</button>
            <hr>
        </div>
    `
            )
            .join("");
});

// Função de Editar Professor
async function editarProfessor(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const professor = await res.json();

    // Preenchendo o formulário de edição
    const form = document.getElementById("update-form");
    form.nome.value = professor.nome;
    form.materia.value = professor.materia;
    form.observacao.value = professor.observacao;
    form.idade.value = professor.idade;

    // Exibindo o pop-up para edição
    document.getElementById("edit-popup").style.display = "block";

    // Salvando o ID do professor para atualização
    form.dataset.id = id;
}

// Função de Atualizar Professor
document.getElementById("update-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const professorId = form.dataset.id;
    const data = {
        nome: form.nome.value,
        materia: form.materia.value,
        observacao: form.observacao.value,
        idade: parseInt(form.idade.value),
    };

    const response = await fetch(`${API_URL}/${professorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Professor atualizado com sucesso!");
    console.log(result);
    form.reset();

    // Fechar o pop-up após a atualização
    document.getElementById("edit-popup").style.display = "none";

    // Atualizar a lista de professores
    document.getElementById("listar-professor").click();
});

// Função de Excluir Professor
async function excluirProfessor(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    const result = await response.json();
    alert("Professor excluído com sucesso!");
    console.log(result);

    // Atualizar a lista de professores
    document.getElementById("listar-professor").click();
}

// Função para fechar o pop-up de edição
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("edit-popup").style.display = "none";
});