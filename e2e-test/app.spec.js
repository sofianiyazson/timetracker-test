import { test, expect } from '@playwright/test';

test('Check that all expected data is present', async ({ page }) => {
  await page.goto('http://localhost:3001');

  // Verify that the title is correct
  await expect(page).toHaveTitle('React App');

  // start timer

  // asserting pause button is not displayed
  expect(page.getByTestId('pauseBtnSpan2')).toHaveCSS('display', 'none');

  // clicking on play button
  await page.getByTestId('startBtn2').click();
  expect(page.getByTestId('pauseBtnSpan2')).toHaveCSS('display', 'block');

  // assesting pause button is displayed
  const locator = page.locator('id=overview');

  await expect(locator).toBeVisible();

  await locator.click();

  expect(await page.innerText('h1')).toBe('Overview');

  // creating project
  await page.getByText('Add New Project').click();
  await page.locator('[placeholder="Enter Task Name"]').fill('Dummy Task');
  await page
    .locator('[placeholder="Enter Project Name"]')
    .fill('Dummy Project');
  await page.getByText('Save changes').click();
  await expect(page.getByTestId('project-name-Dummy Project')).toHaveText([
    'Dummy Project',
  ]);

  // creating task
  await page.locator('id=taskLink').click();
  await page.locator('data-testid=add-task-button').click();

  await page.locator('[placeholder="Enter Task Name"]').fill('Dummy Task');
  await page
    .locator('[placeholder="Enter Project Name"]')
    .fill('Dummy Project');
  await page.getByText('Save changes').click();
  await expect(page.getByTestId('task-name-Dummy Task')).toHaveText([
    'Dummy Task',
  ]);
});
