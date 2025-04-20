
// Environment configuration
type Environment = {
  apiUrl: string;
  appName: string;
  isProduction: boolean;
}

// Default to development values
const env: Environment = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'VidyaSathi Lead Manager',
  isProduction: import.meta.env.PROD || false,
}

export default env;
