import testCafe from "testcafe";
import CollectionCell from "./_CollectionCell";
import FilterSelect from "./_FilterSelect";
import FilterTag from "./_FilterTags";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";

const { Selector, t } = testCafe;

class Collections {
  constructor() {
    this.siteCollections = Selector(".site-collections");

    // FILTER SECTION
    this.filterSection = this.siteCollections.child(".collections-filter");
    this.filterWrapper = this.filterSection
      .child("div")
      .child(".collections-filter__wrapper");

    this.filterLeftArea = this.filterWrapper.child(
      ".collections-filter__inner"
    );
    this.filterLeftWrapper = this.filterLeftArea
      .child(".filter-search")
      .child("form");
    this.searchBar = this.filterLeftWrapper.child("input");
    this.searchBtn = this.filterLeftWrapper.child("button");

    this.filterRightArea = this.filterWrapper.child(
      ".collections-filter__selects"
    );
    this.filterRightWrapper = this.filterRightArea.child(".filter-select");
    this.filterSelectEls = this.filterRightWrapper.find(".filter-select__item");
    this.filterSelects = [];

    // FILTER TAGS SECTION
    this.filterTagsSection = this.siteCollections.child(".filter-tags");
    this.filterTagsWrapper = this.filterTagsSection
      .child("div")
      .child(".filter-tags__wrapper");
    this.filterTagsItemsEl = this.filterTagsWrapper.find(".filter-tags__item");
    this.filterTagsItems = [];
    this.clearFilterBtn = xPathSelector(
      '//*[@id="site-wrapper"]/main/div[2]/div/div/div[3]'
    ).child("a");

    // COLLECTION SECTION
    this.collectionsSection = this.siteCollections.child(
      ".collections-listings"
    );
    this.collectionsWrapper = this.collectionsSection.child("div");
    this.collectionsList = this.collectionsWrapper
      .find("div")
      .withAttribute("id", "productList")
      .nth(0);
    this.collectionsCellEls = this.collectionsList.find(".grid__column");
    this.collectionsCells = [];
  }

  /** PRIVATE METHODS */

  async setFilterSelect(el) {
    const filterSelects = await helper.setListFromEls(
      this.filterSelectEls,
      FilterSelect
    );
    this.filterSelects = filterSelects;
  }

  async setCollectionsCells() {
    const collectionsCells = await helper.setListFromEls(
      this.collectionsCellEls,
      CollectionCell
    );
    collectionsCells.splice(0, 1); // delete the first element
    collectionsCells.pop();

    this.collectionsCells = collectionsCells;
  }

  async setFilterTags() {
    const filterTagsItems = await helper.setListFromEls(
      this.filterTagsItemsEl,
      FilterTag
    );
    this.filterTagsItems = filterTagsItems;
  }
  ////////////////////////////

  async initCollections() {
    await this.setFilterSelect();
    await this.setCollectionsCells();
    // await this.setFilterTags();
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default new Collections();
