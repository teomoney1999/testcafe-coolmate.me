import TestCafe from "testcafe";

const { Selector, t } = TestCafe;

const LabelEl = Selector("label");
const SelectEl = Selector("select");

class ExamplePage {
  constructor() {
    this.nameInput = Selector("#developer-name");
    this.featuresList = [
      new Checkbox("Support for testing on remote devices"),
      new Checkbox("Re-using existing JavaScript code for testing"),
      new Checkbox(
        "Running tests in background and/or in parallel in multiple browsers"
      ),
      new Checkbox("Easy embedding into a Continuous integration system"),
      new Checkbox("Advanced traffic and markup analysis"),
    ];

    this.osList = [
      new Radio("Windows"),
      new Radio("MacOS"),
      new Radio("Linux"),
    ];

    this.tryTestCafe = new Checkbox("I have tried TestCafe");
    this.slider = {
      handle: Selector(".ui-slider-handle"),
      tick: Selector(".slider-values"),
    };

    this.preferedInterface = new Select("#preferred-interface");

    this.submitButton = Selector("#submit-button");
    this.articleHeader = Selector("#article-header");
  }

  async submitName(name) {
    await t
      .typeText(this.nameInput, name)
      .click(this.submitButton)
      .expect(this.articleHeader.innerText)
      .eql(`Thank you, ${name}!`);
  }

  async checkboxTest(idxList) {
    if (idxList) {
      for (let i of idxList) {
        const feature = this.featuresList[i];
        await t.click(feature.label).expect(feature.checkbox.checked).ok();
      }
    } else {
      for (const feature of this.featuresList) {
        await t.click(feature.label).expect(feature.checkbox.checked).ok();
      }
    }
  }

  async selectTest(idx = 0) {
    const chosenInterface = this.preferedInterface.options.nth(idx);
    await t.click(this.preferedInterface.select).click(chosenInterface).expect(chosenInterface.selected).ok();
  }

  async radioTest(idx = 0) {
    const chosenOS = this.osList[idx];
    await t.click(chosenOS.label).expect(chosenOS.radio.checked).ok();
  }
}

class Checkbox {
  constructor(text) {
    this.label = LabelEl.withText(text);
    this.checkbox = this.label.find("input[type=checkbox]");
  }
}

class Radio {
  constructor(text) {
    this.label = LabelEl.withText(text);
    this.radio = this.label.find("input[type=radio]");
  }
}

class Select {
  constructor(id) {
    this.select = Selector(id);
    this.options = this.select.find("option");
  }
}

export default new ExamplePage();
