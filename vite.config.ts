import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  base: '/zelij-quiz/',
  plugins: [tailwindcss(), ViteYaml()],
});
