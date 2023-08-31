export const replacer = (key, value) => {
  // Limit depth to avoid deeply nested objects causing issues
  if (typeof value === 'object' && value !== null) {
    return { ...value };
  }
  return value;
};