const express = require('express');
const bcrypt = require('bcryptjs');
const mysqlConnection = require('../database.js');

const router = express.Router();

//Constante con la ruta para usuarios
const URI_USUARIOS = '/usuario'

//Ruta para crear un usuario
router.post(URI_USUARIOS, (req, res) => {
    const { nombre, password } = req.body;
    const query = `INSERT INTO usuarios (nombre, password) VALUES (?, ?);`;
    mysqlConnection.query(query, [ nombre, bcrypt.hashSync(password, 10) ], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario creado' });
        } else {
            console.log(err);
        }
    });
});

//Ruta para consultar un usuario
router.get(`${URI_USUARIOS}/:idUsuario`, (req, res) => {
    const { idUsuario } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE idUsuario = ?;', [idUsuario], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

//Ruta para consultar todos los usuarios
router.get(URI_USUARIOS, (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//Ruta para eliminar un usuario
router.delete(`${URI_USUARIOS}/:idUsuario`, (req, res) => {
    const { idUsuario } = req.params;
    console.log(idUsuario)
    mysqlConnection.query('DELETE FROM usuarios WHERE (`idusuario` = ?);', [idUsuario], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario eliminado' });
        } else {
            console.log(err);
        }
    });
});

//Ruta para editar un usuario
router.put(`${URI_USUARIOS}/editarUsuario`, (req, res) => {
    const { nombre, password, idUsuario } = req.body;
    const query2 = "UPDATE usuarios SET nombre = ?, password = ? WHERE idusuario = ?;";
    mysqlConnection.query(query2, [nombre, bcrypt.hashSync(password, 10), idUsuario], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario actualizado' });
        } else {
            console.log(err);
        }
    });
});



module.exports = router;