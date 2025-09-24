export class UuidGeneratorAdapter {
  execute() {
    return crypto.randomUUID()
  }
}
