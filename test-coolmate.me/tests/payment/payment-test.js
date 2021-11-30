import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";

import productPage from "../../models/Product/Product";
import productUrls from "../../data/Products/URL.json";
import productOption from "../../data/Products/ProductOptions.json";

import paymentPage from "../../models/Payment/Payment";
import paymentUrls from "../../data/Payment/URL.json";
import paymentInfo from "../../data/Payment/Payments.json";
import paymentMethod from "../../data/Payment/Methods.json";

import noti from "../../data/Payment/Notifications.json";
import helper from "../../helpers/test-action";

const { Selector, t, ClientFunction } = testCafe;

fixture.beforeEach(async () => {
  await helper.chooseProduct("Quần Jogger");
  await helper.chooseProduct("Áo Tank Top");
  await t.navigateTo(`${url.cart}`);
})`Test Payment Model`.page`${url.cart}`;

test("TC_TT_001", async (t) => {
  const task = "TC_TT_001";
  await paymentPage.fillInfo(paymentInfo[task]);
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.fullnameError.exists)
    .ok()
    .expect(paymentPage.fullnameError.innerText)
    .eql(noti.error);
});

test("TC_TT_002", async (t) => {
  const task = "TC_TT_002";
  await paymentPage.fillInfo(paymentInfo[task]);
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.fullnameError.exists)
    .ok()
    .expect(paymentPage.fullnameError.innerText)
    .eql(noti.error);
});

test("TC_TT_003", async (t) => {
  const task = "TC_TT_003";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_004", async (t) => {
  const task = "TC_TT_004";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.phoneError.exists)
    .ok()
    .expect(paymentPage.phoneError.innerText)
    .eql(noti.error);
});

test("TC_TT_005", async (t) => {
  const task = "TC_TT_005";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.phoneError.exists)
    .ok()
    .expect(paymentPage.phoneError.innerText)
    .eql(noti.error);
});

test("TC_TT_006", async (t) => {
  const task = "TC_TT_006";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_007", async (t) => {
  const task = "TC_TT_007";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.phoneError.exists)
    .ok()
    .expect(paymentPage.phoneError.innerText)
    .eql(noti.error);
});

test("TC_TT_008", async (t) => {
  const task = "TC_TT_008";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.addressError.exists)
    .ok()
    .expect(paymentPage.addressError.innerText)
    .eql(noti.error);
});

test("TC_TT_009", async (t) => {
  const task = "TC_TT_009";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.addressError.exists)
    .ok()
    .expect(paymentPage.addressError.innerText)
    .eql(noti.error);
});

test("TC_TT_010", async (t) => {
  const task = "TC_TT_010";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.addressError.exists)
    .ok()
    .expect(paymentPage.addressError.innerText)
    .eql(noti.error);
});

test("TC_TT_011", async (t) => {
  const task = "TC_TT_011";
  await paymentPage.fillInfo(paymentInfo[task]);

  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.addressError.exists)
    .ok()
    .expect(paymentPage.addressError.innerText)
    .eql(noti.error);
});

test("TC_TT_012", async (t) => {
  const task = "TC_TT_012";
  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.districtNoOption.exists)
    .ok()
    .expect(paymentPage.districtNoOption.innerText)
    .eql(noti.noOption);
});

test("TC_TT_013", async (t) => {
  const task = "TC_TT_013";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_014", async (t) => {
  const task = "TC_TT_014";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_015", async (t) => {
  const task = "TC_TT_015";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

// Need to wait for 10 minutes
// test("TC_TT_016", async (t) => {
//   const task = "TC_TT_016";
//   const methodOptions = paymentInfo[task]["methodOptions"];
//   const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
//   const waitingTime = 6000000;
//   const getPageUrl = ClientFunction(() => window.location.href.toString());

//   await paymentPage.fillInfo(paymentInfo[task]);

//   // Payment successfully if the page redirect
//   // after click to the pay button
//   await t
//     .click(paymentPage.paymentBtn)
//     .expect(getPageUrl())
//     .contains(paymentMethodUrl, { timeout: 3000 })
//     .wait(waitingTime)
//     .expect(getPageUrl)
//     .contains(paymentUrls.FailedPage);
// });

test.before(async (t) => {
  await t.navigateTo(url.cart);
})("TC_TT_017", async (t) => {
  const task = "TC_TT_017";

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .expect(paymentPage.paymentBtn.getAttribute("disabled"))
    .eql("disabled");
});

test("TC_TT_018", async (t) => {
  const task = "TC_TT_018";
  await paymentPage.fillInfo(paymentInfo[task]);
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.emailError.exists)
    .ok()
    .expect(paymentPage.emailError.innerText)
    .eql(noti.emailError);
});

test("TC_TT_019", async (t) => {
  const task = "TC_TT_019";
  await paymentPage.fillInfo(paymentInfo[task]);
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.emailError.exists)
    .ok()
    .expect(paymentPage.emailError.innerText)
    .eql(noti.emailError);
});

test("TC_TT_020", async (t) => {
  const task = "TC_TT_020";
  await paymentPage.fillInfo(paymentInfo[task]);
  await t
    .click(paymentPage.paymentBtn)
    .expect(paymentPage.emailError.exists)
    .ok()
    .expect(paymentPage.emailError.innerText)
    .eql(noti.emailError);
});

test("TC_TT_021", async (t) => {
  const task = "TC_TT_021";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .wait(500)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_022", async (t) => {
  const task = "TC_TT_022";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

test("TC_TT_023", async (t) => {
  const task = "TC_TT_023";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 });
});

// Payment method: COD - Need some money to test this testcase =))))
// test("TC_TT_024", async (t) => {
//   const task = "TC_TT_024";
//   const methodOptions = paymentInfo[task]["methodOptions"];
//   const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
//   const getPageUrl = ClientFunction(() => window.location.href.toString());

//   await paymentPage.fillInfo(paymentInfo[task]);

//   // Payment successfully if the page redirect
//   // after click to the pay button
//   await t
//     .click(paymentPage.paymentBtn)
//     .expect(getPageUrl())
//     .contains(paymentMethodUrl, { timeout: 3000 });
// });

// generateReport(`Payment_Report_${new Date()}`);
