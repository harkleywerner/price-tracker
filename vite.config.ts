import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins :[react()],
  root: 'client', 
  build: {
    outDir: '../../dist/client', 
  },
  server : {
    origin : "localhost:3000"
  }
});