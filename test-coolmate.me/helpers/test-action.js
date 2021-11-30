import testCafe from "testcafe";
import xPathSelector from "./xpath-selector";

import url from "../config.json";
import productPage from "../models/Product/Product";
import productUrl from "../data/Products/URL.json";
import productOption from "../data/Products/ProductOptions.json";

import cartPage from "../models/Cart/Cart";
import cartData from "../data/Cart/Cart.json";

import paymentPage from "../models/Payment/Payment";
import paymentUrls from "../data/Payment/URL.json";
import paymentInfo from "../data/Payment/Payments.json";
import paymentMethods from "../data/Payment/Methods.json";

const { Selector, t, ClientFunction } = testCafe;

class TestHelper {
  async initCart() {
    await t.navigateTo(url.cart);
    await cartPage.setProductsList();
  }

  async chooseProduct(key) {
    // to buy product with configuration attribute in ProductOption.json file
    await t.navigateTo(productUrl[key]);
    const option = productOption[key];
    const productKeys = ["color", "size", "quantity"];

    for (let k of productKeys) {
      if (!option.hasOwnProperty(k)) continue;

      switch (k) {
        case "color":
          await productPage.chooseColor(option[k]);
          break;
        case "size":
          await productPage.chooseSize(option[k]);
          break;
        case "quantity":
          await productPage.chooseQuantity(option[k]);
          break;
      }
    }
    await productPage.addToCart();
  }

  getPaymentMethodUrl(methodIdx) {
    // get payment method via methodIdx - paymentUrls
    const method = Object.keys(paymentMethods).find(
      (key) => paymentMethods[key] === methodIdx
    );
    if (!paymentUrls.hasOwnProperty(method)) return null;

    return paymentUrls[method];
  }

  async addProductsToCart(productKeys) {
    // use to buy multiple product
    if (!Array.isArray(productKeys)) return null;
    if (!productKeys.length) return null;

    for (const key of productKeys) {
      await this.chooseProduct(key);
    }
  }

  async addProductToCartAndGetItsInfo(key) {
    if (!key) return null;

    await this.chooseProduct(key);
    const productInfo = await productPage.getInfo();
    return productInfo;
  }

  async getProductNames(productKeys) {
    if (!Array.isArray(productKeys)) {
      await this.chooseProduct(productKeys);
      const productName = await productPage.name.innerText;
      return productName;
    }

    if (!productKeys || !productKeys.length) return [];

    const productsNames = [];
    for (const key of productKeys) {
      await this.chooseProduct(key);
      const productName = await productPage.name.innerText;
      productsNames.push(productName);
    }

    return [...new Set(productsNames)]; // remove duplicate in productsNames
  }

  getInfoFromTitle(colorAndSize) {
    // get size and color from text below title on cart
    // using for color and size of product on cart
    if (!colorAndSize) return null;
    const result = colorAndSize.split("/");
    return { color: result[0].trim(), size: result[1].trim() };
  }

  getPriceFromStr(priceStr) {
    // get price from string has format "799.000đ"
    priceStr = priceStr.trim();
    // Free
    if (priceStr === "Miễn phí" || priceStr === "0đ") {
      return 0;
    }
    // Normal price
    while (priceStr.includes(".")) {
      // Remove all "."
      priceStr = priceStr.replace(".", "");
    }
    priceStr = priceStr.substring(0, priceStr.length - 1); // Remove "đ"
    const priceNum = parseInt(priceStr);
    return !priceNum ? null : priceNum;
  }

  async getFeesFromCart() {
    // get all fees from cart
    const keys = ["subTotal", "discount", "shippingFee", "total"];
    // fees info
    const fees = {};
    for (const key of keys) {
      if (!fees.hasOwnProperty(key)) {
        const feeStr = await cartPage[key].innerText;
        fees[key] = this.getPriceFromStr(feeStr);
      }
    }
    return fees;
  }
}

export default new TestHelper();
