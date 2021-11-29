import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class SuccessPage {
  constructor() {
    this.container = Selector(".container");
    this.thankBoxSection = this.container.child(".thank-box");
    this.title = this.thankBoxSection.child("h1");
    this.toHomePage = this.thankBoxSection
      .child("a")
      .withAttribute("href", "/collections");

    this.boxEls = this.container.child(".box");

    this.orderInfoSection = this.boxEls.nth(0);
    this.orderCode = this.orderInfoSection
      .child(".grid")
      .find(".grid__column")
      .nth(1)
      .child(".order-title");
    this.table = this.orderInfoSection.child(".table");
    this.totalPayment = this.table
      .child("tfoot")
      .child(".total_payment")
      .find("td")
      .nth(1);

    this.receiverInfo = this.boxEls.nth(1);
    this.infoEls = this.receiverInfo.find("p");
  }

  async setInfo() {
    const infoElsLength = await this.infoEls.count;
    const keys = ["fullname", "email", "phone", "methodOptions", "address"];

    for (let i = 0; i < infoElsLength; i++) {
      this[keys[i]] = this.infoEls.nth(i);
    }
  }

  async toHomePage() {
    await t.click(this.toHomePage); 
  }

  async attributesCheck() {
    const self = this;
    await helper.attributesCheck(self);
  }
}

export default new SuccessPage();
