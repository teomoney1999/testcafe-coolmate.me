import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";
import searchBar from "../../models/Search/Search";
const { Selector, t } = testCafe;

import helper from "../../helpers/test-action";


fixture`Test Search Page`.page`${url.home}`;

test("TC_TK2_001", async (t) => {
    const task = "TC_TK2_001"; 
    

});
