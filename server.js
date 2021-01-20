const app = require('./app');

require('dotenv').config({path:'variables.env'});

app.set('port', process.env.PORT || 30);
const server = app.listen(app.get('port'), () => {
    console.log(`O servidor foi iniciado na porta: ${server.address().port}`);
});