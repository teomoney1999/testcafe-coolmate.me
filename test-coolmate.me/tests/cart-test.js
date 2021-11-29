import testCafe from "testcafe";
import url from "../config.json";
import xPathSelector from "../helpers/xpath-selector";
import cart from "../models/Cart/Cart";
const { Selector, t } = testCafe;

fixture`Test Cart Model`.page`${url.cart}`;

test.before(async (t) => {
  await t.navigateTo(
    "https://www.coolmate.me/product/quan-nam-all-week-jogger?color=%C4%90en"
  );

  const chooseColor1 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[1]/div[2]/label[1]'
  );
  const chooseSize1 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[1]/div[4]/label[2]'
  );
  const addToCart1 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[2]/div[2]/a'
  );

  await t.click(chooseColor1).click(chooseSize1).click(addToCart1);

  await t.navigateTo(
    "https://www.coolmate.me/product/ao-ni-nam-casual-sweatshirt?color=Xanh%20r%C3%AAu%20Nh%E1%BA%A1t"
  );
  const chooseColor2 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[1]/div[2]/label[1]'
  );
  const chooseSize2 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[1]/div[4]/label[2]'
  );
  const addToCart2 = xPathSelector(
    '//*[@id="site-wrapper"]/main/section[1]/div/div[2]/div[2]/div/div[2]/form/div[2]/div[2]/a'
  );
  await t.click(chooseColor2).click(chooseSize2).click(addToCart2);
})("Test Model Attributes", async (t) => {
  await t.navigateTo(url.cart);

  await cart.setProductsList();

  await t.expect(cart.productsList.length).eql(2);

  const product = cart.productsList[0];
  await t.expect(product.name.innerText).eql("Quần nam Jogger Sweatpants");

  await t
    .expect(cart.subTotal.innerText)
    .eql("568.000đ")
    .expect(cart.total.innerText)
    .eql("568.000đ")
    .expect(cart.deliveryFee.innerText)
    .eql("Miễn phí")
    .click(product.deleteBtn);

  cart.deleteProductFromCart(0);

  await t.expect(cart.productsList.length).eql(1);
});
