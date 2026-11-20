-- migrate:up

INSERT INTO links (
  id, name, url, student_id
) VALUES
(1, 'GitHub', 'https://github.com', 1),
(2, 'LinkedIn', 'https://linkedin.com', 1),
(3, 'Portafolio Web', 'https://miportafolio.dev', 2),
(4, 'Behance', 'https://behance.net', 3);

SELECT setval('links_id_seq', (SELECT MAX(id) FROM links));

-- migrate:down

DELETE FROM links WHERE id BETWEEN 1 AND 4;

SELECT setval('links_id_seq', COALESCE((SELECT MAX(id) FROM links), 1), false);
