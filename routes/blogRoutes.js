const express = require("express")
const blogController = require('../controllers/blogController')

const router = express.Router();

router.get('/', blogController.blog_index)
router.post('/', blogController.blog_create_post)
// get blogs create must head of get blogs :id
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)

module.exports = router