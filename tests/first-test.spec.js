const { test, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/login.page");

test.use({
  viewport: { width: 1280, height: 720 },
});

test.describe("SauceDemo Test Suite", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Verify Products Page", async ({ page }) => {
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Verify Add to Cart", async ({ page }) => {
    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });
});
test("Verify Product Sorting", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await page.locator(".product_sort_container").selectOption("lohi");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map((price) => Number(price.replace("$", "")));
  for (let i = 0; i < numericPrices.length - 1; i++) {
    expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
  }

  expect(numericPrices[0]).toBeLessThanOrEqual(numericPrices[1]);
});
test("Verify Products Count", async ({ page }) => {
  page.on("console", (msg) => console.log("BROWSER:", msg.text()));

  console.log("Playwright Test Started");
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("BROWSER ERROR:", msg.text());
    }
  });
  page.on("requestfailed", (request) => {
    console.log("FAILED REQUEST:", request.url());
  });
  // یہاں website کھولیں
  await page.goto("https://www.saucedemo.com/");
  // یہاں login کریں
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  // یہاں چیک کریں کہ Products کی تعداد 6 ہے
  await expect(page.locator(".inventory_item")).toHaveCount(6);
  const firstProduct = page.locator(".inventory_item").nth(0);
  await expect(firstProduct).toBeVisible();
  await expect(firstProduct.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack"
  );
  const secondProduct = page.locator(".inventory_item").nth(1);
  await expect(secondProduct.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Bike Light"
  );
  await secondProduct.locator("button").click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  await secondProduct.locator("button").click();
  await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
});
