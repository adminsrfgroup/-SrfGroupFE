const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
    {
        serverUrl: "http://localhost:9000",
        options: {
            "sonar.login": "admin",
            "sonar.password": "sonar",
            "sonar.projectName": "srfgroup_front",
            "sonar.projectDescription": "Description for SrfGroup Platform...",
            "sonar.sourceEncoding": "UTF-8",
            "sonar.sources": "./src",
            "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
            "sonar.tests": "./src",
            "sonar.testExecutionReportPaths": "test-report.xml",
            "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
        },
    },
    () => {
    }
);
