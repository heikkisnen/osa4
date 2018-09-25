const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(formatBlog))
        })
})

blogsRouter.get('/:id', (request, response) => {
    Blog
      .findById(request.params.id)
      .then(blogs => {
          if (blogs) {
            response.json(formatBlog(blogs))
          } else {
              response.status(404).end()
          }
      })
      .catch(error => {
          response.status(400).send({ error: 'malformatted id' })
      })
})

blogsRouter.delete('/:id', (request, response) => {
    Blog
      .findByIdAndRemove(request.params.id)
      .then(result => {
          console.log(result)
          response.status(204).end()
      })
      .catch(error => {
          response.status(400).send({ error: 'malformatted id' })
      })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body

    if (body.author === undefined || body.author === "") {
        response.status(400).json({ error: 'author missing' })
    } else if (body.title === undefined || body.title === "") {
        response.status(400).json({ error: 'title missing' })
    } else if (body.url === undefined || body.url === "") {
        response.status(400).json({ error: 'url missing' })
    }

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })

    blog
      .save()
      .then(blog => {
          return formatBlog(blog)
      })
      .then(formattedBlog => {
          response.json(formattedBlog)
      })
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url
    }

    Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
          response.json(formatBlog(updatedBlog))
      })
      .catch(error => {
          console.log('You made the following error: ', error)
          response.status(400).send({ error: 'malformatted id '})
      })
})

module.exports = blogsRouter