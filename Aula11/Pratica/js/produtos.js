// Define a URL base da API de produtos.
// Usada para buscar (GET) e inserir (POST) produtos via requisições HTTP.
const API_URL = "http://leoproti.com.br:8004/alunos";

// Função assíncrona responsável por buscar os produtos da API e exibi-los na tabela HTML.
async function carregarAlunos() {
  // Realiza uma requisição HTTP GET para a URL da API.
  const resp = await fetch(API_URL);
  // Converte a resposta da API para um objeto JavaScript (array de produtos).
  const produtos = await resp.json();
  // Seleciona o elemento <tbody> da tabela onde os produtos serão exibidos.
  const tbody = document.getElementById("alunosBody");
  // Limpa o conteúdo anterior da tabela para evitar duplicidade.
  tbody.innerHTML = "";
  // Percorre cada produto retornado pela API.
  produtos.forEach((alunos) => {
    // Cria um novo elemento de linha da tabela (<tr>).
    const tr = document.createElement("tr");
    // Monta o conteúdo HTML da linha usando template strings.
    // Exibe o ID, o nome e o preço do produto.
    // Para o preço, verifica se não é nulo:
    // - Se não for nulo, usa toFixed(2) para exibir com duas casas decimais (ex: 10.00).
    // - Se for nulo, exibe uma string vazia (célula em branco).
    tr.innerHTML = `
      <td>${alunos.id}</td>
      <td>${alunos.nome}</td>
      <td>${alunos.turma}</td>
      <td>${alunos.curso}</td>
      <td>${alunos.matricula}</td>
      <td>
        <button onclick="editarAluno(${aluno.id})">Editar</button>
        <button onclick="excluirAluno(${aluno.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Adiciona um ouvinte de evento para o envio do formulário de cadastro de produto.
// Quando o formulário é enviado, executa a função assíncrona abaixo.
document
  .getElementById("alunosForm")
  .addEventListener("submit", async function (e) {
    // Previne o comportamento padrão do formulário (recarregar a página).
    e.preventDefault();
    // Obtém o valor do campo nome, removendo espaços extras.
    const nome = document.getElementById("nome").value.trim();
    const turma = document.getElementById("turma").value.trim();
    const curso = document.getElementById("curso").value.trim();
    const matricula = document.getElementById("matricula").value.trim();

    // Validação dos campos: nome não pode ser vazio e preço deve ser um número válido.
    if (!nome || !turma || !curso || !matricula) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Envia uma requisição HTTP POST para a API com os dados do novo produto.
      // Os dados são enviados no corpo da requisição em formato JSON.
      const resp = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, turma, curso, matricula }),
      });

      // Se a resposta não for bem-sucedida (status HTTP diferente de 2xx), lança um erro.
      if (!resp.ok) throw new Error("Erro ao editar aluno.");

      alert("Aluno atualizado com sucesso!");
      carregarAlunos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  });
try {
  // Se o produto foi inserido com sucesso:
  // - Exibe mensagem de sucesso ao usuário.
  // - Limpa os campos do formulário.
  // - Atualiza a tabela de produtos chamando carregarProdutos().
  alert("Aluno inserido com sucesso!");
  this.reset();
  carregarAlunos();
} catch (err) {
  // Em caso de erro na requisição, exibe mensagem detalhada ao usuário.
  alert("Erro ao salvar produto na API: " + err.message);
}

// Ao carregar o script, chama a função para exibir os produtos já cadastrados.
// Isso garante que a tabela esteja sempre atualizada ao abrir a página.
carregarAlunos();
