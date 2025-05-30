const API_URL = "https://school-system-spi.onrender.com/api/professores";

// Cadastro de Professor
document
.getElementById("professor-form")
.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        nome: form.nome.value,
        materia: form.materia.value,
        observacoes: form.observacoes.value,
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

    console.log("Professores recebidos:", professores); // Debug

    const container = document.getElementById("professor-lista");
    container.innerHTML =
        "<h2>Lista de Professores</h2>" +
        professores
            .map((p) => {
                return `
                    <div>
                        <strong>${p.nome}</strong> (ID: ${p.id})<br>
                        Matéria: ${p.materia} | Idade: ${p.idade}<br>
                        Observações: ${p.observacoes}<br>
                        <button onclick="editarProfessor(${p.id})">Editar</button>
                        <button onclick="excluirProfessor(${p.id})">Excluir</button>
                        <hr>
                    </div>
                `;
            })
            .join("");
});

// Função de Editar Professor
async function editarProfessor(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const professor = await res.json();

    console.log("Dados do professor recebidos:", professor); // Debug

    const form = document.getElementById("update-form");

    // Usando fallback para observações com ou sem acento
    form.nome.value = professor.nome || "";
    form.materia.value = professor.materia || "";
    form.observacoes.value = professor.observacoes || professor["observações"] || "";
    form.idade.value = professor.idade || "";

    document.getElementById("edit-popup").style.display = "block";
    form.dataset.id = id;
}

// Atualizar Professor
document.getElementById("update-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const professorId = form.dataset.id;

    const data = {
        nome: form.nome.value,
        materia: form.materia.value,
        observacoes: form.observacoes.value,
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
    document.getElementById("edit-popup").style.display = "none";
    document.getElementById("listar-professor").click();
});

// Excluir Professor
async function excluirProfessor(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    const result = await response.json();
    alert("Professor excluído com sucesso!");
    console.log(result);
    document.getElementById("listar-professor").click();
}

// Fechar o pop-up de edição
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("edit-popup").style.display = "none";
});
