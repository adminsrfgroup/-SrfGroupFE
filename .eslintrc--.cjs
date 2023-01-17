module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint", "react", "prettier"
    ],
    "rules": {
        "prettier/prettier": "warn",
        "no-console": process.env.NODE_ENV === 'development' ? "off" : "error",
        "no-debugger": process.env.NODE_ENV === 'development' ? "off" : "error"
    }
}
