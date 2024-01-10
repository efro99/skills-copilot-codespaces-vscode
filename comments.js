//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

//connect to database
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//get data from body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//get all comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

//get comment by id
app.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
});

//create new comment
app.post('/comments', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    });
    await comment.save();
    res.json({
        message: 'Success'
    });
});

//update comment
app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.comment = req.body.comment;
    await comment.save();
    res.json({
        message: 'Success'
    });
});

//delete comment
app.delete('/comments/:id', async (req, res) => {
    await Comment.deleteOne({_id: req.params.id});
    res.json({
        message: 'Success'
    });
});

//start server
app.listen(3000, () => {
    console.log('Server started');
});