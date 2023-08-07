import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm /> works correctly', () => {
  test('the form calls the event handler and recieve the right details', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('title of the blog')
    const inputAuthor = screen.getByPlaceholderText('name of the author')
    const inputUrl = screen.getByPlaceholderText('url of the blog')

    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'testing the addition of a title...')
    await user.type(inputAuthor, 'testing the addition of the author...')
    await user.type(inputUrl, 'testing the addition of the url...')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing the addition of a title...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing the addition of the author...')
    expect(createBlog.mock.calls[0][0].url).toBe('testing the addition of the url...')
  })

})