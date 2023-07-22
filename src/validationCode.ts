 export function generateDeliveryValidationCode(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }
  return code;
}
const validationCode: string = generateDeliveryValidationCode(6);
console.log(validationCode); 
