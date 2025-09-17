import { render, screen } from '@testing-library/react'
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
