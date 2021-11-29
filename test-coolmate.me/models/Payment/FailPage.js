import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class FailPage {
  constructor() {
    this.container = Selector(".container");
    this.thankBoxSection = this.container.child(".thank-box");
    this.title = this.thankBoxSection.child("h2");   
  }
}

export default new FailPage();
