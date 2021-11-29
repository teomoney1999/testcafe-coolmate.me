import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
import colorData from "../../data/Products/Colors.json";
const { Selector, t } = testCafe;

class Product {
  constructor() {
    this.productSection = Selector(".product-single__wrapper");
    this.productWrapper = this.productSection
      .child(".product-single__summary")
      .child("div");

    this.name = this.productWrapper.child(".product-single__title");
    this.price = this.productWrapper
      .child("div")
      .child(".product-single__prices")
      .child("ins");

    this.addToCartArea = this.productWrapper.child(
      ".product-single__addtocart"
    );
    this.form = this.addToCartArea.child("form");

    this.options = this.form
      .child(".product-single__options")
      .child(".option-select");
    this.colors = this.options
      .withAttribute("data-option-index", "1")
      .find("label");
    this.sizes = this.options
      .withAttribute("data-option-index", "2")
      .find("label");

    this.actions = this.form.child(".product-single__actions");

    this.quantityWrapper = this.actions
      .child(".product-single__quantity")
      .child(".quantity");
    this.quantityInput = this.quantityWrapper.child("input");
    this.quantityDecrease = this.quantityWrapper.child(".quantity__reduce");
    this.quantityIncrease = this.quantityWrapper.child(".quantity__augure");

    this.addToCartBtn = this.actions
      .child(".product-single__button")
      .child("a");
  }

  async chooseColor(idx = 0) {
    const optionsLength = await this.colors.count;
    await t.expect(idx < optionsLength).ok();

    const el = this.colors.nth(idx);
    await t.click(el);
    await t.expect(el.find("input[type=radio]").checked).ok();
  }

  async chooseSize(size) {
    size = size.toUpperCase();
    const optionsLength = await this.sizes.count;

    for (let i = 0; i < optionsLength; i++) {
      const sizeEl = this.sizes.nth(i);
      const radioEl = sizeEl.find("input[type=radio]");
      const valueEl = sizeEl.find(".checkmark");

      const option = await valueEl.innerText;
      if (option == size) {
        await t.click(sizeEl);
        await t.expect(radioEl.checked).ok();
      }
    }
  }

  async chooseQuantity(quantity) {
    let chosenQuantity;
    const maximumQuantity = 44;
    const minimumQuantity = 1;

    if (chosenQuantity > maximumQuantity) {
      chosenQuantity = maximumQuantity;
    } else if (chosenQuantity < minimumQuantity) {
      chosenQuantity = minimumQuantity;
    } else {
      chosenQuantity = quantity;
    }

    await t.typeText(this.quantityInput, quantity, { replace: true });
  }

  async increaseQuantity(times = 1) {
    if (times == 1) {
      await t.click(this.quantityIncrease);
    } else if (times > 0) {
      for (let i = 0; i < times; i++) {
        await t.click(this.quantityIncrease);
      }
    }
  }

  async decreaseQuantity(times = 1) {
    if (times == 1) {
      await t.click(this.quantityDecrease);
    } else if (times > 0) {
      for (let i = 0; i < times; i++) {
        await t.click(this.quantityDecrease);
      }
    }
  }

  async addToCart() {
    await t.click(this.addToCartBtn);
  }

  async getCurrentAttributeUsingRadio(els) {
    // this function use to get color and size
    const numOfEls = await els.count;

    for (let i = 0; i < numOfEls; i++) {
      const el = els.nth(i);
      const radioEl = el.child("input[type=radio]");
      const isChecked = await radioEl.checked;
      if (!isChecked) continue;
      return radioEl;
    }
    return null;
  }

  async getInfo() {
    const result = {};

    result["name"] = await this.name.innerText;
    result["price"] = await this.price.innerText;
    result["quantity"] = await this.quantityInput.value;

    const colorEl = await this.getCurrentAttributeUsingRadio(this.colors);
    const color = !colorEl ? null : await colorEl.value;
    result["color"] = colorData[color];

    const sizeEl = await this.getCurrentAttributeUsingRadio(this.sizes);
    const size = !sizeEl ? null : await sizeEl.value;
    result["size"] = size.toUpperCase();

    return result;
  }


  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default new Product();
