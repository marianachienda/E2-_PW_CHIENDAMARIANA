
-- migrate:up

CREATE TABLE amigos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    edad INT NOT NULL,
    estado_civil VARCHAR(30) NOT NULL,
    mascotas VARCHAR(30) NOT NULL
);

-- migrate:down


DROP TABLE IF EXISTS amigos;