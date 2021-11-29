import TestCafe from "testcafe";

const { Selector, t } = TestCafe;

class CommonAction {
  async exists() {
    if (!el.exists) {
      console.log("=====el", el);
    }
    await t.expect(el.exists).ok();
  }
  async click() {
    await t.expect(el.exists).ok();
    await t.click(el);
  }

  async eqlText(el, text) {
    await t.expect(el.exists).ok();
    await t.expect(el.innerText).eql(text);
  }

  async typeText(el, value, replace = true) {
    await t.expect(el.exists).ok();
    await t.typeText(el, value, { replace });
  }

  // INIT COMPONENTS
  async setListFromEls(els, object) {
    const isElsExist = await els.exists; 
    if (!isElsExist) {
      console.log("Element does not exists!");
      return [];
    }

    const elsLength = await els.count;
    const results = [];
    for (let i = 0; i < elsLength; i++) {
      results.push(new object(els.nth(i)));
    }
    return results;
  }

  async attributesCheck(obj) {
    const keys = Object.keys(obj);
    for (const key of keys) {
      const existance = await obj[key].exists;
      if (!existance) {
        console.log("Not exist element with key", key);
      }
    }
  }
}

export default new CommonAction();

// INTERACT WITH THE PAGE FUNCTION
export const exists = async (el) => {
  if (!el.exists) {
    console.log("=====el", el);
  }
  await t.expect(el.exists).ok();
};

export const click = async (el) => {
  await t.expect(el.exists).ok();
  await t.click(el);
};

export const eqlText = async (el, text) => {
  await t.expect(el.exists).ok();
  await t.expect(el.innerText).eql(text);
};

export const typeText = async (el, value, replace = true) => {
  await t.expect(el.exists).ok();
  await t.typeText(el, value, { replace });
};

// INIT COMPONENTS
export const setListFromEls = async (els, object) => {
  await t.expect(els.exists).ok();
  const elsLength = await els.count;

  const results = [];
  for (let i = 0; i < elsLength; i++) {
    await t.expect(els.exists).ok();
    results.push(new object(els.nth(i)));
  }
  return results;
};

export const attributesCheck = async (obj) => {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const existance = await obj[key].exists;
    if (!existance) {
      console.log("Not exist element with key", key);
    }
  }
};
