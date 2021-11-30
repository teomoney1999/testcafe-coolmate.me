import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";
import searchBar from "../../models/Search/Search";
const { Selector, t } = testCafe;


fixture`Test Payment Model`.page`${url.home}`;

test("TC_TK_001", async (t) => {
    const task = "TC_TK_001"; 
    await searchBar.find("Tank Top");
    // await t.expect(searchBar.input.exists).ok().typeText(searchBar.input, "Tank Top").click(searchBar.searchBtn);
    const spotlightLength = searchBar.spotlightSearch.length;
    console.log('=====spotlightLength', spotlightLength);
});
