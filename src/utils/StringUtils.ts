export default class StringUtils {
  static validateCPF(cpf: string) {
    const numbers = cpf.replace(/\D/g, "");

    if (numbers.length !== 11) return false;

    // Verifica se todos os números são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(numbers.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(numbers.charAt(10))) return false;

    return true;
  }

  static generateSecureToken(length: number) {
    // O comprimento do array de bytes deve ser a metade do comprimento da string final,
    // pois cada byte é convertido em 2 caracteres hexadecimais.
    const byteArray = new Uint8Array(length / 2);
    window.crypto.getRandomValues(byteArray);

    // Converte o array de bytes para uma string hexadecimal.
    const hexString = Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hexString;
  }
}
