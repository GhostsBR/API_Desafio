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

exports.templatesAction = async (req, res) => {
    if(req.body.name && req.body.class && req.body.answers) {
        try {
            await fetch('http://localhost:30/api/templates/insert', {
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
            await fetch(`http://localhost:30/api/templates/delete/${id}`, {
            method: 'delete',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o gabarito, tente novamente mais tarde!');
            res.redirect('/templates');
        }

        req.flash('success', 'Gabarito removido com sucesso!');
        res.redirect('/templates');
        
    } else if(req.body.edit) {

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