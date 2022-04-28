module.exports = {
    extends: ["oclif", "oclif-typescript", "prettier"],
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        "no-console": 2,
    },
};
