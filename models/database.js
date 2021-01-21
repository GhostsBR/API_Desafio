require('dotenv').config({path:'variables.env'});

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
        type: String,
        require: true
    },
});

exports.template = mongoose.model('template', templateSchema);
