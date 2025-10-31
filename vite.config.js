import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// **IMPORTANT: Replace 'MovieExplorer' with your actual repository name**
const repoName = '/349MovieExplorer/'; 

export default defineConfig({
  plugins: [react()],
  // Sets the base public path when serving and building the application
  base: repoName, 
});