import { defineConfig } from 'vite';

import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [
    // ...
    requireTransform({
      fileRegex: /.ts$|.tsx$|.vue$/,
      //   fileRegex:/.js$|.jsx$|.vue$/
    }),
  ],
});
