import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
// import {
//   click,
//   typeText,
//   attributesCheck,
//   eqlText,
//   setListFromEls,
// } from "../../ts/common-action";
import helper from "../../ts/common-action";
const { Selector, t } = testCafe;

class FilterSelect {
  constructor(item) {
    this.select = item;
    this.selectArea = this.select.child(".custom-select");

    this.displaySelect = this.selectArea.child("select");
    this.displayOption = this.displaySelect.find("option");

    // What display on select bar
    this.selected = this.selectArea.child(".select-selected");

    this.selectWrapper = this.selectArea.child(".select-items");
    this.selectMulitipleItems = this.selectWrapper.find("label");
    this.selectSingleItems = this.selectWrapper.find("div"); // Bán chạy
  }

  async choose(idxs) {
    if (!Array.isArray(idxs)) return;
    // const indexs = idxs.filter((idx) => idx != 0);
    if (!idxs.length) return;

    if (idxs.length > 1) {
      for (let i = 0; i < idxs.length; i++) {
        await t.click(this.selectArea); // Click to make select options appear
        await t.click(this.selectMulitipleItems.nth(i));
      }
      return;
    }

    // length = 1
    await t.click(this.selectArea); // Click to make select options appear
    const selectSingleItemsExists = await this.selectSingleItems.exists,
      itemIdx = idxs[0];

    if (selectSingleItemsExists) {
      await t.click(this.selectSingleItems.nth(itemIdx));
    } else {
      await t.click(this.selectMulitipleItems.nth(itemIdx));
    }
  }
  
  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default FilterSelect;