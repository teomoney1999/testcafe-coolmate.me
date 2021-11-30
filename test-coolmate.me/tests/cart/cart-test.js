import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";

import productPage from "../../models/Product/Product";
import productUrls from "../../data/Products/URL.json";
import productOption from "../../data/Products/ProductOptions.json";

import cartPage from "../../models/Cart/Cart";
import cartData from "../../data/Cart/Cart.json";
import cartNoti from "../../data/Cart/Notifications.json"

import noti from "../../data/Payment/Notifications.json";
import helper from "../../helpers/test-action";

// import generateReport from "../../reports/generateReport";

const { Selector, t, ClientFunction } = testCafe;

fixture.beforeEach(async () => {})`Test Payment Model`.page`${url.cart}`;

test.before(async (t) => {
  await helper.initCart();
})("TC_GH_001", async (t) => {
  const task = "TC_GH_001";
  await t.expect(cartPage.productsList.length).eql(0);
});

test("TC_GH_002", async (t) => {
  const task = "TC_GH_002";
  const productKeysList = cartData[task].productsKeys;
  const productNamesList = await helper.getProductNames(productKeysList);

  await helper.initCart();

  for (let i = 0; i < cartPage.productsList.length; i++) {
    const productName = await cartPage.productsList[i].name.innerText;
    await t.expect(productName === productNamesList[i]).ok();
  }
});

test("TC_GH_003", async (t) => {
  const task = "TC_GH_003";
  const productKeysList = cartData[task].productsKeys;
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
    const priceNum = helper.getPriceFromStr(priceStr);
    subTotal += priceNum;
  }
  const subTotalFromProductsList = subTotal; // 799000đ

  // get price from cart subtotal
  const subTotalStrFromCart = await cartPage.subTotal.innerText; // 799.000đ
  const subTotalFromCart = helper.getPriceFromStr(subTotalStrFromCart); // 799000đ

  // compare 2 price and get result.
  await t.expect(subTotalFromProductsList).eql(subTotalFromCart);
});

test("TC_GH_020", async (t) => {
  const task = "TC_GH_020";
  const keys = ["subTotal", "discount", "shippingFee", "total"];

  const productKeyList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeyList);

  await helper.initCart();

  const fees = await helper.getFeesFromCart();

  const assembleFees =
    fees["subTotal"] - fees["discount"] + fees["shippingFee"];
  // compare 2 price and get result.
  await t.expect(assembleFees).eql(fees["total"]);
});

// TC_GH_021 can not be done because I can't find any coupon code online
// What a bizzare reason! My dog ate my homework. But it true though!

test("TC_GH_022", async (t) => {
  const task = "TC_GH_022";

  const productKey = cartData[task].productsKeys;
  await helper.chooseProduct(productKey);

  await helper.initCart();

  // type coupon code
  // expect error notify
  await t
    .typeText(cartPage.coupon, cartData[task].couponCode)
    // .click(cartPage.applyCoupon)
    .pressKey("enter")
    .wait(500)
    .expect(cartPage.couponError.innerText)
    .eql(cartNoti.couponNotExist);
});

test("TC_GH_025", async (t) => {
  // Explain:
  // Firstly, buy a product and save it fees info
  // Secondly, buy another product and update to the first-buy fees info
  // Finally, compare the total on the web with the first-buy fees info total
  const task = "TC_GH_025";
  // First buy
  await helper.chooseProduct(cartData[task].productsKeys[0]);

  await helper.initCart();
  const firstBuyFees = await helper.getFeesFromCart();

  // Second buy
  await helper.chooseProduct(cartData[task].productsKeys[1]);
  const productPrice = await productPage.price.innerText;

  // update by code to compare with result from the web
  firstBuyFees["subTotal"] += helper.getPriceFromStr(productPrice);

  await helper.initCart();
  const secondBuyFees = await helper.getFeesFromCart();

  // sync the shipping fee between two bill
  if (secondBuyFees["shippingFee"] === 0) {
    firstBuyFees["shippingFee"] === 0;
  }

  // calculate the total after adding product price to the firstBuyFees
  firstBuyFees["total"] =
    firstBuyFees["subTotal"] -
    firstBuyFees["discount"] +
    firstBuyFees["shippingFee"];
  // compare total of the first time that has been modified, to total of the second time buy
  await t.expect(firstBuyFees["total"]).eql(secondBuyFees["total"]);
});

test("TC_GH_023", async (t) => {
  const task = "TC_GH_023";

  const productKey = cartData[task].productsKeys;

  await helper.chooseProduct(productKey);
  await helper.initCart();

  // increase quantity
  const changeTimes = 2;
  await cartPage.productsList[0].increaseQuantity(changeTimes);
  await helper.initCart();

  const cartFees = await helper.getFeesFromCart();
  const totalCalc =
    cartFees["subTotal"] - cartFees["discount"] + cartFees["shippingFee"];

  let subTotalCalc = 0;
  for (const product of cartPage.productsList) {
    const priceStr = await product.price.innerText;
    const productPrice = helper.getPriceFromStr(priceStr);
    subTotalCalc += productPrice;
  }
  await t
    // compare subTotal: calculate and from web
    .expect(subTotalCalc)
    .eql(cartFees["subTotal"])
    // compare total: calculate and from web
    .expect(totalCalc)
    .eql(cartFees["total"]);
});

test("TC_GH_024", async (t) => {
  const task = "TC_GH_024";

  const productKeyList = cartData[task].productsKeys;

  await helper.addProductsToCart(productKeyList);
  await helper.initCart();

  // decrease quantity
  const changeTimes = 1;
  await cartPage.productsList[0].increaseQuantity(changeTimes);
  await helper.initCart();

  const cartFees = await helper.getFeesFromCart();
  const totalCalc =
    cartFees["subTotal"] - cartFees["discount"] + cartFees["shippingFee"];

  let subTotalCalc = 0;
  for (const product of cartPage.productsList) {
    const priceStr = await product.price.innerText;
    const productPrice = helper.getPriceFromStr(priceStr);
    subTotalCalc += productPrice;
  }
  await t
    // compare subTotal: calculate and from web
    .expect(subTotalCalc)
    .eql(cartFees["subTotal"])
    // compare total: calculate and from web
    .expect(totalCalc)
    .eql(cartFees["total"]);
});


test("TC_GH_025", async (t) => {
  const task = "TC_GH_025";

  const productKeyList = cartData[task].productsKeys;

  // First buy
  await helper.chooseProduct(productKeyList[0]);
  await helper.initCart();

  // Second buy
  await helper.chooseProduct(productKeyList[0]);
  await helper.initCart();

  const cartFees = await helper.getFeesFromCart();
  const totalCalc =
    cartFees["subTotal"] - cartFees["discount"] + cartFees["shippingFee"];

  let subTotalCalc = 0;
  for (const product of cartPage.productsList) {
    const priceStr = await product.price.innerText;
    const productPrice = helper.getPriceFromStr(priceStr);
    subTotalCalc += productPrice;
  }

  await t
    // compare subTotal: calculate and from web
    .expect(subTotalCalc)
    .eql(cartFees["subTotal"])
    // compare total: calculate and from web
    .expect(totalCalc)
    .eql(cartFees["total"]);
});

test("TC_GH_026", async (t) => {
  const task = "TC_GH_026";
  // First buy
  const productKeyList = cartData[task].productsKeys;
  await helper.addProductsToCart(productKeyList);

  await helper.initCart();

  // detete a product on cart
  await cartPage.productsList[0].delete();
  // wait for cart update
  await t.wait(1000);
  // update cart
  await cartPage.setProductsList();

  const cartFees = await helper.getFeesFromCart();
  const totalCalc =
    cartFees["subTotal"] - cartFees["discount"] + cartFees["shippingFee"];

  let subTotalCalc = 0;
  for (const product of cartPage.productsList) {
    const priceStr = await product.price.innerText;
    const productPrice = helper.getPriceFromStr(priceStr);
    subTotalCalc += productPrice;
  }

  await t
    // compare subTotal: calculate and from web
    .expect(subTotalCalc)
    .eql(cartFees["subTotal"])
    // compare total: calculate and from web
    .expect(totalCalc)
    .eql(cartFees["total"]);
});


// generateReport(`Cart_Report_${new Date()}`);