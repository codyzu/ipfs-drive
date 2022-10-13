import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import presetAttributify from '@unocss/preset-attributify';
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetIcons({
          extraProperties: {
            display: 'block',
            'vertical-align': 'middle',
          },
        }),
        presetUno(),
        presetAttributify(),
      ],
      transformers: [transformerAttributifyJsx()],
      safelist: 'animate-duration-300 animate-duration-1000 bg-gray-200'.split(
        ' ',
      ),
      theme: {
        media: {
          portrait: '(max-aspect-ratio: 1/1)',
          short: '(max-height: 480px)',
          // eslint-disable-next-line camelcase
          short_portrait: '(max-aspect-ratio: 1/1) and (max-height: 480px)',
        },
      },
    }),
    react(),
  ],
});
