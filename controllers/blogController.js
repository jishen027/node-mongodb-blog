// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const { result } = require('lodash')
const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({
        createdAt: -1
    })
        .then(result => {
            res.status(201).json(result)
            // res.render('index', {
            //     title: "All blogs",
            //     blogs: result
            // })
        }).catch(err => {
            res.status(404).json({"status": "failed", "code": -1})
        })
}


const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.status(201).json({ "message": "success", "code": 1 })
        })
        .catch(err => {
            res.status(404).json({"status": "failed", "code": -1})
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            // res.render('details', {
            //     blog: result,
            //     title: 'Blog Details'
            // })

            res.status(201).json(result)
        })
        .catch(err => {
            res.status(404).json({"status": "failed", "code": -1})
        })
}

const blog_create_get = (req, res) => {
    res.render('create', {
        title: 'Create'
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        //AJAX has to response with json data
        .then(result => {
            res.json({
                redirect: '/blogs'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_delete,
    blog_create_post,
}