import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";

import productPage from "../../models/Product/Product";
import productUrls from "../../data/Products/URL.json";
import productOption from "../../data/Products/ProductOptions.json";

import cartPage from "../../models/Cart/Cart";
import cartData from "../../data/Cart/Cart.json";

import noti from "../../data/Payment/Notifications.json";
import helper from "../../helpers/test-action";

fixture.beforeEach(async () => {

})`Test Payment Model`.page`${url.cart}`;

test.before(async (t) => {
  await helper.initCart();
})("TC_GH_001", async (t) => {
  const task = "TC_GH_001";
  await t.expect(cartPage.productsList.length).eql(0);
});

test("TC_GH_002", async (t) => {
  const task = "TC_GH_002";
  const productKeysList = cartData[task];
  const productNamesList = await helper.getProductNames(productKeysList);

  await helper.initCart();

  for (let i = 0; i < cartPage.productsList.length; i++) {
    const productName = await cartPage.productsList[i].name.innerText;
    await t.expect(productName === productNamesList[i]).ok();
  }
});

test("TC_GH_003", async (t) => {
  const task = "TC_GH_003";
  const productKeysList = cartData[task];
  const productNamesList = await helper.getProductNames(productKeysList);

  await helper.initCart();

  for (let i = 0; i < cartPage.productsList.length; i++) {
    // Check name
    const productName = await cartPage.productsList[i].name.innerText;
    await t.expect(productName === productNamesList[i]).ok();
  }
  // Check length
  await t.expect(cartPage.productsList.length).eql(2);
});

test("TC_GH_004", async (t) => {
  const task = "TC_GH_004";
  const productKeysList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeysList);

  await helper.initCart();
  await t.expect(cartPage.productsList.length).eql(1);
});

test("TC_GH_005", async (t) => {
  const task = "TC_GH_005";
  const productKeysList = cartData[task].productsKeys;
  const productNamesList = await helper.getProductNames(productKeysList);

  await helper.initCart();

  const productOnCart = await cartPage.getProductInfosOnCart(productNamesList);
  const productIdx = productOnCart["idx"];

  await t.expect(cartPage.productsList[productIdx].quantity.innerText).eql("2");
});

test("TC_GH_006", async (t) => {
  const task = "TC_GH_006";
  const productKeysList = cartData[task].productsKeys;

  await helper.addProductsToCart(productKeysList);

  await helper.initCart();

  await t.expect(cartPage.productsList.length).eql(2);
});

test("TC_GH_007", async (t) => {
  const task = "TC_GH_007";
  const productKeysList = cartData[task].productsKeys;

  await helper.addProductsToCart(productKeysList);

  await helper.initCart();

  await t.expect(cartPage.productsList.length).eql(2);
});

test("TC_GH_009", async (t) => {
  const task = "TC_GH_009";
  const productKeysList = cartData[task].productsKeys;
  const maximumInput = "10000";

  const productNamesList = await helper.getProductNames(productKeysList);

  await helper.initCart();

  const productOnCart = await cartPage.getProductInfosOnCart(productNamesList);
  const productEl = productOnCart["el"];

  await t
    .typeText(productEl.quantityInput, maximumInput, { replace: true })
    .wait(2000)
    .expect(cartPage.notifyMessage.innerText)
    .eql(cartNoti.updateCartSuccessfully)
    .expect(productEl.quantity.innerText)
    .notEql(maximumInput);
});

test("TC_GH_010", async (t) => {
  const task = "TC_GH_010";
  const productKeys = cartData[task].productsKeys;
  // get info from product page
  const productPageInfo = await helper.addProductToCartAndGetItsInfo(
    productKeys
  );

  const colorAndSize = `${productPageInfo.color} / ${productPageInfo.size}`;

  // compare to info of that product in the cart

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];
  for (const key in productPageInfo) {
    if (!productOnCart.hasOwnProperty(key)) {
      continue;
    }
    if (key === "color" || key === "size") {
      // Compare value at combobox
      await t
        .expect(productOnCart[key].current.innerText)
        .eql(productPageInfo[key]);
      continue;
    }
    if (key === "price") {
      const priceFromCart = productOnCart.price.innerText;
      if (priceFromCart === "0đ") {
        // Handle when that product being saled
        continue;
      }
    }
    const cartInfo = await productOnCart[key].innerText;
    await t.expect(cartInfo).eql(productPageInfo[key]);
  }

  // Compare value at below product name
  await t.expect(productOnCart.colorAndSize.innerText).eql(colorAndSize);
});

test("TC_GH_011", async (t) => {
  const task = "TC_GH_011";

  const productKey = cartData[task].productsKeys;
  const productName = await helper.getProductNames(productKey);

  await helper.initCart();

  const getPageUrl = ClientFunction(() => window.location.href.toString());
  const productOnCart = cartPage.productsList[0];
  const productOnCartName = await productOnCart.name.innerText;

  const productUrl = await productOnCart.name.getAttribute("href");
  await t.navigateTo(productUrl).wait(100);

  await t
    .expect(getPageUrl())
    .contains(productUrls.ProductPage)
    .expect(productOnCartName)
    .eql(productName);
});

test("TC_GH_012", async (t) => {
  const task = "TC_GH_012";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];
  const productOnCartQuantity = productOnCart.quantity;

  await t
    .click(productOnCart.quantityDecrease)
    .expect(productOnCartQuantity.innerText)
    .eql("1");
});

test("TC_GH_013", async (t) => {
  const task = "TC_GH_013";

  const productKeyList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeyList);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];
  const productOnCartQuantity = productOnCart.quantity;

  await t
    .expect(productOnCartQuantity.innerText)
    .eql("2")
    .click(productOnCart.quantityDecrease)
    .expect(productOnCartQuantity.innerText)
    .eql("1");
});

test("TC_GH_014", async (t) => {
  const task = "TC_GH_014";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];
  const productOnCartQuantity = productOnCart.quantity;

  await t
    .click(productOnCart.quantityIncrease)
    .wait(200)
    .expect(productOnCartQuantity.innerText)
    .eql("2");
});

test("TC_GH_015", async (t) => {
  const task = "TC_GH_015";

  const productKeysList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeysList);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];

  await t.click(productOnCart.deleteBtn).wait(500);
  await cartPage.setProductsList();
  await t.expect(cartPage.productsList.length > 0).ok();
});

test("TC_GH_016", async (t) => {
  const task = "TC_GH_016";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];

  await t.click(productOnCart.deleteBtn).wait(500);
  await cartPage.setProductsList();
  await t.expect(cartPage.productsList.length).eql(0);
});

test("TC_GH_017", async (t) => {
  const task = "TC_GH_017";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];

  // get current color info from title and combobox
  const colorFromTitle = helper.getInfoFromTitle(
    await productOnCart.colorAndSize.innerText
  ).color;

  // change color using combobox
  await productOnCart.color.choose(cartData[task].changeValue);
  // wait for product to change its info
  await t.wait(1000);

  const newColorFromTitle = helper.getInfoFromTitle(
    await productOnCart.colorAndSize.innerText
  ).color;
  const newColorFromComboBox = await productOnCart.color.current.innerText;

  // compare changed value to previous value to check if they are changed
  await t
    .expect(colorFromTitle)
    .notEql(newColorFromTitle)
    .expect(newColorFromTitle)
    .eql(newColorFromComboBox);
});

test("TC_GH_018", async (t) => {
  const task = "TC_GH_018";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  const productOnCart = cartPage.productsList[0];

  // get current size info from title and combobox
  const colorFromTitle = helper.getInfoFromTitle(
    await productOnCart.colorAndSize.innerText
  ).size;

  // change size using combobox
  await productOnCart.size.choose(cartData[task].changeValue);
  await t.wait(1000);

  const newColorFromTitle = helper.getInfoFromTitle(
    await productOnCart.colorAndSize.innerText
  ).size;
  const newColorFromComboBox = await productOnCart.size.current.innerText;

  // compare changed value to previous value to check if they are changed
  await t
    .expect(colorFromTitle)
    .notEql(newColorFromTitle)
    .expect(newColorFromTitle)
    .eql(newColorFromComboBox);
});

test("TC_GH_019", async (t) => {
  const task = "TC_GH_019";

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
