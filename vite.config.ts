
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get repository name from GitHub Actions environment or default to '/'
// For project pages: https://username.github.io/repo-name/
// For user pages: https://username.github.io/
const getBasePath = () => {
  // Check if we're in GitHub Actions (GITHUB_ACTIONS is set automatically)
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  
  // In GitHub Actions, GITHUB_REPOSITORY is in format "owner/repo-name"
  const repo = process.env.GITHUB_REPOSITORY;
  
  if (isGitHubActions && repo) {
    const repoName = repo.split('/')[1];
    // If repository is username.github.io, use root path
    if (repoName && repoName.includes('.github.io')) {
      return '/';
    }
    // Otherwise use /repo-name/
    if (repoName) {
      return `/${repoName}/`;
    }
  }
  // Default for local development
  return '/';
};

export default defineConfig({
  base: getBasePath(),
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
