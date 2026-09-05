import test from 'node:test';
import assert from 'node:assert/strict';
import { carregarDoStorage, criarCliente, filtrarClientes, salvarNoStorage, validarCliente } from '../js/customerService.js';

const valido = { nome: 'Maria Oliveira', email: 'maria@email.com', telefone: '(42) 99999-9999', cidade: 'Porto União' };

test('aceita um cliente com dados válidos', () => {
  assert.deepEqual(validarCliente(valido), []);
});

test('rejeita nome muito curto, e-mail e telefone inválidos', () => {
  const erros = validarCliente({ nome: 'Jo', email: 'invalido', telefone: '123' });
  assert.equal(erros.length, 3);
});

test('impede cadastro com e-mail duplicado', () => {
  const erros = validarCliente(valido, [{ ...valido, id: '1' }]);
  assert.ok(erros.includes('Já existe um cliente com este e-mail.'));
});

test('permite manter o próprio e-mail durante a edição', () => {
  const dados = { ...valido, id: '1' };
  assert.deepEqual(validarCliente(dados, [{ ...valido, id: '1' }]), []);
});

test('normaliza os dados ao criar um cliente', () => {
  const cliente = criarCliente({ ...valido, nome: '  Maria Oliveira  ', email: 'MARIA@EMAIL.COM' }, 'abc');
  assert.equal(cliente.id, 'abc');
  assert.equal(cliente.nome, 'Maria Oliveira');
  assert.equal(cliente.email, 'maria@email.com');
});

test('filtra clientes por nome, e-mail ou cidade', () => {
  const clientes = [criarCliente(valido, '1'), criarCliente({ ...valido, nome: 'Carlos Lima', email: 'carlos@email.com', cidade: 'Curitiba' }, '2')];
  assert.deepEqual(filtrarClientes(clientes, 'curitiba').map((item) => item.id), ['2']);
});

test('salva e carrega clientes do armazenamento', () => {
  const memoria = new Map();
  const storage = { setItem: (chave, valor) => memoria.set(chave, valor), getItem: (chave) => memoria.get(chave) };
  salvarNoStorage(storage, [valido]);
  assert.deepEqual(carregarDoStorage(storage), [valido]);
});

test('retorna lista vazia quando o armazenamento está corrompido', () => {
  const storage = { getItem: () => '{erro' };
  assert.deepEqual(carregarDoStorage(storage), []);
});
