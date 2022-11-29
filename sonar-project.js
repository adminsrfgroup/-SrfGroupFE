// const scanner = require('sonarqube-scanner');
// scanner(
//     {
//         serverUrl: "http://localhost:9000",
//         login:"admin",
//         password:"admin",
//         options: {
//             'sonar.login': 'admin',
//             'sonar.password': 'sonar',
//             "sonar.sources": "./src"
//         },
//     },
//     () => process.exit()
// );
const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.login": "admin",
      "sonar.password": "sonar",
      "sonar.projectName": "srfgroup_front",
      "sonar.projectDescription": "Description for SrfGroup Platform...",
      "sonar.sourceEncoding":"UTF-8",
      "sonar.sources": "./src",
      "sonar.test.inclusions": "./src/App.test.tsx",
      "sonar.exclusions": "**/*.test.*",
      "sonar.tests":"./src/App.test.tsx",
      "sonar.testExecutionReportPaths":"test-report.xml",
      "sonar.javascript.lcov.reportPaths":"coverage/lcov.info"
    },
  },
  () => {}
);
