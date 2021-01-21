const fetch = require('node-fetch');

exports.index = (req, res) => {
    res.render('home');
}

exports.templates = async (req, res) => {
    let templatesJson = {
        templates:[]
    }
    
    await fetch('http://localhost:30/api/templates')
    .then(async res => templatesJson.templates = await res.json());

    res.render('templates', templatesJson);
}

exports.templatesAction = (req, res) => {
    
}

exports.responses = (req, res) => {
    res.render('home');
}

exports.grades = (req, res) => {
    res.render('home');
}

exports.approved = (req, res) => {
    res.render('home');
}