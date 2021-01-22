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
    let reqResponses = req.body.responses;
    let reqWeights = req.body.weights;

    const result = await template.find();
    let id = result.length + 1;

    if(reqName && reqClass && reqResponses && reqWeights) {
        try {
            new template({id, name:reqName, class:reqClass, responses:reqResponses, weights:reqWeights}).save();
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

exports.templatesEdit = async (req, res) => {
    let reqID = req.params.id
    const result = await template.find({id: reqID});
    
    if(result.length > 0) {
        let reqName = result[0].name;
        let reqClass = result[0].class;
        let reqResponses = result[0].responses;
        let reqWeights = result[0].weights;


        if(req.body.name) {
            reqName = req.body.name;
        }
        if(req.body.class) {
            reqClass = req.body.class;
        }
        if(req.body.responses) {
            reqResponses = req.body.responses;
        }
        if(req.body.weights) {
            reqWeights = req.body.weights;
        }

        if(reqID) {
            try {
                template.updateOne({id:reqID}, {$set: { name:reqName, class:reqClass, responses:reqResponses, weights:reqWeights}}, {upsert: true}, function(err){});
            } catch {
                res.json({error: true, type: 'Cannot update database'});
                return;
            }
        } else {
            res.json({error: true, type:'Invalid requirements'});
            return;
        }

        res.json({error: false, type:'sucess'});
    } else {
        res.json({error: true, type:'Data not found'});
    }
}

exports.templatesDelete = async (req, res) => {
    const id = req.params.id
    if(id) {
        try {
            template.deleteOne({id}, function (err) {});
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
    let reqowner = req.body.owner;
    let reqtemplateID = req.body.templateID;
    let reqResponses = req.body.responses;

    const result = await response.find();
    let id = result.length + 1;

    if(reqowner && reqtemplateID && reqResponses) {
        try {
            new response({id, owner:reqowner, templateID:reqtemplateID, responses:reqResponses}).save();
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

exports.responsesEdit = async (req, res) => {
    let reqID = req.params.id
    const result = await response.find({id: reqID});
    
    if(result.length > 0) {
        let reqOwner = result[0].owner;
        let reqtemplateID = result[0].templateID;
        let reqResponses = result[0].responses;


        if(req.body.owner) {
            reqOwner = req.body.owner;
        }
        if(req.body.templateID) {
            reqtemplateID = req.body.templateID;
        }
        if(req.body.responses) {
            reqResponses = req.body.responses;
        }


        if(reqID) {
            try {
                response.updateOne({id:reqID}, {$set: { owner:reqOwner, templateID:reqtemplateID, responses:reqResponses}}, {upsert: true}, function(err){});
            } catch {
                res.json({error: true, type: 'Cannot update database'});
                return;
            }
        } else {
            res.json({error: true, type:'Invalid requirements'});
            return;
        }

        res.json({error: false, type:'sucess'});
    } else {
        res.json({error: true, type:'Data not found'});
    }
}

exports.responsesDelete = (req, res) => {
    const id = req.params.id
    if(id) {
        try {
            response.deleteOne({id}, function (err) {});
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

exports.gradesFind = async (req, res) => {
    const name = req.params.name
    const result = await student.find({});

}

exports.students = async (req, res) => {
    const result = await student.find();

    res.json(result);
}

exports.studentsFind = async (req, res) => {
    const result = await student.find({id: req.params.id});

    res.json(result);
}

exports.studentsInsert = async (req, res) => {
    let reqname = req.body.name;

    const result = await student.find();
    let id = result.length + 1;

    if(reqname) {
        try {
            new student({id, name:reqname}).save();
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

exports.studentsEdit = async (req, res) => {
    let reqID = req.params.id
    const result = await student.find({id: reqID});
    
    if(result.length > 0) {
        let reqName = result[0].name;
        let reqGrade = result[0].grade;


        if(req.body.name) {
            reqName = req.body.name;
        }
        if(req.body.grade) {
            reqGrade = req.body.reqGrade;
        }


        if(reqID) {
            try {
                student.updateOne({id:reqID}, {$set: { name:reqName, grade:reqGrade}}, {upsert: true}, function(err){});
            } catch {
                res.json({error: true, type: 'Cannot update database'});
                return;
            }
        } else {
            res.json({error: true, type:'Invalid requirements'});
            return;
        }

        res.json({error: false, type:'sucess'});
    } else {
        res.json({error: true, type:'Data not found'});
    }
}

exports.studentsDelete = async (req, res) => {
    const id = req.params.id
    if(id) {
        try {
            student.deleteOne({id}, function (err) {});
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

exports.approved = (req, res) => {
    
}