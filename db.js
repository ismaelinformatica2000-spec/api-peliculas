const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions:
        process.env.DB_SSL === 'false'
          ? {}
          : {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
    })
  : new Sequelize({
      // SQLite local. Se crea automaticamente.
      dialect: 'sqlite',
      storage: 'peliculas.sqlite',
      logging: false,
    });

module.exports = sequelize;

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
