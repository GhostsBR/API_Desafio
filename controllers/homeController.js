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
    if(req.body.name && req.body.class && req.body.responses && req.body.weights && !req.body.remove && !req.body.edit) {
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
        
    } else {
        req.flash('error', 'Não foi possível inserir o gabarito, tente novamente mais tarde!');
        res.redirect('/templates');
    }
}

exports.responses = async (req, res) => {
    let responsesJson = {
        responses:[] 
    }
    
    await fetch(`${process.env.URL}/api/responses`)
    .then(async res => responsesJson.responses = await res.json());

    res.render('responses', responsesJson);
}

exports.responsesAction = async (req, res) => {
    if(req.body.owner && req.body.templateID && req.body.responses && !req.body.remove && !req.body.edit) {
        try {
            await fetch(`${process.env.URL}/api/responses`, {
            method: 'post',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível adicionar a resposta, tente novamente mais tarde!');
            res.redirect('/responses');
            return;
        }
    
        req.flash('success', 'Respota adicionada com sucesso!');
        res.redirect('/responses');
    } else if(req.body.remove) {
        const id = req.body.remove
        
        try{
            await fetch(`${process.env.URL}/api/responses/${id}`, {
            method: 'delete',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover a resposta, tente novamente mais tarde!');
            res.redirect('/responses');
            return;
        }

        req.flash('success', 'Resposta removida com sucesso!');
        res.redirect('/responses');
        
    } else if(req.body.edit) {
        const id = req.body.edit
        
        try{
            await fetch(`${process.env.URL}/api/responses/${id}`, {
            method: 'put',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o resposta, tente novamente mais tarde!');
            res.redirect('/responses');
            return;
        }

        req.flash('success', 'Resposta alterada com sucesso!');
        res.redirect('/responses');
        
    } else {
        req.flash('error', 'Não foi possível inserir a resposta, tente novamente mais tarde!');
        res.redirect('/responses');
    }
}

exports.students = async (req, res) => {
    let studentsJson = {
        students:[]
    }
    
    await fetch(`${process.env.URL}/api/students`)
    .then(async res => studentsJson.students = await res.json());

    res.render('students', studentsJson);
}

exports.studentsAction = async (req, res) => {
    if(req.body.name && !req.body.remove && !req.body.edit) {
        try {
            await fetch(`${process.env.URL}/api/students`, {
            method: 'post',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível adicionar o aluno, tente novamente mais tarde!');
            res.redirect('/students');
            return;
        }
    
        req.flash('success', 'Aluno adicionado com sucesso!');
        res.redirect('/students');
    } else if(req.body.remove) {
        const id = req.body.remove
        
        try{
            await fetch(`${process.env.URL}/api/students/${id}`, {
            method: 'delete',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o aluno, tente novamente mais tarde!');
            res.redirect('/students');
            return;
        }

        req.flash('success', 'Aluno removido com sucesso!');
        res.redirect('/students');
        
    } else if(req.body.edit) {
        const id = req.body.edit
        
        try{
            await fetch(`${process.env.URL}/api/students/${id}`, {
            method: 'put',
            body:    JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' },
            })
        } catch {
            req.flash('error', 'Não foi possível remover o aluno, tente novamente mais tarde!');
            res.redirect('/students');
            return;
        }

        req.flash('success', 'Aluno alterado com sucesso!');
        res.redirect('/students');
        
    } else {
        req.flash('error', 'Não foi possível inserir o aluno, tente novamente mais tarde!');
        res.redirect('/students');
    }
}

exports.grades = (req, res) => {
   
}

exports.approved = (req, res) => {
    res.render('home');
}