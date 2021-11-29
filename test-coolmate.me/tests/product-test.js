import testCafe from "testcafe";
import url from "../config.json";
import xPathSelector from "../helpers/xpath-selector";
import product from "../models/Product/Product";
const { Selector, t } = testCafe;

fixture`Test Cart Model`.page`${url.cart}`;

test.before(async (t) => {
  await t.navigateTo(
    "https://www.coolmate.me/product/quan-nam-all-week-jogger?color=%C4%90en"
  );
})("Test Model Attributes", async (t) => {
    product.attributesCheck();


});
