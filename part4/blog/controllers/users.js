const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  console.log('hola aqui estoy')
  const users = await User.find({})
  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.username && body.password && body.name) {
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
    response.status(400).end()
  }

})

module.exports = usersRouter