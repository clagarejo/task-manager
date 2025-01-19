module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
