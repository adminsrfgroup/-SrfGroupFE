module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "react-app/jest"
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
    "ignorePatterns": ["**/setupTests.ts"],
    "rules": {
        "no-console": process.env.NODE_ENV === 'development' ? "off" : "error",
        "no-debugger": process.env.NODE_ENV === 'development' ? "off" : "error"
    }
}
