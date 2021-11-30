import testCafe from "testcafe";
import url from "../../../config.json";
import xPathSelector from "../../../helpers/xpath-selector";
import collectionPage from "../../../models/Collections/Collections";

import collectionSearchData from "../../../data/Search/CollectionSearch.json";

const { Selector, t, ClientFunction } = testCafe;

const resultTakenNums = 5;

fixture.beforeEach(async () => {})`Test Collection Page`
  .page`${url.collections}`;

test("TC_TK2_001", async (t) => {
  const task = "TC_TK2_001";
  const keywords = collectionSearchData[task].keywords;
  await t
    .typeText(collectionPage.searchBar, keywords[0])
    .click(collectionPage.searchBtn)
    .wait(500);

  await collectionPage.setCollectionsCells();

  const 

  for (let i = 0; i < resultTakenNums; i++) {
    
  }
});
