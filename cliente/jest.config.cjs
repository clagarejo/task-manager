module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
