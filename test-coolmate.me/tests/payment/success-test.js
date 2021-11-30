import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";
import successPage from "../../models/Payment/SuccessPage";
const { Selector, t } = testCafe;


fixture`Test Success Model`.page`https://www.coolmate.me//checkout/success?success=1&name=Quoc+Anh&price=153000&text_method=COD&order_code=61a08ed5890bee635318c59e`;

test("Test Model Attributes", async (t) => {
    successPage.attributesCheck(); 
    successPage.setInfo();
});