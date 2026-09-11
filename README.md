# CadastroFlow — Cadastro de Clientes com CI/CD

[![CI/CD](https://github.com/JoaoEmanuel25/cadastroflow-cicd/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/JoaoEmanuel25/cadastroflow-cicd/actions/workflows/ci-cd.yml)

Projeto acadêmico em JavaScript com pipeline completo:

`GitHub → testes unitários → Docker → Azure Container Registry → Azure Container Apps`

**Site em produção:** <https://cadastroflow-app-joao.wittyglacier-d022ad0f.brazilsouth.azurecontainerapps.io/>

## Funcionalidades

- cadastrar, editar e excluir clientes;
- buscar por nome, e-mail ou cidade;
- validar nome, e-mail, telefone e duplicidade de e-mail;
- salvar dados no `localStorage` do navegador;
- executar oito testes unitários;
- empacotar o site com `nginx:alpine`;
- publicar e implantar automaticamente a cada push na `main`.

## Executar localmente

```bash
npm test
docker compose up -d --build
```

Acesse <http://localhost:8080>. Para encerrar, execute `docker compose down`.

## Configuração do pipeline

Os Secrets do GitHub necessários são:

- `AZURE_REGISTRY`;
- `AZURE_REGISTRY_USERNAME`;
- `AZURE_REGISTRY_PASSWORD`;
- `AZURE_CREDENTIALS`.

O ACR utilizado é `acrcadastroflowjoao.azurecr.io`, e o deploy atualiza o Container App `cadastroflow-app-joao` no grupo `rg-cadastroflow-joao`.

## Documentação

- [Manual técnico](docs/MANUAL.md)
- [Manual técnico em PDF](docs/Manual_Tecnico_Integracao_CICD.pdf)
- [Manual técnico editável em Word](docs/Manual_Tecnico_Integracao_CICD.docx)
