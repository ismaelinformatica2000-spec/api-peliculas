import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Almacenamiento temporal en memoria (para prácticas)
let peliculas = [
    { id: 1, titulo: "El Padrino", genero: "drama", anio: 1972, director: "Francis Ford Coppola" },
    { id: 2, titulo: "Titanic", genero: "romance", anio: 1997, director: "James Cameron" },
    { id: 3, titulo: "Inception", genero: "ciencia ficción", anio: 2010, director: "Christopher Nolan" }
];

// VALIDAR API KEY
const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;
    if (apiKey === "12345") {
        next();
    } else {
        res.status(403).send("Acceso Prohibido: API Key inválida");
    }
};

// Aplicar validación a todas las rutas
app.use(validarApiKey);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: "API de Películas funcionando 🎬" });
});

// GET - Listar todas las películas
app.get('/peliculas', (req, res) => {
    res.json(peliculas);
});

// GET - Buscar película por ID
app.get('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === id);
    
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ error: "Película no encontrada" });
    }
});

// POST - Crear nueva película
app.post('/peliculas', (req, res) => {
    try {
        const { titulo, genero, anio, director } = req.body;
        
        // Validar datos requeridos
        if (!titulo || !director) {
            return res.status(400).json({ 
                error: "Faltan datos requeridos",
                requeridos: ["titulo", "director"],
                opcionales: ["genero", "anio"]
            });
        }
        
        // Crear nueva película
        const nuevaPelicula = {
            id: peliculas.length + 1,
            titulo: titulo,
            genero: genero || "no especificado",
            anio: anio || null,
            director: director
        };
        
        // Agregar al array
        peliculas.push(nuevaPelicula);
        
        // Responder éxito
        res.status(201).json({ 
            mensaje: "Película creada exitosamente",
            pelicula: nuevaPelicula
        });
        
    } catch (error) {
        res.status(500).json({ 
            error: "Error en el servidor",
            mensaje: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
