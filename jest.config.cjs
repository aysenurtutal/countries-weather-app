module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest', // Babel is used to transpile JavaScript files
        '^.+\\.css$': 'jest-transform-stub',  // to mock css files while testing
    },
    transformIgnorePatterns: [
        '/node_modules/(?!react-leaflet).+\\.js$',
    ],
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy', // for CSS modules proxy
        '\\.css$': 'jest-transform-stub', // for global CSS files stub
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // set up file
};
