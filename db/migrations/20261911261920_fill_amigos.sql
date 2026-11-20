-- migrate:up

INSERT INTO amigos (
  id, name, edad, estado_civil, mascotas
) VALUES
(1, 'María', 25, 'Soltera', 'Gatos'),
(2, 'Carlos', 30, 'Casado', 'Perros'),
(3, 'Ana', 28, 'Soltera', 'Peces');

SELECT setval('amigos_id_seq', (SELECT MAX(id) FROM amigos));

-- migrate:down

DELETE FROM amigos WHERE id BETWEEN 1 AND 3;

SELECT setval('amigos_id_seq', COALESCE((SELECT MAX(id) FROM amigos), 1), false);
