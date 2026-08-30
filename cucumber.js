module.exports = {
    default: {
        require: [
            "tests/Step-Definition/**/*.ts",
            "tests/hooks/**/*.ts"
        ],

        requireModule: [
            "ts-node/register"
        ],

        paths: [
            "tests/features/**/*.feature"
        ],

        format: [
            "pretty",
            "allure-cucumberjs/reporter"
        ],

        formatOptions: {
            resultsDir: "allure-results"
        },

        publishQuiet: true
    }
};