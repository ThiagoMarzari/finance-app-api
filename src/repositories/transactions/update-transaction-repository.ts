import { postgresClient } from '../../db/postgres/helper.ts'

enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

interface UpdateTransactionProps {
  name?: string
  date?: string
  amount?: number
  type?: TransactionType
}

export class UpdateTransactionRepository {
  async execute(transactionId: string, transaction: UpdateTransactionProps) {
    // Filtrar apenas os campos que foram fornecidos
    const fieldsToUpdate = Object.entries(transaction).filter(
      ([, value]) => value !== undefined,
    )

    // Mapear os nomes dos campos para os nomes das colunas no banco
    const fieldMapping: Record<string, string> = {
      name: 'name',
      date: 'date',
      amount: 'amount',
      type: 'type',
    }

    // Construir dinamicamente a parte SET da query
    const setClause = fieldsToUpdate
      .map(([field], index) => `${fieldMapping[field]} = $${index + 2}`)
      .join(', ')

    // Construir a query SQL dinâmica
    const query = `
      UPDATE transactions 
      SET ${setClause}
      WHERE id = $1 
      RETURNING id, user_id, name, date, amount, type
    `

    // Preparar os parâmetros: transactionId primeiro, depois os valores dos campos
    const params = [transactionId, ...fieldsToUpdate.map(([, value]) => value)]

    const result = await postgresClient.query(query, params)
    return result[0]
  }
}
