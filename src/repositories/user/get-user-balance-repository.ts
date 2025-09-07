import { postgresClient } from '../../db/postgres/helper.ts'

export class GetUserBalanceRepository {
  async execute(userId: string) {
    const query = `
      SELECT
        SUM(CASE WHEN type = 'EARNING'   THEN amount ELSE 0 END) AS earnings,
        SUM(CASE WHEN type = 'EXPENSE'   THEN amount ELSE 0 END) AS expenses,
        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investments,
        
        -- saldo = ganhos - despesas - investimentos
        SUM(CASE WHEN type = 'EARNING'   THEN amount ELSE 0 END)
      - SUM(CASE WHEN type = 'EXPENSE'   THEN amount ELSE 0 END)
      - SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) 
        AS balance
      FROM transactions
      WHERE user_id = $1;
    `
    const result = await postgresClient.query(query, [userId])
    return {
      userId,
      ...result[0],
    }
  }
}
