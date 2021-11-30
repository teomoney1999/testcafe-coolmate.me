import createTestCafe from "testcafe";

const testCafe = await createTestCafe();

const feature = "cart"; 
// const feature = "payment"; 
// const feature = "search"; 
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

