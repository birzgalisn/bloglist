const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../../utils/test_helpers/test_helper')
const app = require('../../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const Blog = require('../../models/blog')
const User = require('../../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let passwordHash = await bcrypt.hash('secret', 10)
  let user = new User({ username: 'root', passwordHash })
  let savedUser = await user.save()
  await Promise.all(
    helper.initialBlogs.map(async blog => {
      let newBlog = new Blog({ ...blog, user: savedUser._id })
      await newBlog.save()
    })
  )
})

describe('when there is initially some blogs saved', () => {
  it('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('all blogs are returned', async () => {
    let response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  it('a specific blog is within the returned blogs', async () => {
    let response = await api.get('/api/blogs')
    let titles = response.body.map(b => b.title)
    expect(titles).toContain('TDD harms architecture')
  })
})

describe('viewing a specific blog', () => {
  it('succeeds with a valid id', async () => {
    let blogsAtStart = await helper.blogsInDb()
    let blogToView = blogsAtStart[0]

    let resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let processedblogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedblogToView)
    expect(resultBlog.body._id).toBeUndefined()
    expect(resultBlog.body.id).toBeDefined()
  })

  it('fails with statuscode 404 if blog does not exist', async () => {
    let validNonexistingId = await helper.nonExistingId()
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  it('fails with statuscode 400 id is invalid', async () => {
    let invalidId = '5a3d5da59070081a82a3445'
    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new blog', () => {
  it('succeeds with valid data', async () => {
    let user = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(user.body.token).toBeDefined()

    let newBlog = {
      title: 'Async/await simplifies making async calls',
      author: 'test',
      url: '#',
    }

    let savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    let titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Async/await simplifies making async calls')

    expect(savedBlog.body.likes).toBe(0)
    expect(savedBlog.body.user).toBeDefined()
  })

  it('fails with status code 400 if data invaild', async () => {
    let user = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(user.body.token).toBeDefined()

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        author: 'test',
      })
      .expect(400)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  it('succeeds with status code 204 if id is valid', async () => {
    let blogsAtStart = await helper.blogsInDb()
    let blogToDelete = blogsAtStart[0]

    let user = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(user.body.token).toBeDefined()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    let titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  it('fails with status code 401 if user is not the owner', async () => {
    let blogsAtStart = await helper.blogsInDb()
    let blogToDelete = blogsAtStart[0]

    let user = await api
      .post('/api/register')
      .send({ username: 'user', name: 'user', password: 'user' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(user.body.token).toBeDefined()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    let titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
