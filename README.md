# CadastroFlow — Cadastro de Clientes com CI/CD

[![CI/CD](https://github.com/JoaoEmanuel25/cadastroflow-cicd/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/JoaoEmanuel25/cadastroflow-cicd/actions/workflows/ci-cd.yml)

Projeto acadêmico em JavaScript que demonstra o fluxo completo:

`GitHub → testes unitários → GitHub Actions → Docker Hub → Render`

## Funcionalidades

- cadastrar, editar e excluir clientes;
- buscar por nome, e-mail ou cidade;
- validar nome, e-mail, telefone e duplicidade de e-mail;
- salvar dados no `localStorage` do navegador;
- executar oito testes unitários sem dependências externas;
- empacotar o site com `nginx:alpine`;
- publicar a imagem e acionar o deploy automaticamente a cada push na `main`.

## Abrir no VS Code

1. No terminal, execute `git clone https://github.com/JoaoEmanuel25/cadastroflow-cicd.git`.
2. Abra a pasta `cadastroflow-cicd` no VS Code.
3. Abra um terminal na pasta.

## Executar os testes

É necessário ter Node.js 22 ou superior:

```bash
npm test
```

## Executar com Docker

```bash
docker compose up -d --build
```

Acesse: <http://localhost:8080>

Para encerrar:

```bash
docker compose down
```

## Configurar o pipeline

Crie um repositório no GitHub, envie estes arquivos e adicione em **Settings → Secrets and variables → Actions**:

- `DOCKERHUB_USERNAME`: nome do usuário do Docker Hub;
- `DOCKERHUB_TOKEN`: token de acesso criado no Docker Hub;
- `RENDER_DEPLOY_HOOK_URL`: URL secreta do Deploy Hook criada no serviço do Render.

No Render, crie um **Web Service** baseado na imagem Docker Hub `SEU_USUARIO/cadastro-clientes:latest`, configure a porta `80`, conecte a credencial do Docker Hub se a imagem for privada e crie um Deploy Hook.

O deploy real somente funcionará depois que as três credenciais forem configuradas pelo proprietário das contas.

## Documentação

- [Manual técnico em PDF](docs/Manual_Tecnico_Integracao_CICD.pdf)
- [Manual técnico editável em Word](docs/Manual_Tecnico_Integracao_CICD.docx)
