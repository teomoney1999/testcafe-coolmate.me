import testCafe from "testcafe";

const { t, Selector } = testCafe;

class Page {
  constructor() {
    this.nameInput = Selector("input").withAttribute(
      "data-testid",
      "name-input"
    );
    this.importantFeaturesLables = Selector("legend")
      .withExactText("Which features are important to you:")
      .parent()
      .child("p")
      .child("label");

    this.submitButton = Selector("button").withAttribute(
      "data-testid",
      "submit-button"
    );
  }

  async selectFeature(number) {
      await t.click(this.importantFeaturesLables.nth(number));
  }

  async clickSubmit() {
      await t.click(this.submitButton); 
  }

  async typeName(name, replace=false) {
      await t.typeText(this.nameInput, name, {replace});
  }
}

export default new Page();
