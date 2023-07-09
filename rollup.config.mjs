// rollup.config.js
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/cardGame.js',
    format: 'commonjs',
    name: 'CardGame',
    indent: true,
  },
  plugins: [typescript()],
  external: ['figlet', 'colorette', 'enquirer'],
}
