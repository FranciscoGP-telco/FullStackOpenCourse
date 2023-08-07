import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'

describe('<Blog /> only render blog title and author by default', () => {
  let container
  const blog = {
    title: 'New Final Fantaxy XVI trailer published in the E3',
    url: '/new-trailer-final-fantasy-XVI-E3',
    likes: 11,
    author: 'Francisco Garcia',
    id: '6498762a83b277a1901e977f'
  }

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='show'>
        <Blog key={blog.id} blog={blog}/>
      </Togglable>
    ).container
  })

  test('renders the blog', async () => {
    await screen.findAllByText('New Final Fantaxy XVI trailer published in the E3')
  })


  test('at the begin the blog detailts arent displayed', () => {
    const blogElement = container.querySelector('.togglableContent')
    expect(blogElement).toHaveStyle('display: none')
  })

  test('after click the button, info about the blog is displayed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('show')
    await user.click(button)

    await screen.findAllByText('/new-trailer-final-fantasy-XVI-E3')
    await screen.findAllByText('likes 11')
  })

} )


test('if like button is click twice, the props is called twice', async () =>  {
  const blog = {
    title: 'New Final Fantaxy XVI trailer published in the E3',
    url: '/new-trailer-final-fantasy-XVI-E3',
    likes: 11,
    author: 'Francisco Garcia',
    id: '6498762a83b277a1901e977f'
  }

  const user = userEvent.setup()
  const updateLikes = jest.fn()

  render(
    <Blog key={blog.id} blog={blog} updateLikes={updateLikes}/>
  )
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(updateLikes.mock.calls).toHaveLength(2)
})
