import { Environment } from 'vitest';

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Executou');
    return {
      async teardown() {},
    };
  },
  transformMode: 'ssr',
};
