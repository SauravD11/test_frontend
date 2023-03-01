import isDevelopment from '../utils/isDevelopment';

const authApi = {
  async generateJwt() {
    if (isDevelopment()) {
      return import.meta.env.VITE_REACT_APP_JWT_TOKEN;
    } else {
      const response = await fetch('/generate-jwt', { method: 'POST' });
      if (response.ok) {
        const token = await response.text();
        return token;
      } else {
        throw new Error('Failed to authorize!');
      }
    }
  },
};

export default authApi;
