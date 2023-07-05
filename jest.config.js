module.exports = {
  bail: true, // Parar a execução dos testes no primeiro erro encontrado
  coverageProvider: "v8", // Usar o provedor de cobertura de código V8

  testMatch: ["<rootDir>/src/**/*.spec.js"], // Executar arquivos de teste com a extensão .spec.js dentro de src e seus subdiretórios. Setando assim evitamos passar pela pasta node_modules
};
