enum TransactionType {
  EARNING = 'EARNING',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

export const checkIfTransactionTypeIsValid = (type: string) => {
  const typeUpperCase = type.toUpperCase() as TransactionType
  if (!Object.values(TransactionType).includes(typeUpperCase)) {
    return false
  }
  return true
}
