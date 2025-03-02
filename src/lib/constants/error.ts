export const ErrorMessages = {
  required: (value: string) => `${value} is required`,
  selectOne: (value: string) => `You have to select at least one ${value}`,
  invalidEmail: `Invalid Email Address`,
  invalidURL: `Invalid URL`,
  passwordMismatch: `Passwords do not match`,
  invalidType: (value: string) => `Please input only ${value}`,
  length: (num: number = 6, label: string) =>
    `Your ${label} must be ${num} characters.`,
};
