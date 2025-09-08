import { postgresClient } from '../../db/postgres/helper.ts'

export class GetUserBalanceRepository {
  async execute(userId: string) {
    const query = `
      SELECT * FROM get_user_balance($1)
    `
    const result = await postgresClient.query(query, [userId])
    return {
      userId,
      ...result[0],
    }
  }
}
