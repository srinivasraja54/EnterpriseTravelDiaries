const express = require('express');
const router = express.Router();

const travelBlogService = require('../travel-blogs-service');

router.get('/blogs', (req, res) => {
    travelBlogService.get(req, res);
});

router.put('/blog', (req, res) => {
    travelBlogService.create(req, res);
});

router.post('/blog', (req, res) => {
    travelBlogService.update(req, res);
});

router.delete('/blog/:id', (req, res) => {
    travelBlogService.destroy(req, res);
});

router.get('/blog/:id', (req, res) => {
    travelBlogService.find(req, res);
});

router.get('/search/:pattern', (req, res) => {
    travelBlogService.search(req, res);
});

router.get('/blogs/:userId', (req, res) => {
    travelBlogService.getBlogsByUserId(req, res);
});

module.exports = router;
