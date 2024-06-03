// Seleciona o corpo do documento HTML
const body = document.querySelector("body");
// Seleciona o formulário com o id "form"
const form = document.getElementById("form");
// Seleciona o elemento com o id "imc"
const imcResp = document.querySelector("#imc");
// Seleciona o botão com o id "resetBtn"
const resetBtn = document.querySelector("#resetBtn");

// Função para calcular o IMC
function calcularImc(peso, altura) {
  // Verifica se os valores de peso e altura são válidos
  if (isNaN(peso) || isNaN(altura) || peso < 0 || altura < 0) {
    // Alerta o usuário sobre valores inválidos
    alert("Por favor, insira dados válidos");
    // Limpa os campos de peso e altura
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    // Coloca o foco de volta no formulário
    form.focus();
    // Retorna NaN se os valores não forem válidos
    return NaN;
  }
  // Converte a altura para metros
  const alturaMetros = altura / 100;
  // Calcula o IMC
  const imc = peso / (alturaMetros * alturaMetros);
  return imc;
}

// Função para verificar a categoria do IMC
function verificarCategoria(imc) {
  // Cria um elemento <span> para exibir a categoria
  const categoria = document.createElement("span");

  // Verifica o IMC e define a categoria correspondente
  if (imc < 18.5) {
    categoria.innerHTML = "<br/>Você está abaixo do peso!";
  } else if (imc < 24.9) {
    categoria.innerHTML = "<br/>Parabéns! Você está no peso ideal!";
  } else if (imc < 29.9) {
    categoria.innerHTML = "<br/>Cuidado, você está acima do peso!";
  } else if (imc < 34.9) {
    categoria.innerHTML = "<br/>Muito cuidado, você está com obesidade grau 1!";
  } else if (imc < 40) {
    categoria.innerHTML = "<br/>Muito cuidado, você está com obesidade grau 2!";
  } else {
    categoria.innerHTML = "<br/>Muito cuidado, você está com obesidade grau 3!";
  }
  return categoria;
}

// Função para mostrar a resposta do IMC
function mostrarResposta(resposta) {
  // Cria um elemento <h3> para exibir os dados
  const elementoResposta = document.createElement("h3");
  // Insere os dados no elemento
  elementoResposta.innerHTML = `Nome: ${resposta.nome} </br>Idade: ${resposta.idade}</br>IMC: ${resposta.imc}</br> ${resposta.categoria}`;
  // Adiciona uma classe ao elemento
  elementoResposta.className = "resp";

  // Cria um botão de deletar
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Deletar";
  deleteBtn.className = "deleteBtn";
  // Adiciona um evento de clique para deletar a resposta
  deleteBtn.addEventListener("click", () => {
    let imcDataArray = JSON.parse(localStorage.getItem("imcDataArray")) || [];
    imcDataArray.pop();
    localStorage.setItem("imcDataArray", JSON.stringify(imcDataArray));
    elementoResposta.remove();
  });
  // Adiciona o botão de deletar à resposta
  elementoResposta.appendChild(deleteBtn);
  // Adiciona a resposta à seção de respostas do IMC
  imcResp.appendChild(elementoResposta);
}

// Evento de clique no formulário para calcular o IMC
form.addEventListener("click", (ev) => {
  // Previne o comportamento padrão do formulário
  ev.preventDefault();

  // Obtém os valores do formulário
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);

  // Calcula o IMC
  const imc = calcularImc(peso, altura);

  // Verifica se o IMC é válido
  if (isNaN(imc)) {
    return;
  }

  // Cria um objeto resposta com os dados
  const resposta = {
    nome,
    idade,
    imc: imc.toFixed(2),
    categoria: verificarCategoria(imc).innerHTML,
  };

  // Obtém os dados salvos anteriormente ou inicializa um novo array
  let imcDataArray = JSON.parse(localStorage.getItem("imcDataArray")) || [];
  // Adiciona a nova resposta ao array
  imcDataArray.push(resposta);
  // Salva o array no armazenamento local
  localStorage.setItem("imcDataArray", JSON.stringify(imcDataArray));

  // Mostra a resposta na página
  mostrarResposta(resposta);

  // Limpa os campos do formulário
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
});

// Evento de clique no botão de resetar
resetBtn.addEventListener("click", () => {
  // Limpa a seção de respostas do IMC
  imcResp.innerHTML = "";
  // Remove os dados salvos do armazenamento local
  localStorage.removeItem("imcDataArray");
});

// Evento de carregamento da página
window.addEventListener("load", () => {
  // Obtém os dados salvos no armazenamento local ou inicializa um novo array
  const dadosSalvos = JSON.parse(localStorage.getItem("imcDataArray")) || [];
  // Para cada resposta salva, mostra na página
  dadosSalvos.forEach(mostrarResposta);
  // Se houver dados salvos, mostra a última resposta
  if (dadosSalvos) {
    const resposta = JSON.parse(dadosSalvos);
    mostrarResposta(resposta);
  }
});
