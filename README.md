# Finance App API

API para aplicação financeira com PostgreSQL.

## Configuração

### Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure as variáveis necessárias:

```bash
cp env.example .env
```

#### Variáveis Obrigatórias

- `PG_USER`: Usuário do PostgreSQL
- `PG_PASSWORD`: Senha do PostgreSQL
- `PG_DB`: Nome do banco de dados

#### Variáveis Opcionais

- `PG_PORT`: Porta do PostgreSQL (padrão: 5432)
- `PORT`: Porta da aplicação (padrão: 3000)
- `NODE_ENV`: Ambiente da aplicação (padrão: development)

### Exemplo de arquivo .env

```env
PG_USER=postgres
PG_PASSWORD=minhasenha123
PG_DB=finance_app
PG_PORT=5432
PORT=3000
NODE_ENV=development
```

## Instalação

```bash
npm install
```

## Execução

````bash
# Execução normal
npm start

# Desenvolvimento com watch (sem avisos)
npm run dev


## Desenvolvimento

```bash
npm run dev
````

## Linting

```bash
npm run lint
npm run lint:fix
```

## Solução de Problemas

### Avisos do Node.js

Se você ainda ver avisos experimentais ou de deprecação, use:

```bash
npm run dev:clean
```

Este comando usa `NODE_OPTIONS` para suprimir todos os avisos desnecessários.
