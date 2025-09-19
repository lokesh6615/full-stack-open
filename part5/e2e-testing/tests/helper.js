const login = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByTestId('userName').fill(`${username}`)
  await page.getByTestId('password').fill(`${password}`)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url, user) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByPlaceholder('enter title...').fill(title)
  await page.getByPlaceholder('enter author name...').fill(author)
  await page.getByPlaceholder('enter url...').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

module.exports = { login, createBlog }
