import { expect, test } from "@playwright/test";

test("homepage renders baseline runtime", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "AL Guard Concierge" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Health endpoint" }),
  ).toBeVisible();
});

test("health API returns ok", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();

  const payload = await response.json();
  expect(payload).toMatchObject({ status: "ok" });
});
