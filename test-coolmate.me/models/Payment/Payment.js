import testCafe from "testcafe";
import { Radio, SelectBox } from "./UI";
import xPathSelector from "../../helpers/xpath-selector";
import helper from "../../helpers/common-action";
const { Selector, t } = testCafe;

class PaymentPage {
  constructor() {
    this.paymentSection = xPathSelector(
      '//*[@id="site-wrapper"]/div/div/div/div[1]'
    ).child(".cart-section");

    this.infoArea = this.paymentSection.nth(0);
    this.title = this.infoArea.child(".title-with-actions").child(".title");

    this.info = this.infoArea.child("#customer-info-block");
    this.rows = this.info.find(".grid");

    this.firstRow = this.rows.nth(0);
    this.firstRowEls = this.firstRow.child(".grid__column");

    this.firstRowEls1 = this.firstRowEls.nth(0);
    this.fullname = this.firstRowEls1.child("input");
    this.fullnameError = this.firstRowEls1.child(".error-text");

    this.firstRowEls2 = this.firstRowEls.nth(1);
    this.phone = this.firstRowEls2.child("input");
    this.phoneError = this.firstRowEls2.child(".error-text");

    this.secondRow = this.rows.nth(1);
    this.secondRowEls = this.secondRow.child(".grid__column");

    this.secondRowEls1 = this.secondRowEls.nth(0);
    this.email = this.secondRowEls1.child("input");
    this.emailError = this.secondRowEls1.child(".error-text");

    this.secondRowEls2 = this.secondRowEls.nth(1).child(".address-block");
    this.address = this.secondRowEls2.child("input");
    this.addressError = this.secondRowEls2.child(".error-text");

    this.thirdRow = this.rows.nth(2);
    this.thirdRowEls = this.thirdRow.find(".grid__column");

    this.province = new SelectBox(
      this.thirdRowEls.nth(0).child("div").withAttribute("name", "nhanh_city")
    );
    this.provinceNoOption = xPathSelector('//*[@id="vs2__listbox"]/li');
    this.district = new SelectBox(
      this.thirdRowEls
        .nth(1)
        .child("div")
        .withAttribute("name", "nhanh_district")
    );
    this.districtNoOption = xPathSelector('//*[@id="vs2__listbox"]/li');
    this.ward = new SelectBox(
      this.thirdRowEls.nth(2).child("div").withAttribute("name", "nhanh_ward")
    );
    this.wardNoOption = xPathSelector('//*[@id="vs3__listbox"]/li');

    this.forthRow = this.rows.nth(3);
    this.forthRowEls = this.forthRow.child(".grid__column");
    this.customerNote = this.forthRowEls.child("input");

    this.methodArea = this.paymentSection.nth(1);
    this.methodTitle = this.methodArea.child(".title");
    this.methodOptions = [
      new Radio("payment-zalopay"),
      new Radio("payment-COD"),
      new Radio("payment-momo"),
      new Radio("payment-shopeepay"),
      new Radio("payment-foxpay"),
    ];

    this.paymentBtn = this.paymentSection.nth(2).child("button");
  }

  async fillInfo(infoObj) {
    // Handle <input>
    for (const key in infoObj) {
      // Handle Radio
      if (key == "methodOptions") {
        // { methodOptions : idx }
        console.log("infoObj[key]", infoObj[key]);
        await this[key][infoObj[key]].choose();
        continue;
      }

      // Handle SelectBox
      if (key == "province" || key == "district" || key == "ward") {
        // { province : "Ha Noi" }
        await this[key].setOptions();
        await this[key].choose(infoObj[key]);
        continue;
      }

      if (this.hasOwnProperty(key)) {
        if (!infoObj[key]) continue;
        await t.typeText(this[key], infoObj[key]);
      }
    }
  }

  async clickToPay() {
    await t.click(this.paymentBtn);
  }

  async attributesCheck() {
    const self = this;
    await helper.attributesCheck(this);
  }
}

export default new PaymentPage();
