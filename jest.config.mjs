/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'ES2022',
        moduleResolution: 'node'
      }
    }]
  },
  moduleNameMapper: {
    '^(\\.\\.?\\/.*)\\.(js|ts)$': '$1'
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
}

export default config
