import { defineConfig, configDefaults } from 'vitest/config';

// https://vitest.dev/config
export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
    exclude: [...configDefaults.exclude, '**/*.config.{js,ts}', '**/.{eslint,prettier}rc.{js,ts}'],
    coverage: {
      enabled: true,
      all: true,
      reporter: ['text', 'json', 'html'],
      reportOnFailure: true,
      // lib/index.ts is excluded only to showcase the exclude feature, ideally it should also be covered
      exclude: [...(configDefaults.coverage.exclude || []), 'lib/index.ts'],
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
});
