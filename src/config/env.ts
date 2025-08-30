export const env = {
  // Configurações do PostgreSQL
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || '',
  PG_PORT: parseInt(process.env.PG_PORT || '5432'),
  PG_DB: process.env.PG_DB || 'finance_app',
  PG_HOST: process.env.PG_HOST || 'localhost',

  // Configurações da aplicação
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Validação das variáveis obrigatórias
  validate() {
    const required = ['PG_USER', 'PG_PASSWORD', 'PG_DB', 'PG_HOST']
    const missing = required.filter((key) => !process.env[key])

    if (missing.length > 0) {
      throw new Error(
        `Variáveis de ambiente obrigatórias não encontradas: ${missing.join(', ')}`,
      )
    }
  },
}

// Valida as variáveis obrigatórias ao importar o módulo
env.validate()
