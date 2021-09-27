function efetuarLogin() {
  const usuario = document.createElement('p');
  const container = document.createElement('div');
  container.appendChild(usuario);
  container.id = 'logado';
  const login = document.querySelector('.input-login').value;
  usuario.innerText = `Ola, ${login.split('@')[0]}!`;
  document.getElementById('trybewarts-login').remove();
  document.getElementsByTagName('header')[0].appendChild(container);
}

function checarLogin() {
  const login = document.querySelector('.input-login').value;
  const password = document.querySelector('.input-password').value;
  if (login === 'tryber@teste.com' && password === '123456') {
    alert('Bem vindo!');
    efetuarLogin();
  } else {
    alert('Email ou senha inválidos.');
  }
}

document.querySelector('.entrar').addEventListener('click', checarLogin);

const botaoEnviar = document.getElementById('submit-btn');

function habilitarBotaoEnviar(event) {
  const checkbox = event.target;
  if (checkbox.checked) {
    botaoEnviar.disabled = false;
    botaoEnviar.classList.remove('btnSelected');
  } else {
    botaoEnviar.disabled = true;
    botaoEnviar.classList.add('btnSelected');
  }
}

document.querySelector('#agreement').addEventListener('click', habilitarBotaoEnviar);

const comentario = document.getElementById('textarea');

function contadorDeCaracteres() {
  const contador = document.getElementById('counter');
  contador.innerText = 500 - comentario.value.length;
}

comentario.addEventListener('input', contadorDeCaracteres);

const nome = document.getElementById('nome-completo');
const email = document.getElementById('email');
const casa = document.getElementById('casa');
const familia = document.getElementById('familia');
const materias = document.getElementById('materias');
const avaliacao = document.getElementById('avaliacao');
const observacoes = document.getElementById('observacoes');
const firstName = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');

function valoresDeRadioECheckbox(elementoArray) {
  let resultado = '';
  for (let index = 0; index < elementoArray.length; index += 1) {
    if (elementoArray[index].checked) {
      resultado += ` ${elementoArray[index].value},`;
    }
  }
  resultado = resultado.substr(0, resultado.length - 1);
  return resultado;
}

function exibirResultadosDoFormulario(event) {
  event.preventDefault();
  nome.innerText = `Nome: ${firstName.value} ${lastName.value}`;
  email.innerText = `Email: ${document.getElementById('input-email').value}`;
  casa.innerText = `Casa: ${document.getElementById('house').value}`;
  familia.innerText = `Família: ${valoresDeRadioECheckbox(document.getElementsByName('family'))}`;
  const conteudos = document.querySelectorAll('.subject');
  materias.innerText = `Matérias: ${valoresDeRadioECheckbox(conteudos)}`;
  avaliacao.innerText = `Avaliação: ${valoresDeRadioECheckbox(document.getElementsByName('rate'))}`;
  observacoes.innerText = `Observações: ${document.getElementById('textarea').value}`;
}

botaoEnviar.addEventListener('click', exibirResultadosDoFormulario);
