import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  resetMocks: true,
  setupFilesAfterEnv: ['jest-extended/all'],
};

export default config;
