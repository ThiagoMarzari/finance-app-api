import { postgresClient } from '../../db/postgres/helper.ts'

interface updateUserProps {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export class UpdateUserRepository {
  async execute(userId: string, user: updateUserProps) {
    // Filtrar apenas os campos que foram fornecidos
    const fieldsToUpdate = Object.entries(user).filter(
      ([, value]) => value !== undefined,
    )

    // Mapear os nomes dos campos para os nomes das colunas no banco
    const fieldMapping: Record<string, string> = {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      password: 'password',
    }

    // Construir dinamicamente a parte SET da query
    const setClause = fieldsToUpdate
      .map(([field], index) => `${fieldMapping[field]} = $${index + 2}`)
      .join(', ')

    // Construir a query SQL dinâmica
    const query = `
      UPDATE users 
      SET ${setClause}
      WHERE id = $1 
      RETURNING id, first_name, last_name, email, created_at
    `

    // Preparar os parâmetros: userId primeiro, depois os valores dos campos
    const params = [userId, ...fieldsToUpdate.map(([, value]) => value)]

    const result = await postgresClient.query(query, params)
    return result[0]
  }
}
