import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import { click, typeText, exists, eqlText } from "../../helpers/common-action";
const { Selector, t } = testCafe;

class SpotlightSearchRow {
  constructor(row) {
    this.row = row;
    this.img = row.child(".product-search__thumbnail").child("img");
    this.content = row.child(".product-search__content");
    this.name = this.content.child(".product-search__title");
    this.price = this.content.child(".product-search__prices");
  }

  async click() {
    await t.click(this.row);
  }
}
export default SpotlightSearchRow;
