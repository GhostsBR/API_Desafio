const { json } = require('express');
const { template, response, student, auto_increment } = require('../models/database');

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

    const result = await auto_increment.find({name:'templates'});
    let id = 0;
    if(result.length > 0) {
        id = result[0].id + 1;
        auto_increment.updateOne({name:'templates'}, {$set: {id}}, {upsert: true}, function(err){});
    } else {
        id = 1;
        new auto_increment({name:'templates', id}).save(); 
    }

    if(reqResponses.includes(',') && reqResponses.includes('[') && reqResponses.includes(']') && reqResponses.includes("'") || reqResponses.includes('"')) {
        reqResponses = eval(reqResponses)
    }

    if(reqWeights.includes(',') && reqWeights.includes('[') && reqWeights.includes(']')) {
        reqWeights = eval(reqWeights)
    }

    if(typeof(reqWeights) == 'object' || typeof(reqWeights) == 'array') {
        reqWeights.forEach((i, n) => {
            if(Number(i) <= 0) {
                reqWeights[n] = 1;
            }
        });
    } else {
        if(reqWeights >= 0) {
            reqWeights = 1
        }
    }

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

        if(reqResponses.includes(',') && reqResponses.includes('[') && reqResponses.includes(']')) {
            reqResponses = eval(reqResponses)
        }

        if(reqWeights.includes(',') && reqWeights.includes('[') && reqWeights.includes(']')) {
            reqWeights = eval(reqWeights)
        }

        if(typeof(reqWeights) == 'object' || typeof(reqWeights) == 'array') {
            reqWeights.forEach((i, n) => {
                if(Number(i) <= 0) {
                    reqWeights[n] = 1;
                }
            });
        } else {
            if(reqWeights >= 0) {
                reqWeights = 1
            }
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

    if(result > 0) {
        res.json(result);
    } else {
        res.json({error: true, type:'Cannot found response (invalid id)'});
        return;
    }
}

exports.responsesInsert = async (req, res) => {
    let reqOwner = req.body.owner;
    let reqtemplateID = req.body.templateID;
    let reqResponses = req.body.responses;

    const resultTemplate = await template.find({id:reqtemplateID})
    const resultStudent = await student.find({id:reqOwner})
    const result = await auto_increment.find({name:'responses'});

    let id = 0;
    if(result.length > 0) {
        id = result[0].id + 1;
        auto_increment.updateOne({name:'responses'}, {$set: {id}}, {upsert: true}, function(err){});
    } else {
        id = 1;
        new auto_increment({name:'responses', id}).save(); 
    }

    if(reqResponses.includes(',') && reqResponses.includes('[') && reqResponses.includes(']')) {
        reqResponses = eval(reqResponses)
    }

    if(resultTemplate.length > 0) {
        if(resultStudent.length > 0) {
            if(reqOwner && reqtemplateID && reqResponses) {    
                const grade = await updateResponseGrade(resultTemplate, reqResponses);
                if(grade >= 0 && grade <= 10) {
                    try {
                        new response({id, owner:reqOwner, templateID:reqtemplateID, grade, responses:reqResponses}).save();
                    } catch {
                        res.json({error: true, type: 'Cannot insert into database'});
                        return;
                    }
                    updateStudentGrade(reqOwner);
                } else {
                    res.json({error: true, type:'Invalid grade (need be between 0 and 10)'});
                    return;
                }
            } else {
                res.json({error: true, type:'Invalid requirements'});
                return;
            }
        } else {
            res.json({error: true, type:'Invalid student ID'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid template ID'});
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

        if(reqResponses.includes(',') && reqResponses.includes('[') && reqResponses.includes(']')) {
            reqResponses = eval(reqResponses)
        }

        const resultTemplate = await template.find({id:reqtemplateID})
        const resultStudent = await student.find({id:reqOwner})

        if(reqID) {
            if(resultTemplate.length > 0) {
                if(resultStudent.length > 0) {
                    const grade = await updateResponseGrade(resultTemplate, reqResponses);

                    try {
                        response.updateOne({id:reqID}, {$set: { owner:reqOwner, templateID:reqtemplateID, responses:reqResponses, grade}}, {upsert: true}, function(err){});
                    } catch {
                        res.json({error: true, type: 'Cannot update database'});
                        return;
                    }

                    updateStudentGrade(reqOwner);
                } else {
                    res.json({error: true, type:'Invalid student ID'});
                    return;
                }
            } else {
                res.json({error: true, type:'Invalid template ID'});
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

exports.responsesDelete = async (req, res) => {
    const id = req.params.id
    if(id) {
        const result = await response.find({id});
        if(result.length > 0) {
            let reqOwner = result[0].owner;
            try {
                response.deleteOne({id}, function (err) {});
            } catch {
                res.json({error: true, type:'Cannot remove into database'});
                return;
            }
    
            updateStudentGrade(reqOwner)
        } else {
            res.json({error: true, type:'Invalid response'});
            return;
        }
    } else {
        res.json({error: true, type:'Invalid requirements'});
        return;
    }
    res.json({error: false, type:'sucess'});
}

exports.gradesFind = async (req, res) => {
    const id = req.params.id
    const result = await student.find({id});
    if(result.length > 0) {
        res.json(result[0].grade);
    } else {
        res.json({error: true, type:'Cannot found student (wrong id)'});
        return;
    }
}

exports.students = async (req, res) => {
    const result = await student.find();

    res.json(result);
}

exports.studentsFind = async (req, res) => {
    const result = await student.find({id: req.params.id});

    if(result > 0) {
        res.json(result);
    } else {
        res.json({error: true, type:'Cannot found student (invalid id)'});
        return;
    }
}

exports.studentsInsert = async (req, res) => {
    let reqname = req.body.name;

    const result = await auto_increment.find({name:'students'});
    
    let id = 0;
    if(result.length > 0) {
        id = result[0].id + 1;
        auto_increment.updateOne({name:'students'}, {$set: {id}}, {upsert: true}, function(err){});
    } else {
        id = 1;
        new auto_increment({name:'students', id}).save(); 
    }

    if(reqname) {
        if(result.length <= 100) {
            try {
                new student({id, name:reqname}).save();
            } catch {
                res.json({error: true, type: 'Cannot insert into database'});
                return;
            }
        } else {
            res.json({error: true, type:'Maximum members exceeded (100 members)'});
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

exports.approved = async (req, res) => {
    const result = await student.find({grade:{$gte:7}});

    res.json(result);
}

function updateStudentGrade(reqOwner) {
    setTimeout(async () => {
        const findResponses = await response.find()
        let totalGrade = 0
        if(findResponses.length > 0) {
            findResponses.forEach(item => {
                totalGrade += item.grade;
            });
    
            const studentGrade = (totalGrade / findResponses.length)
            student.updateOne({id:reqOwner}, {$set: { grade:studentGrade}}, {upsert: true}, function(err){});
        } else {
            student.updateOne({id:reqOwner}, {$set: { grade:0}}, {upsert: true}, function(err){});
        }
    }, 200);
}

function updateResponseGrade(resultTemplate, reqResponses) {
    let totalpoints = 0
    let totalweight = 0
                
    for(i in resultTemplate[0].responses) {
        totalweight += Number(resultTemplate[0].weights[i]);
        if(typeof(reqResponses[i]) != 'undefined') {
            if(reqResponses[i].toUpperCase() == resultTemplate[0].responses[i].toUpperCase()) {
                totalpoints += (1 * resultTemplate[0].weights[i]);
            }
        }  
    }
    
    return (totalpoints / totalweight * 10);
}
