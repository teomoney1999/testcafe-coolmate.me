import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class FilterTag {
  constructor(item) {
    this.name = item.child(".filter-tags__text");
    this.deleteBtn = item.child(".filter-tags__remove");
  }

  async delete() {
    await t.click(this.deleteBtn);
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default FilterTag;
