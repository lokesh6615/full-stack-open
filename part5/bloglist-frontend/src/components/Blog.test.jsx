import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('display only tile and url initially , likes and url are hidden', () => {
  const blog = {
    title: 'Atomic model',
    author: 'rutherford',
    url: 'http://atomicmodel.com',
    likes: 1000,
  }

  const { container } = render(<Blog blog={blog} />)

  const element = screen.getByText('Atomic model rutherford', { exact: false })
  expect(element).toBeDefined()
  const element2 = container.querySelector('.details')
  expect(element2).toHaveStyle({ display: 'none' })
})

test('url and likes are displayed when view button is clicked', async () => {
  const blog = {
    title: 'Atomic model',
    author: 'rutherford',
    url: 'http://atomicmodel.com',
    likes: 1000,
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const details = container.querySelector('.details')
  expect(details).not.toHaveStyle({ display: 'none' })
})
