import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class ProductRow {
  constructor(row) {
    /** CHECKED */
    this.deleteBtn = row.child(".cart-item__remove");

    this.rowLeft = row.child(".cart__column-left");
    this.quantity = this.rowLeft
      .child("div")
      .child(".cart-item__thumbnail-quantity");

    this.rowRight = row.child(".cart__column-right").child(".cart-item__block");

    this.infoArea = this.rowRight.child(".cart-item__info");
    this.name = this.infoArea.child("a");
    this.colorAndSize = this.infoArea.child(".cart-item__variant");

    this.actionArea = this.rowRight.child(".cart-item__actions");

    this.optionArea = this.actionArea.find("div").nth(0);
    this.optionEls = this.optionArea.find("div").withAttribute("dir", "auto");

    this.color = new ComboBox(this.optionEls.nth(0));
    this.size = new ComboBox(this.optionEls.nth(1));

    this.actionBottomArea = this.actionArea.child(".cart-item__actions-bottom");
    this.quantityBox = this.actionBottomArea.child(".quantity-box");
    this.quantityInput = this.quantityBox.find("input");
    this.quantityIncrease = this.quantityBox.child(".quantity-box__increase");
    this.quantityDecrease = this.quantityBox.child(".quantity-box__decrease");

    this.price = this.actionBottomArea.child(".flex--column").child("span");
  }

  async adjustQuantity(btnEl = null, quantity = 1) {
    if (!btnEl) {
      await t.click(btnEl);
    } else {
      await t.typeText(this.quantity, quantity, { replace: true });
    }
  }

  async deleteRow() {
    await t.click(this.deleteBtn);
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }

  async optionsCheck() {
    const chosenOption = this.colorAndSize;
    const comboboxColor = await this.color.options.withAttribute(
      "class",
      "vs__dropdown-option--selected"
    ).innerText;
    const comboboxSize = await this.size.options.withAttribute(
      "class",
      "vs__dropdown-option--selected"
    ).innerText;

    await t.expect(`${comboboxColor} / ${comboboxSize}`).eql(chosenOption);
  }
}

class ComboBox {
  constructor(el) {
    this.select = el;
    this.options = el.child("ul").find("li");
    this.current = el.child("div").child(".vs__selected-options").child("span");
  }

  async choose(text) {
    await t.click(this.select).click(this.options.withText(text));
  }
}

export default ProductRow;
