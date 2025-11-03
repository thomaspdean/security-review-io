import { test, expect } from "@playwright/test";

test.describe("Home and Problems Flow", () => {
  test("loads home page, navigates to problems, and views problem detail", async ({
    page,
  }) => {
    // Navigate to home page
    await page.goto("/");

    // Check that hero section is present
    await expect(page.locator("h1")).toContainText("Security Code Review");

    // Check for CTA button
    const browseButton = page.getByRole("link", { name: /browse problems/i });
    await expect(browseButton).toBeVisible();

    // Navigate to problems page
    await browseButton.click();
    await expect(page).toHaveURL(/\/problems/);

    // Check that problems page loaded
    await expect(page.locator("h1")).toContainText("Problems");

    // Check that problem cards are visible
    const problemCards = page.locator('[href^="/problems/"]');
    await expect(problemCards.first()).toBeVisible();

    const cardCount = await problemCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Click on the first problem card
    await problemCards.first().click();

    // Check that we're on a problem detail page
    await expect(page).toHaveURL(/\/problems\/[^/]+/);

    // Check that problem detail page has expected elements
    await expect(page.locator("h1")).toBeVisible(); // Problem title
    await expect(page.getByRole("button", { name: /start review/i })).toBeVisible();
  });
});

