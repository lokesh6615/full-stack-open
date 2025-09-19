const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await page.goto('http://localhost:5173/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByLabel('User Name:')).toBeVisible()
    await expect(page.getByLabel('Password:')).toBeVisible()
  })

  describe('Login', () => {
    test('success with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('User Name:').fill('mluukkai')
      await page.getByLabel('Password:').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByLabel('User Name:').fill('mluukkai')
      await page.getByLabel('Password:').fill('salai')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Invalid credentials')).toBeVisible()
    })
  })
})
