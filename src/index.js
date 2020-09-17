const express = require('express');
const app = express();
var bodyParser = require('body-parser');

//Archivo de configuración
app.use(require('./config/config'));

//Configuración de la forma de mostrar los datos para el API
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Configuración del archivo de rutas
app.use(require('./routes/rutas'));

//Inicio del servidor en el puerto para el app
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});