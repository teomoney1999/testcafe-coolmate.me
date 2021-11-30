import testCafe from "testcafe";
import url from "../../config.json";
import xPathSelector from "../../helpers/xpath-selector";
import searchBar from "../../models/Search/Search";
import searchBarData from "../../data/Search/SearchBar.json";
import searchNoti from "../../data/Search/Notifications.json";
import helper from "../../helpers/test-action";
import productUrl from "../../data/Products/URL.json";

const { Selector, t, ClientFunction } = testCafe;

fixture`Test Search Page`.page`${url.home}`;
const waitTime = 500;

test("TC_TK1_001", async (t) => {
  const task = "TC_TK1_001";
  const keywords = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keywords[0], { replace: true })
    .wait(waitTime); // lowercase with sign

  await searchBar.attributesCheck();
  await searchBar.setSpotlightSearch();

  const lowercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
    foundProductName: await helper.getNameFromSpotlight(
      searchBar.spotlightSearch
    ),
  };

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keywords[1], { replace: true })
    .wait(waitTime); // uppercase with sign

  await searchBar.setSpotlightSearch();

  const uppercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
    foundProductName: helper.getNameFromSpotlight(searchBar.spotlightSearch),
  };

  await t
    .expect(lowercaseSearch.suggestionNumber)
    .eql(uppercaseSearch.suggestionNumber);

  for (let i = 0; i < lowercaseSearch.suggestionNumber; i++) {
    await t
      .expect(lowercaseSearch.foundProductName[i])
      .eql(uppercaseSearch.foundProductName[i]);
  }
});

test("TC_TK1_002", async (t) => {
  const task = "TC_TK1_002";
  const keywords = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keywords[0], { replace: true })
    .wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  const lowercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
    foundProductName: await helper.getNameFromSpotlight(
      searchBar.spotlightSearch
    ),
  };

  await t
    .typeText(searchBar.input, keywords[1], { replace: true })
    .wait(waitTime); //  without sign

  await searchBar.setSpotlightSearch();

  const uppercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
    foundProductName: helper.getNameFromSpotlight(searchBar.spotlightSearch),
  };

  await t
    .expect(lowercaseSearch.suggestionNumber)
    .eql(uppercaseSearch.suggestionNumber);

  for (let i = 0; i < lowercaseSearch.suggestionNumber; i++) {
    await t
      .expect(lowercaseSearch.foundProductName[i])
      .eql(uppercaseSearch.foundProductName[i]);
  }
});

test("TC_TK1_003", async (t) => {
  const task = "TC_TK1_003";
  const keyword = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  //   await t.expect(searchBar.spotlightSearch.length).notEql(0);
  await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);
});

test("TC_TK1_004", async (t) => {
  const task = "TC_TK1_004";
  const keyword = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  await t.expect(searchBar.spotlightSearch.length).notEql(0);
});

test("TC_TK1_005", async (t) => {
  const task = "TC_TK1_005";
  const keyword = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime);

  await searchBar.setSpotlightSearch();

  //   await t.expect(searchBar.spotlightSearch.length).notEql(0); // still give suggestion even though type wrong product name
  await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);
});

test("TC_TK1_006", async (t) => {
  const task = "TC_TK1_006";
  const keyword = searchBarData[task].keywords;

  await t.click(searchBar.searchIcon).wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  await t.expect(searchBar.spotlightSearch.length).notEql(0); // still give suggestion even though type wrong product name
  // await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);
});

test("TC_TK1_007", async (t) => {
  const task = "TC_TK1_007";
  const keyword = searchBarData[task].keywords;

  await t.click(searchBar.searchIcon).wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  await t.expect(searchBar.spotlightSearch.length).notEql(0); // still give suggestion even though type nothing
  // await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);
});

test("TC_TK1_008", async (t) => {
  const task = "TC_TK1_008";
  const keyword = searchBarData[task].keywords;
  const spotlightKeys = ["img", "name", "price"];

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  for (const key of spotlightKeys) {
    // only check one row
    await t.expect(searchBar.spotlightSearch[0][key].exists).ok();
  }
});

test("TC_TK1_009", async (t) => {
  const task = "TC_TK1_009";
  const keyword = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime); //  with sign

  await searchBar.setSpotlightSearch();

  await t.expect(searchBar.spotlightSearch.length).eql(5);
});

// Can not check because can not find product that out of stock
// test("TC_TK1_010", async (t) => {
//     const task = "TC_TK1_010";
//     const keyword = searchBarData[task].keywords;

//     await t
//       .click(searchBar.searchIcon)
//       .typeText(searchBar.input, keyword, { replace: true })
//       .wait(waitTime); //  with sign

//     await searchBar.setSpotlightSearch();

//     await t.expect(searchBar.spotlightSearch.length).eql(5);
//   });

test("TC_TK1_011", async (t) => {
  const task = "TC_TK1_011";
  const keyword = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .wait(waitTime);

  await searchBar.setSpotlightSearch();
  //   await t.expect(searchBar.spotlightSearch.length).notEql(0); // still give suggestion even though type wrong product name
  await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);
});

test("TC_TK1_012", async (t) => {
  const task = "TC_TK1_012";
  const keywords = searchBarData[task].keywords;

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keywords[0], { replace: true }); // product name

  await searchBar.setSpotlightSearch();

  const lowercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
  };

  await t.typeText(searchBar.input, keywords[1], { replace: true }); // reverse product name

  await searchBar.setSpotlightSearch();

  const uppercaseSearch = {
    suggestionNumber: searchBar.spotlightSearch.length,
  };

  await t.expect(searchBar.notify.innerText).eql(searchNoti.notFound);

  await t
    .expect(lowercaseSearch.suggestionNumber)
    .notEql(uppercaseSearch.suggestionNumber);
});

// test("TC_TK1_013", async (t) => {
//     const task = "TC_TK1_013";
//     const keywords = searchBarData[task].keywords;

//   });

test("TC_TK1_014", async (t) => {
  const task = "TC_TK1_014";
  const keyword = searchBarData[task].keywords;
  const getPageUrl = ClientFunction(() => window.location.href.toString());

  await t
    .click(searchBar.searchIcon)
    .typeText(searchBar.input, keyword, { replace: true })
    .pressKey("enter");

  await t.expect(getPageUrl()).contains(productUrl.CollectionsPage);
});
