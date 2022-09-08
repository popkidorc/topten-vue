import { mergeConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import requireTransform from 'vite-plugin-require-transform';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      host: 'www.topten.com',
      port: 80,
      // open: true,
      fs: {
        strict: true,
      },
      https:false
    },
    plugins: [
      // eslint({
      //   cache: false,
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   exclude: ['node_modules'],
      // }),
      requireTransform({
        fileRegex: /vuePdfNoSss.vue$/,
        //   fileRegex:/.js$|.jsx$|.vue$/
      }),
    ],
  },
  baseConfig
);
