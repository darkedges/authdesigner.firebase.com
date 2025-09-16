export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const validateFlow = (flow: any): boolean => {
  if (!flow.name || !flow.components) return false;
  if (flow.components.length === 0) return true; // Empty flow is valid
  
  // Check for required start component
  const hasStart = flow.components.some((c: any) => c.type === 'login-form' || c.type === 'register-form');
  return hasStart;
};