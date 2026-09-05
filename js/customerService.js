export function validarCliente(cliente, clientes = []) {
  const erros = [];
  const nome = cliente.nome?.trim() ?? '';
  const email = cliente.email?.trim().toLowerCase() ?? '';
  const telefone = cliente.telefone?.replace(/\D/g, '') ?? '';

  if (nome.length < 3) erros.push('O nome deve ter pelo menos 3 caracteres.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.push('Informe um e-mail válido.');
  if (telefone.length < 10 || telefone.length > 11) erros.push('Informe um telefone com 10 ou 11 números.');

  const emailDuplicado = clientes.some(
    (item) => item.email.toLowerCase() === email && item.id !== cliente.id,
  );
  if (emailDuplicado) erros.push('Já existe um cliente com este e-mail.');

  return erros;
}

export function criarCliente(dados, id = crypto.randomUUID()) {
  return {
    id,
    nome: dados.nome.trim(),
    email: dados.email.trim().toLowerCase(),
    telefone: dados.telefone.trim(),
    cidade: dados.cidade?.trim() || 'Não informada',
    criadoEm: new Date().toISOString(),
  };
}

export function filtrarClientes(clientes, termo) {
  const busca = termo.trim().toLowerCase();
  if (!busca) return clientes;
  return clientes.filter(({ nome, email, cidade }) =>
    [nome, email, cidade].some((valor) => valor.toLowerCase().includes(busca)),
  );
}

export function salvarNoStorage(storage, clientes) {
  storage.setItem('cadastroflow_clientes', JSON.stringify(clientes));
}

export function carregarDoStorage(storage) {
  try {
    const dados = JSON.parse(storage.getItem('cadastroflow_clientes') || '[]');
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}
