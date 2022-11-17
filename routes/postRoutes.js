const express = require('express')
const router = express.Router()
const { createPost, updatePost, deletePost, getPosts } = require('../controllers/postControllers')

const isLoggedIn = require('../middlewares/isLoggedIn')

router.route('/post/create').post(isLoggedIn, createPost)
router.route('/post/update/:id').put(isLoggedIn, updatePost)
router.route('/post/create/:id').delete(isLoggedIn, deletePost)
router.route('/post/getposts').get( getPosts)



module.exports = router