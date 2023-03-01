function isDevelopment() {
  return import.meta.env.MODE === 'development';
}

export default isDevelopment;
