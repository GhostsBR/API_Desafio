require('dotenv').config({path:'variables.env'});

const { json } = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Conectado com sucesso ao banco de dados!");
})
.catch( (err) => {
    console.log(`Houve um erro ao tentar se conectar com o banco de dados ${err}`);
});


const templateSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    class: {
        type: String,
        require: true
    },
    answers: {
        type: Array,
        require: true
    },
});

exports.template = mongoose.model('template', templateSchema);

const responseSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    templateID: {
        type: Number,
        require: true
    },
    answers: {
        type: Array,
        require: true
    },
});

exports.response = mongoose.model('response', responseSchema);

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    grades: {
        type: Object,
        require: true
    },
});

exports.student = mongoose.model('student', studentSchema);
