import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlobForm from './BlobForm'
import { vi } from 'vitest'

test('calling handleFormSubmit when blob form is submitted', async () => {
  const handleSubmit = vi.fn()
  render(<BlobForm createNew={handleSubmit} />)

  const user = userEvent.setup()
  const saveButton = screen.getByText('create')

  const titleInput = screen.getByPlaceholderText('enter title...')
  const authorInput = screen.getByPlaceholderText('enter author name...')
  const urlInput = screen.getByPlaceholderText('enter url...')

  await user.type(titleInput, 'Atomic model')
  await user.type(authorInput, 'ruthorford')
  await user.type(urlInput, 'https://model.com/')

  await user.click(saveButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)

  const submittedData = handleSubmit.mock.calls[0][0]
  expect(submittedData.title).toBe('Atomic model')
  expect(submittedData.author).toBe('ruthorford')
  expect(submittedData.url).toBe('https://model.com/')
})
