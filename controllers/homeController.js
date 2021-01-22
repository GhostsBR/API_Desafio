const fetch = require('node-fetch');
require('dotenv').config({path:'variables.env'});

exports.index = (req, res) => {
    res.render('home');
}

exports.templates = async (req, res) => {
    let templatesJson = {
        templates:[]
    }
    
    await fetch(`${process.env.URL}/api/templates`)
    .then(async res => templatesJson.templates = await res.json());

    res.render('templates', templatesJson);
}

exports.templatesAction = async (req, res) => {
    if(req.body.name && req.body.class && req.body.answers && !req.body.remove && !req.body.edit) {
        try {
            await fetch(`${process.env.URL}/api/templates`, {
            method: 'post',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível adicionar o gabarito, tente novamente mais tarde!');
            res.redirect('/templates');
            return;
        }
    
        req.flash('success', 'Gabarito adicionado com sucesso!');
        res.redirect('/templates');
    } else if(req.body.remove) {
        const id = req.body.remove
        
        try{
            await fetch(`${process.env.URL}/api/templates/${id}`, {
            method: 'delete',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o gabarito, tente novamente mais tarde!');
            res.redirect('/templates');
            return;
        }

        req.flash('success', 'Gabarito removido com sucesso!');
        res.redirect('/templates');
        
    } else if(req.body.edit) {
        const id = req.body.edit
        
        try{
            await fetch(`${process.env.URL}/api/templates/${id}`, {
            method: 'put',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o gabarito, tente novamente mais tarde!');
            res.redirect('/templates');
            return;
        }

        req.flash('success', 'Gabarito alterado com sucesso!');
        res.redirect('/templates');
        
    }
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