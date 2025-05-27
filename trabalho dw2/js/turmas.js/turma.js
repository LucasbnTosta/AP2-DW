const API_URL_TURMA = "https://school-system-spi.onrender.com/api/turmas";

// Cadastro de Turma
document.getElementById("turma-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    nome: form.nome.value,
    materia: form.materia.value,
    descricao: form.descricao.value,
    ativo: form.ativo.value === "true",
    professor_id: parseInt(form.professor_id.value),
  };

  const response = await fetch(API_URL_TURMA, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert("Turma cadastrada!");
  console.log(result);
  form.reset();
});

// Listar Turmas
document.getElementById("listar-turmas").addEventListener("click", async () => {
  const res = await fetch(API_URL_TURMA);
  const turmas = await res.json();

  const container = document.getElementById("turmas-lista");
  container.innerHTML =
    "<h2>Lista de Turmas</h2>" +
    turmas
      .map(
        (t) => `
      <div>
        <strong>${t.nome}</strong> (ID: ${t.id})<br>
        Matéria: ${t.materia}<br>
        Descrição: ${t.descricao}<br>
        Ativo: ${t.ativo ? "Sim" : "Não"}<br>
        Professor ID: ${t.professor_id}<br>
        <button onclick="editarTurma(${t.id})">Editar</button>
        <button onclick="excluirTurma(${t.id})">Excluir</button>
        <hr>
      </div>
    `
      )
      .join("");
});

// Editar Turma
async function editarTurma(id) {
  const res = await fetch(`${API_URL_TURMA}/${id}`);
  const turma = await res.json();

  document.getElementById("turma-id").value = turma.turma.id;
  document.getElementById("update-nome").value = turma.turma.nome;
  document.getElementById("update-materia").value = turma.turma.materia;
  document.getElementById("update-descricao").value = turma.turma.descricao;
  document.getElementById("update-ativo").value = turma.turma.ativo ? "true" : "false";
  document.getElementById("update-professor_id").value = turma.turma.professor_id;

  document.getElementById("edit-turma-popup").style.display = "block";
}

// Atualizar Turma
document.getElementById("update-turma-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const turmaId = document.getElementById("turma-id").value;

  const data = {
    nome: form["update-nome"].value,
    materia: form["update-materia"].value,
    descricao: form["update-descricao"].value,
    ativo: form["update-ativo"].value === "true",
    professor_id: parseInt(form["update-professor_id"].value),
  };

  const response = await fetch(`${API_URL_TURMA}/${turmaId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  alert("Turma atualizada com sucesso!");
  console.log(result);
  form.reset();
  document.getElementById("edit-turma-popup").style.display = "none";
  document.getElementById("listar-turmas").click();
});

// Excluir Turma
async function excluirTurma(id) {
  const response = await fetch(`${API_URL_TURMA}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  alert("Turma excluída com sucesso!");
  console.log(result);
  document.getElementById("listar-turmas").click();
}

// Fechar Pop-up de Edição
document.getElementById("close-turma-popup").addEventListener("click", () => {
  document.getElementById("edit-turma-popup").style.display = "none";
});

