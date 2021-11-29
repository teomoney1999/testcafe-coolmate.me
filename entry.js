import createTestCafe from "testcafe";

const testCafe = await createTestCafe();
const fileTest = "./test-coolmate.me/tests/cart/individual-test.js";

try {
  const runner = testCafe.createRunner();

  await runner
    .src(fileTest)
    .run();
} finally {
  testCafe.close();
}
