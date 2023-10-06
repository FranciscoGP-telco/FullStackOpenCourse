const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs')
  if(user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.username && body.password) {
    if(body.password.length > 3) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        password: passwordHash,
        name : body.name
      })

      const savedUser = await user.save()
      response.status(201).json(savedUser)
    } else {
      response.status(400).json({ error: 'The password lenght must be higher than 3 characters' })
    }
  } else {
    response.status(400).json({ error: 'Missing username or password' })
  }
})

module.exports = usersRouter