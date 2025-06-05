const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PUERTO = process.env.PORT || 3000;
let query = "";
const obj = {};

// ⚠️ Datos de conexión desde variables de entorno
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexion.connect(error => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
    console.log(`✅ Conexión exitosa a la base de datos ${process.env.DB_NAME}`);
});

app.listen(PUERTO, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PUERTO}`);
});

app.get('/', (req, res) => {
    res.send(`RESTAURANTAPP API`);
});

// --- CATEGORÍAS ---

app.get('/categorias', (req, res) => {
    query = `SELECT * FROM categorias`;
    conexion.query(query, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });

        if (resultado.length > 0) {
            obj.codigo = "200";
            obj.mensaje = "Lista de categorias";
            obj.datos = resultado;
        } else {
            obj.codigo = "400";
            obj.mensaje = "No hay categorias registradas";
            obj.datos = [];
        }
        res.json(obj);
    });
});

app.post('/categorias/add', (req, res) => {
    const nomCategoria = req.body.nom_categoria;
    query = `INSERT INTO categorias(nom_categoria, img_categoria) VALUES(?, ?)`;
    conexion.query(query, [nomCategoria, `icon_${nomCategoria}.png`], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = "200";
        obj.mensaje = "Se insertó correctamente la categoría";
        obj.datos = [];
        res.json(obj);
    });
});

app.delete('/categorias/delete/:nomCategoria', (req, res) => {
    const { nomCategoria } = req.params;
    query = `DELETE FROM categorias WHERE nom_categoria=?`;
    conexion.query(query, [nomCategoria], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = "200";
        obj.mensaje = "Se eliminó correctamente la categoría";
        obj.datos = [];
        res.json(obj);
    });
});

// --- PLATILLOS ---

app.get('/platillos', (req, res) => {
    query = `SELECT * FROM platillos`;
    conexion.query(query, (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = resultado.length > 0 ? "200" : "400";
        obj.mensaje = resultado.length > 0 ? "Lista de platillos" : "No hay platillos registrados";
        obj.datos = resultado;
        res.json(obj);
    });
});

app.get('/platillos/find/:nomCategoria', (req, res) => {
    const { nomCategoria } = req.params;
    query = `SELECT * FROM platillos WHERE nom_categoria=?`;
    conexion.query(query, [nomCategoria], (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = resultado.length > 0 ? "200" : "400";
        obj.mensaje = resultado.length > 0 ? "Lista de platillos" : "No hay platillos registrados";
        obj.datos = resultado;
        res.json(obj);
    });
});

app.post('/platillos/add', (req, res) => {
    const { nom_platillo, descripcion_platillo, precio, nom_categoria } = req.body;
    query = `INSERT INTO platillos VALUES(?, ?, ?, ?)`;
    conexion.query(query, [nom_platillo, descripcion_platillo, precio, nom_categoria], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = "200";
        obj.mensaje = "Se insertó correctamente el platillo";
        obj.datos = [];
        res.json(obj);
    });
});

app.put('/platillos/update/:nomPlatillo', (req, res) => {
    const { nomPlatillo } = req.params;
    const { descripcion_platillo, precio, nom_categoria } = req.body;

    query = `UPDATE platillos SET descripcion_platillo=?, precio=?, nom_categoria=? WHERE nom_platillo=?`;
    conexion.query(query, [descripcion_platillo, precio, nom_categoria, nomPlatillo], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = "200";
        obj.mensaje = "Se actualizó correctamente el platillo";
        obj.datos = [];
        res.json(obj);
    });
});

app.delete('/platillos/delete/:nomPlatillo', (req, res) => {
    const { nomPlatillo } = req.params;
    query = `DELETE FROM platillos WHERE nom_platillo=?`;
    conexion.query(query, [nomPlatillo], (error) => {
        if (error) return res.status(500).json({ error: error.message });

        obj.codigo = "200";
        obj.mensaje = "Se eliminó correctamente el platillo";
        obj.datos = [];
        res.json(obj);
    });
});
