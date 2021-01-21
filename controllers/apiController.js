const { json } = require('express');
const { template, response, student } = require('../models/database');

exports.templates = async (req, res) => {
    const result = await template.find();

    res.json(result);
}

exports.templatesFind = async (req, res) => {
    const result = await template.find({id: req.params.id});

    res.json(result);
}

exports.templatesInsert = async (req, res) => {
    let reqName = req.body.name;
    let reqClass = req.body.class;
    let reqAnswers = req.body.answers;

    const result = await template.find();
    let id = result.length + 1;

    if(reqName && reqClass && reqAnswers) {
        try {
            new template({id, name:reqName, class:reqClass, answers:reqAnswers}).save();
        } catch {
            res.json({error: true, type: 'Cannot insert into database'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }

    
   res.json({error: false, type:'sucess'});

}

exports.templatesEdit = (req, res) => {
    let reqID = req.params.id
    let reqName = req.body.name;
    let reqClass = req.body.class;
    let reqAnswers = req.body.answers;

    if(reqID && reqName && reqClass && reqAnswers) {
        try {
            template.updateOne({id:reqID}, {$set: { name:reqName, class:reqClass, answers:reqAnswers }}, {upsert: true}, function(err){});
        } catch {
            res.json({error: true, type: 'Cannot update database'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }

    res.json({error: false, type:'sucess'});
}

exports.templatesDelete = async (req, res) => {
    const id = req.params.id
    if(id) {
        try {
            await template.deleteOne({id}, function (err) {});
        } catch {
            res.json({error: true, type:'Cannot remove into database'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }
    res.json({error: false, type:'sucess'});
}

exports.responses = async (req, res) => {
    const result = await response.find();

    res.json(result);
}

exports.responsesFind = async (req, res) => {
    const result = await response.find({id: req.params.id});

    res.json(result);
}

exports.responsesInsert = async (req, res) => {
    let reqOwner = req.body.owner;
    let reqTemplateID = req.body.templateID;
    let reqAnswers = req.body.answers;

    const result = await response.find();
    let id = result.length + 1;

    if(reqOwner && reqTemplateID && reqAnswers) {
        try {
            new response({id, owner:reqOwner, templateID:reqTemplateID, answers:reqAnswers}).save();
        } catch {
            res.json({error: true, type: 'Cannot insert into database'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }

    
   res.json({error: false, type:'sucess'});
}

exports.responsesEdit = (req, res) => {
    let reqID = req.params.id
    let reqOwner = req.body.owner;
    let reqTemplateID = req.body.templateID;
    let reqAnswers = req.body.answers;

    if(reqID && reqOwner && reqTemplateID && reqAnswers) {
        try {
            response.updateOne({id:reqID}, {$set: {owner:reqOwner, templateID:reqTemplateID, answers:reqAnswers}}, {upsert: true}, function(err){});
        } catch {
            res.json({error: true, type: 'Cannot update database'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }
    
    res.json({error: false, type:'sucess'});
}

exports.responsesDelete = (req, res) => {
    
}

