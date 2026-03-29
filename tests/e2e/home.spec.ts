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

test("allows secure property view when scope is valid", async ({ page }) => {
  await page.goto(
    "/secure/properties/property-a?tenant_id=tenant-a&user_id=user-1&role=client&claims_tenant_id=tenant-a&property_scope=property-a",
  );

  await expect(page.getByText("Access granted")).toBeVisible();
  await expect(page.getByText("Property property-a")).toBeVisible();
  await expect(page.getByText("property.read")).toBeVisible();
});

test("shows forbidden guidance when property scope is invalid", async ({
  page,
}) => {
  await page.goto(
    "/secure/properties/property-a?tenant_id=tenant-a&user_id=user-1&role=client&claims_tenant_id=tenant-a&property_scope=property-z",
  );

  await expect(page.getByText("Access blocked")).toBeVisible();
  await expect(page.getByText("Property out of scope")).toBeVisible();

  await page.getByRole("link", { name: "Open guidance page" }).click();
  await expect(page).toHaveURL(/\/forbidden\?/);
  await expect(page.getByText("Forbidden guidance")).toBeVisible();
  await expect(page.getByText("Tenant", { exact: true })).toBeVisible();
});
