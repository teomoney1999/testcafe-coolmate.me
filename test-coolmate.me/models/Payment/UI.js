import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

export class SelectBox {
  constructor(el) {
    this.select = el;
    this.options = null;
  }

  async setOptions() {
    await t.click(this.select);
    this.options = this.select.child("ul").find("li");
  }

  async choose(text) {
    await t.click(this.options.withText(text));
  }
}

export class Radio {
  constructor(attr) {
    this.label = Selector(".payment-method__item").withAttribute("for", attr);
  }

  async choose() {
    await t.click(this.label);
  }
}
