export const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

// VITE_CODESPACE_NAME should be defined in .env.local for Codespaces API routing.
// Fallback to localhost when unset to avoid https://undefined-8000.app.github.dev.
export const API_HOST = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getApiPath(resource) {
  return `${API_HOST}/api/${resource}`;
}
