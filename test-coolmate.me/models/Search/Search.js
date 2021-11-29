import testCafe from "testcafe";
import SpotlightSearchRow from "./_SpotlightRow";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class Search {
  constructor() {
    this.searchIcon = xPathSelector(
      '//*[@id="site-wrapper"]/header/div[2]/div/div[3]/div[1]/a'
    );
    this.headerSearch = Selector(".header-search").withAttribute(
      "rel-script",
      "header-search-content"
    );
    this.wrapper = this.headerSearch
      .child("form")
      .child(".header-search__wrapper");
    this.input = this.wrapper.child("label").child("input");
    this.searchBtn = this.wrapper
      .child(".header-search__filter")
      .child("button");

    this.spotlightWrapper = this.headerSearch
      .child("div")
      .child("div")
      .withAttribute("rel-script", "spotlight-search");
    this.spotlightSearchEl = this.spotlightWrapper.find("a");
    this.spotlightSearch = [];
  }

  async setSpotlightSearch() {
    const spotlightSearch = setListFromEls(
      spotlightSearchEl,
      SpotlightSearchRow
    );
    this.spotlightSearch = spotlightSearch;
  }

  async find(text) {
    await t.click(this.searchIcon);

    await t.typeText(this.input, text, { replace: true });
    // Type in search bar and get spotlight search
    await this.setSpotlightSearch();

    await t.pressKey("enter");
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default new Search();
