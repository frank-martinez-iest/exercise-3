module.exports = {
    clearMocks: true,
    setupFiles: ["jest-localstorage-mock"],
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
  };