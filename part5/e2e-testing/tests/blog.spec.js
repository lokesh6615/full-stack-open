const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, login } = require('./helper')

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
    await request.post('/api/users', {
      data: {
        name: 'Elon mask',
        username: 'Elon',
        password: 'mask',
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
    test('succeeds with correct credentials', async ({ page }) => {
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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Biggboss',
        'nagarjuna',
        'http://Biggboss.com/',
        'Matti Luukkainen'
      )
      await expect(page.getByText('Blob added successfull')).toBeVisible()
      await expect(page.getByText('Biggboss nagarjuna')).toBeVisible()
    })
  })
  describe('when blog is created', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
    })
    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'Biggboss',
        'nagarjuna',
        'http://Biggboss.com/',
        'Matti Luukkainen'
      )
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('the user who added the blog can delete the blog', async ({
      page,
    }) => {
      await createBlog(
        page,
        'Biggboss',
        'nagarjuna',
        'http://Biggboss.com/',
        'Matti Luukkainen'
      )
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Biggboss nagarjuna')).not.toBeVisible()
    })
    test("only the user who added the blog sees the blog's delete button", async ({
      page,
    }) => {
      await createBlog(
        page,
        'Biggboss',
        'nagarjuna',
        'http://Biggboss.com/',
        'Matti Luukkainen'
      )
      await page.getByRole('button', { name: 'logout' }).click()
      await login(page, 'Elon', 'mask')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'remove' })
      ).not.toBeVisible()
    })
  })
})
