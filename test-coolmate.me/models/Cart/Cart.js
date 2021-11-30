import testCafe from "testcafe";
import ProductRow from "./_ProductRow";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class Cart {
  constructor() {
    /** CHECKED */
    this.cartSection = xPathSelector(
      '//*[@id="site-wrapper"]/div/div/div/div[2]'
    ).child(".cart-section");
    this.title = this.cartSection.child(".title");

    this.productsWrapper = this.cartSection
      .child("div")
      .nth(1)
      .child(".cart-items");
    // this.productsWrapper = xPathSelector(
    //   '//*[@id="site-wrapper"]/div/div/div/div[2]/div/div[3]'
    // ).child(".cart-items");
    this.productsListEl = this.productsWrapper.find(".cart-item");
    this.productsList = [];

    this.discountBlock = this.cartSection.child(".discount-block");
    this.couponArea = this.discountBlock.child(".discount-box");
    this.coupon = this.couponArea.child("input");
    this.applyCoupon = this.couponArea.child("button");
    this.couponError = this.discountBlock.find(".discount-message");

    this.pricingArea = Selector(".pricing-info__item");
    this.subTotal = this.pricingArea.nth(0).child("p").nth(1);
    this.discount = this.pricingArea.nth(1).child("p").nth(1);
    this.shippingFee = this.pricingArea.nth(2).child("p").nth(1);
    this.total = this.pricingArea.nth(3).child("p").nth(1);

    this.notifySection = Selector(".notify");
    this.notifyClose = this.notifySection.child(".notify_close");
    this.notifyWrapper = this.notifySection
      .child(".notify__wrapper")
      .child(".notify__content");
    this.notifyMessage = this.notifyWrapper.child(".notify__message");
  }

  async setProductsList() {
    const productsList = await helper.setListFromEls(
      this.productsListEl,
      ProductRow
    );
    this.productsList = productsList;
  }

  deleteProductFromCart(idx, step = 1) {
    const products = [...this.productsList];
    if (idx > products.length) {
      return null;
    }
    products.splice(idx, step);

    this.productsList = products;
  }

  deleteProductFromCartByName(name) {
    const products = [...this.productsList];
    this.productsList = products.filter((product) => product.name != name);
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }

  async getProductByName(name) {
    for (let i = 0; i < this.productsList.length; i++) {
      const productName = await this.productsList[i].name.innerText;
      if (productName === name) {
        return { idx: i, el: this.productsList[i] };
      }
    }
    return null;
  }
  async getProductInfosOnCart(namesList = []) {
    if (!Array.isArray(namesList)) return null;

    if (!namesList.length) return null;

    const products = [];
    // console.log("namesList", namesList);
    for (const name of namesList) {
      const productInfo = await this.getProductByName(name);
      if (!productInfo || !Object.keys(productInfo).length) {
        console.log("Product not exists in the cart!");
        return null;
      }
      products.push(productInfo);
    }

    if (products.length === 1) {
      return products[0];
    }
    return products;
  }
}

export default new Cart();
