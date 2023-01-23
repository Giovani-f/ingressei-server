## Ingressei Server

BackEnd voltado ao gerenciamento de eventos, tendo como prinicpais features Criar, buscas e comprar ingresso de eventos para Empresas e Universidades.

## Get started

O projeto possui nvm como gerenciador de pacontes, pode-se encontrar a versão do node no arquivo **.nvmrc**.

1 - Instale as dependências do projeto:

```bash
npm install
```

ou

```bash
yarn install
```

2 - Executar o docker com banco de dados

```bash
sudo docker compose up -d
```
ou 

```bash
sudo docker-compose up -d
```

3 - Executando as migrations

```bash
npm run migrate:dev
```

4 - Executando o servidor

```bash
npm run dev
```