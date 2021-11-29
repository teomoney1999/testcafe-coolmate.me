import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";

import paymentPage from "../../models/Payment/Payment";
import paymentUrls from "../../data/Payment/URL.json";
import paymentInfo from "../../data/Payment/Payments.json";
import paymentMethod from "../../data/Payment/Methods.json";

import noti from "../../data/Payment/Notifications.json";
import helper from "../../helpers/test-action";

const { Selector, t, ClientFunction } = testCafe;

fixture.beforeEach(async () => {
  console.log("Add Product To Cart!!!");
  await helper.chooseProduct("Quần Jogger");
  await helper.chooseProduct("Áo Tank Top");

  await t.navigateTo(`${url.cart}`);
})`Test Payment Model`.page`${url.cart}`;

test("TC_TT_016", async (t) => {
  const task = "TC_TT_016";
  const methodOptions = paymentInfo[task]["methodOptions"];
  const paymentMethodUrl = helper.getPaymentMethodUrl(methodOptions);
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await paymentPage.fillInfo(paymentInfo[task]);

  // Payment successfully if the page redirect
  // after click to the pay button
  await t
    .click(paymentPage.paymentBtn)
    .expect(getPageUrl())
    .contains(paymentMethodUrl, { timeout: 3000 })
    .wait(5000)
    .expect(getPageUrl)
    .contains(paymentUrls.FailedPage);
});
