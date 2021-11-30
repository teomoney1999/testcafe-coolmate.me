import createTestCafe from "testcafe";
import { getArgv } from "./test-coolmate.me/reports/helper";

const testCafe = await createTestCafe();

const {feature} = getArgv(process.argv);

const fileTest = `./test-coolmate.me/tests/${feature}/${feature}-test.js`;

try {
  const runner = testCafe.createRunner();

  await runner
    .src(fileTest)
    .reporter([
      {
        name: "spec",
      },
      {
        name: "json",
        output: `./test-coolmate.me/reports/json/report_${feature}_${new Date()}.json`,
      },
    ])
    .run();
} finally {
  testCafe.close();
}

