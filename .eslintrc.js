module.exports = {
    "root": true,
    "parser": '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "plugins": [
        '@typescript-eslint',
    ],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "rules": {
        "no-console": "off",
        "comma-dangle": "off",
        "react/jsx-filename-extension": "off",
        "@typescript-eslint/no-var-requires" : "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off"
    }
};
