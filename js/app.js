import { carregarDoStorage, criarCliente, filtrarClientes, salvarNoStorage, validarCliente } from './customerService.js';

const $ = (seletor) => document.querySelector(seletor);
const form = $('#cliente-form');
const lista = $('#lista-clientes');
const vazio = $('#empty-state');
const mensagem = $('#form-message');
let clientes = carregarDoStorage(localStorage);

function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function iniciais(nome) {
  return nome.split(' ').slice(0, 2).map((parte) => parte[0]).join('').toUpperCase();
}

function renderizar(termo = '') {
  const filtrados = filtrarClientes(clientes, termo);
  $('#total-clientes').textContent = clientes.length;
  vazio.style.display = filtrados.length ? 'none' : 'block';
  lista.innerHTML = filtrados.map((cliente) => `
    <div class="customer">
      <div class="avatar">${iniciais(cliente.nome)}</div>
      <div><h3>${escapar(cliente.nome)}</h3><p>${escapar(cliente.email)} · ${escapar(cliente.telefone)} · ${escapar(cliente.cidade)}</p></div>
      <div class="customer-actions">
        <button class="icon-button" data-action="edit" data-id="${cliente.id}">Editar</button>
        <button class="icon-button delete" data-action="delete" data-id="${cliente.id}">Excluir</button>
      </div>
    </div>`).join('');
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `message ${tipo}`;
}

function limparFormulario() {
  form.reset();
  $('#cliente-id').value = '';
  $('#form-kicker').textContent = 'NOVO REGISTRO';
  $('#form-title').textContent = 'Cadastrar cliente';
  $('#submit-button').textContent = 'Cadastrar cliente';
  $('#cancel-button').classList.add('hidden');
  mensagem.className = 'message';
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  const id = $('#cliente-id').value;
  if (id) dados.id = id;
  const erros = validarCliente(dados, clientes);
  if (erros.length) return mostrarMensagem(erros.join(' '), 'error');

  if (id) {
    const anterior = clientes.find((item) => item.id === id);
    clientes = clientes.map((item) => item.id === id ? { ...criarCliente(dados, id), criadoEm: anterior.criadoEm } : item);
  } else {
    clientes.unshift(criarCliente(dados));
  }
  salvarNoStorage(localStorage, clientes);
  limparFormulario();
  renderizar($('#busca').value);
  mostrarMensagem(id ? 'Cliente atualizado com sucesso.' : 'Cliente cadastrado com sucesso.', 'success');
});

lista.addEventListener('click', (evento) => {
  const botao = evento.target.closest('button[data-id]');
  if (!botao) return;
  const cliente = clientes.find((item) => item.id === botao.dataset.id);
  if (botao.dataset.action === 'delete') {
    if (!confirm(`Excluir o cadastro de ${cliente.nome}?`)) return;
    clientes = clientes.filter((item) => item.id !== cliente.id);
    salvarNoStorage(localStorage, clientes);
    renderizar($('#busca').value);
    return;
  }
  ['nome', 'email', 'telefone', 'cidade'].forEach((campo) => $(`#${campo}`).value = cliente[campo] === 'Não informada' ? '' : cliente[campo]);
  $('#cliente-id').value = cliente.id;
  $('#form-kicker').textContent = 'EDIÇÃO';
  $('#form-title').textContent = 'Editar cliente';
  $('#submit-button').textContent = 'Salvar alterações';
  $('#cancel-button').classList.remove('hidden');
  window.scrollTo({ top: 250, behavior: 'smooth' });
});

$('#busca').addEventListener('input', (evento) => renderizar(evento.target.value));
$('#cancel-button').addEventListener('click', limparFormulario);
$('#telefone').addEventListener('input', (evento) => {
  let valor = evento.target.value.replace(/\D/g, '').slice(0, 11);
  valor = valor.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');
  evento.target.value = valor;
});
renderizar();
