import express from "express";
import { Pelicula } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});

app.use(express.json());


// LOGGER
const logger = (req, res, next) => {

    console.log(
        `${new Date().toLocaleString()} - ${req.method} en ${req.url}`
    );

    next();

};

app.use(logger);



// VALIDAR API KEY
const validarApiKey = (req, res, next) => {

    const apiKey = req.query.key;

    if (apiKey === "12345") {

        next();

    } else {

        res.status(403).send(
            "Acceso Prohibido: API Key inválida"
        );

    }

};


//endpoints

// GET PELICULAS
app.get(
    "/peliculas",
    validarApiKey,
    async (req, res, next) => {

        try {

            const peliculas =
                await Pelicula.findAll();

            res.json(peliculas);

        } catch (error) {

            next(error);

        }

    }
);



// GET DATOS PRIVADOS
app.get(
    "/api/v1/datos",
    validarApiKey,
    (req, res) => {

        res.send(
            "Datos ultra secretos enviados"
        );

    }
);



// POST agregar pelicula
app.post(
    "/peliculas",
    validarApiKey,
    async (req, res, next) => {

        try {

            const nuevaPelicula =
                await Pelicula.create({

                    titulo: req.body.titulo,
                    genero: req.body.genero,
                    anio: req.body.anio

                });

            res.json({

                mensaje:
                    "Película agregada correctamente",

                pelicula: nuevaPelicula

            });

        } catch (error) {

            next(error);

        }

    }
);


// PUT actualizar pelicula
app.put(
    "/peliculas/:id",
    validarApiKey,
    async (req, res, next) => {

        try {

            const pelicula =
                await Pelicula.findByPk(
                    req.params.id
                );

            if (!pelicula) {

                return res.status(404).json({

                    mensaje:
                        "Película no encontrada"

                });

            }

            await pelicula.update({

                titulo: req.body.titulo,
                genero: req.body.genero,
                anio: req.body.anio

            });

            res.json({

                mensaje:
                    "Película actualizada correctamente",

                pelicula

            });

        } catch (error) {

            next(error);

        }

    }
);


// DELETE   borrar pelicula 
app.delete(
    "/peliculas/:id",
    validarApiKey,
    async (req, res, next) => {

        try {

            const pelicula =
                await Pelicula.findByPk(
                    req.params.id
                );

            if (!pelicula) {

                return res.status(404).json({

                    mensaje:
                        "Película no encontrada"

                });

            }

            await pelicula.destroy();

            res.json({

                mensaje:
                    "Película eliminada correctamente"

            });

        } catch (error) {

            next(error);

        }

    }
);


// MIDDLEWARE DE ERRORES

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        error:
            "Algo salió mal en el servidor",

        mensaje: err.message

    });

});


// SERVIDOR

app.listen(PORT, () => {

    console.log(
        `Servidor iniciado en puerto ${PORT}`
    );

});