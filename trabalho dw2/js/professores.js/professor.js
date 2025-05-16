const API_URL = "https://school-system-spi.onrender.com/api/professores";

document.getElementById("professor-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
        nome: form.nome.value,
        materia: form.materia.value,
        idade: form.idade.value,
        observacao: form.observacao.value,
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Professor cadastrado com sucesso!");
    console.log(result);
    form.reset();
});

document.getElementById("professor-lista").addEventListener("click", async (event) => {
    const res = await fetch(API_URL);
    const professor = await res.json();

    const container = document.getElementById("professor-lista");
    container.innerHTML = "";
    "<h2>Lista de Professores</h2>" + 
    professor
        .map(
            (a) =>`
        <div>
            <strong>${a.nome}</strong> (ID: ${a._id})<br>
            Matéria: ${a.materia}<br>
            Idade: ${a.idade}<br>
            Observação: ${a.observacao}<br>
            <button onclick="deleteProfessor('${a._id}')">Excluir</button>
            <button onclick="updateProfessor('${a._id}')">Atualizar</button>
            <hr>
        </div>
        `
        )
        .join("");
    });
    async function editarProfessor(id) {
        const res = await fetch(`${API_URL}/${id}`);
        const professor = await res.json();

        console.log(professor.professor);

        document.getElementById("professor-form").nome.value = professor.nome;
        document.getElementById("professor-form").materia.value = professor.materia;
        document.getElementById("professor-form").idade.value = professor.idade;
        document.getElementById("professor-form").observacao.value = professor.observacao;

        document.getElementById("edit-popup").style.display = "block";
    }

    document.getElementById("update-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const professorId = document.getElementById("professor-id").value;
        const data = {
            nome: form.nome.value,
            materia: form.materia.value,
            idade: form.idade.value,
            observacao: form.observacao.value,
            };
            console.log(data);

            const response= await fetch(`${API_URL}/${professorId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert("Professor atualizado com sucesso!");
        console.log(result);
        form.reset();

        document.getElementById("edit-popup").style.display = "none";
        });
        async function deleteProfessor(id) {
            const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();
        alert("Professor excluído com sucesso!");
        console.log(result);

        document.getElementById("professor-lista").click();
        }

        document.getElementById("close-popup").addEventListener("click", () => {
            document.getElementById("edit-popup").style.display = "none";
        });
