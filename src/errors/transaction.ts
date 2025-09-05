export class TransactionNotFound extends Error {
  constructor(id?: string) {
    super(`Transaction ${id} not found`)
    this.name = 'TransactionNotFound'
  }
}
