import testCafe from "testcafe";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class CollectionCell {
  constructor(grid) {
    this.grid = grid;
    this.productGrid = this.grid.child(".product-grid");

    this.thumbnail = this.productGrid.child(".product-grid__thumbnail");
    this.saleTag = this.thumbnail.find(".product-grid__tags");
    this.reviews = this.thumbnail.child(".product-grid__reviews");
    this.rating = this.reviews.child(".reviews-rating");
    this.ratingNumber = this.rating.child(".reviews-rating__number");

    this.content = this.productGrid.child(".product-grid__content");
    this.title = this.content.child(".product-grid__title").child("a");
    this.price = this.content.child(".product-grid__prices").child("ins");
  }

  async toProduct() {
    await t.expect(this.title.exists).ok().click(this.title);
  }

  async attributesCheck() {
    await helper.attributesCheck(this);
  }
}

export default CollectionCell;