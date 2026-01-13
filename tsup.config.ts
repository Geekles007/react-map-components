import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  minify: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";', // For Next.js App Router compatibility
    }
  },
})
