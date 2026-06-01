import { Sequelize, DataTypes } from "sequelize";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
});


// Modelo Película
export const Pelicula = db.define("peliculas", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },

    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});


// Modelo Usuario
export const Usuario = db.define("usuarios", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


// Crear tablas
await db.sync();

export default db;