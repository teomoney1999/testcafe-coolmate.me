import testCafe from "testcafe";
const { Selector } = testCafe;

const getElementsByXPath = Selector((xpath) => {
  const iterator = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  );
  const items = [];

  let item = iterator.iterateNext();

  while (item) {
    items.push(item);
    item = iterator.iterateNext();
  }

  return items;
});

export default function (xpath) {
  return Selector(getElementsByXPath(xpath));
}
