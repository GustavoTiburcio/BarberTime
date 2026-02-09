// Configurações da empresa
export const COMPANY_CONFIG = {
  // Chave PIX da empresa (pode ser CPF, CNPJ, email, telefone ou chave aleatória)
  pixKey: "00.000.000/0001-00", // Substitua pela chave PIX real

  // Telefone da empresa para WhatsApp (com DDI e DDD, sem espaços ou caracteres especiais)
  // Formato: 55 (Brasil) + DDD + Número
  whatsappPhone: "554491763121", // Exemplo: 5544998765432

  // Nome da empresa
  name: "Lord'3 Barber Shop",

  // Endereço completo
  address: {
    street: "Av. Aurora Rinck Vignoto n. 399",
    neighborhood: "Jardim Aurora",
    city: "Sarandi - PR"
  }
} as const;
