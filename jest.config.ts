import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  resetMocks: true,
  setupFilesAfterEnv: ['jest-extended/all'],
};

export default config;
