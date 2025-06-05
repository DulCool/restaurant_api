const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use('/static', express.static(__dirname+'/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PUERTO = 3000
let query = ""
const obj = {}

const database = "restaurant_udemy"
const conexion = mysql.createConnection(
    {
        host:'mysql_db',
        database:'restaurant_udemy',
        user:'root',
        password:''
    }
)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`)
})

conexion.connect(error => {
    if(error) throw error
    console.log(`Conexión exitosa a la base de datos ${database}`);
})

app.get('/', (req, res) => {
    res.send(`RESTAURANTAPP API`)
})

// OBTENER CATEGORIAS
app.get('/categorias', (req, res) => {
    query = `SELECT * FROM categorias`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.codigo = "200"
            obj.mensaje = "Lista de categorias"
            obj.datos = resultado
        } else {
            obj.codigo = "400"
            obj.mensaje = "No hay categorias registradas"
            obj.datos = []
        }
        res.json(obj)
    })
})

// AGREGAR CATEGORIA
app.post('/categorias/add', (req, res) => {
    const nomCategoria = req.body.nom_categoria

    query = `INSERT INTO categorias(nom_categoria, img_categoria) VALUES('${nomCategoria}', 'icon_${nomCategoria}.png')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente la categoria"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR CATEGORIA
app.delete('/categorias/delete/:nomCategoria', (req, res) => {
    const {nomCategoria} = req.params

    query = `DELETE FROM categorias WHERE nom_categoria='${nomCategoria}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente la categoria"
        obj.data = []
        res.json(obj)
    })
})





// OBTENER PLATILLOS
app.get('/platillos', (req, res) => {
    query = `SELECT * FROM platillos`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.codigo = "200"
            obj.mensaje = "Lista de platillos"
            obj.datos = resultado
            res.json(obj)
        } else {
            obj.codigo = "400"
            obj.mensaje = "No hay platillos registrados"
            obj.datos = []
            res.json(obj)
        }
    })
})

// OBTENER PLATILLOS CATEGORIA
app.get('/platillos/find/:nomCategoria', (req, res) => {
    const { nomCategoria } = req.params

    query = `SELECT * FROM platillos WHERE nom_categoria='${nomCategoria}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        if(resultado.length > 0) {
            obj.codigo = "200"
            obj.mensaje = "Lista de platillos"
            obj.datos = resultado
            res.json(obj)
        } else {
            obj.codigo = "400"
            obj.mensaje = "No hay platillos registrados"
            obj.datos = []
            res.json(obj)
        }
    })
})

// AGREGAR PLATILLO
app.post('/platillos/add', (req, res) => {
    const platillo = {
        nomPlatillo: req.body.nom_platillo,
        descripcionPlatillo: req.body.descripcion_platillo,
        precio: req.body.precio,
        nomCategoria: req.body.nom_categoria
    }

    query = `INSERT INTO platillos VALUES('${platillo.nomPlatillo}', '${platillo.descripcionPlatillo}', '${platillo.precio}', '${platillo.nomCategoria}')`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se inserto correctamente el platillo"
        obj.data = []
        res.json(obj)
    })
})

// ACTUALIZAR PLATILLO
app.put('/platillos/update/:nomPlatillo', (req, res) => {
    const {nomPlatillo} = req.params
    const platillo = {
        nomPlatillo: req.body.nom_platillo,
        descripcionPlatillo: req.body.descripcion_platillo,
        precio: req.body.precio,
        nomCategoria: req.body.nom_categoria
    }

    query = `UPDATE platillos SET descripcion_platillo='${platillo.descripcionPlatillo}', precio='${platillo.precio}', nom_categoria='${platillo.nomCategoria}' WHERE nom_platillo='${nomPlatillo}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se actualizo correctamente el platillo"
        obj.data = []
        res.json(obj)
    })
})

// BORRAR PLATILLO
app.delete('/platillos/delete/:nomPlatillo', (req, res) => {
    const {nomPlatillo} = req.params

    query = `DELETE FROM platillos WHERE nom_platillo='${nomPlatillo}'`
    conexion.query(query, (error, resultado) => {
        if(error) console.error(error.message);

        obj.code = "200"
        obj.mensaje = "Se elimino correctamente el platillo"
        obj.data = []
        res.json(obj)
    })
})