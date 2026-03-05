export const validateField = (name, value) => {
  switch (name) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    case 'password':
      return value.length >= 6;
    default:
      return true;
  }
};

export const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let strength = 0;
  const checks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  
  Object.values(checks).forEach(check => {
    if (check) strength += 20;
  });
  
  return strength;
};

