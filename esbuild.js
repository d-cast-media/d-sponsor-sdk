import { build } from 'esbuild';

build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/index.js',
    minify: true,
    sourcemap: true,
    target: 'esnext',
    format: 'esm',
    plugins: [],
}).catch(() => process.exit(1));

