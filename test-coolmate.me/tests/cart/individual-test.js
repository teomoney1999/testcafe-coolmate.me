import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";

import productPage from "../../models/Product/Product";
import productUrls from "../../data/Products/URL.json";
import productOption from "../../data/Products/ProductOptions.json";
import color from "../../data/Products/Colors.json";

import cartPage from "../../models/Cart/Cart";
import cartData from "../../data/Cart/Cart.json";

import paymentNoti from "../../data/Payment/Notifications.json";
import cartNoti from "../../data/Cart/Notifications.json";
import helper from "../../helpers/test-action";

const { Selector, t, ClientFunction } = testCafe;

fixture.beforeEach(async () => {
  //   console.log("Add Product To Cart!!!");
  //   await helper.chooseProduct("Quần Jogger");
  //   await helper.chooseProduct("Áo Tank Top");
  //   await t.navigateTo(`${url.cart}`);
  //   await cartPage.setProductsList();
})`Test Payment Model`.page`${url.cart}`;

// test.before(async (t) => {
//   await t.navigateTo(`${url.cart}`);
// })("TC_GH_004", async (t) => {
//   const task = "TC_TT_004";
//   const productKeysList = cartData[task];
//   const productNamesList = await helper.getProductNameList(productKeysList);

//   await t.navigateTo(url.cart);

//   await cartPage.setProductsList();

//   await t.expect(cartPage.productsList.length).eql(1);
// });
test("TC_GH_020", async (t) => {
  const task = "TC_GH_020";

  const productKeyList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeyList);

  await helper.initCart();

  // get price from every product row on cart
  let subTotal = 0;
  for (const product of cartPage.productsList) {
    const priceStr = await product.price.innerText;
    const priceRemoveUnit = priceStr
      .replace(".", "")
      .substring(0, priceStr.length - 1); // remove "." and "đ"
    const priceNum = parseInt(priceRemoveUnit);
    subTotal += priceNum;
  }
  const subTotalFromProductsList = `${subTotal.toString()}đ`;   // 799000đ

  // get price from cart subtotal
  const subTotalStrFromCart = await cartPage.subTotal.innerText; // 799.000đ
  const subTotalFromCart = subTotalStrFromCart.replace(".", ""); // 799000đ

  // compare 2 price and get result.
  await t.expect(subTotalFromProductsList).eql(subTotalFromCart);
});
