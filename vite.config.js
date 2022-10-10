import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import presetAttributify from '@unocss/preset-attributify';
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import presetUno from '@unocss/preset-uno';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [presetUno(), presetAttributify()],
      transformers: [transformerAttributifyJsx()],
    }),
    react(),
  ],
});
