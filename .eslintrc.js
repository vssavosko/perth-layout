module.exports = {
    rules: {
        'no-console': 'off',
        indent: [2, 4],
        quotes: [2, 'single'],
        'linebreak-style': [2, 'unix'],
        semi: [2, 'always']
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jquery: true
    },
    extends: 'airbnb/base'
};
