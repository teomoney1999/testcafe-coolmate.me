import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";
import collections from "../models/Collection/Collections";
import { click, typeText, exists, eqlText } from "../../helpers/common-action";
const { Selector, t } = testCafe;

const data = {
  keyword: "Áo",
  size: [1, 2], // S, M
  sort: [1],
  collection: 2,
};

fixture.beforeEach(async () => {
  await collections.initCollections();
})`Test Collections Model`.page`${url.collections}`;

test("Test Model Attributes", async () => {


  await collections.filterSelects[0].choose(data.size);

  await collections.filterSelects[4].choose(data.sort);

  await collections.setFilterTags(); 

  await collections.filterTagsItems[0].delete();

//   await typeText(collections.searchBar, data.keyword);

//   await click(collections.searchBtn);

//   await collections.filterSelects[0].choose(data.size);

//   await collections.filterSelects[4].choose(data.sort);
    
//   await collections.filterTagsItems[0].delete();


//   await collections.collectionsCells[data.collection].attributesCheck();

//   await collections.collectionsCells[data.collection].toProduct();
  
});
