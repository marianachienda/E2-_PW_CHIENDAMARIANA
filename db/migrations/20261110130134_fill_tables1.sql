-- migrate:up

INSERT INTO districts (id, name) VALUES
(1, 'Santiago de Surco'),
(2, 'Miraflores'),
(3, 'San Isidro'),
(4, 'La Molina'),
(5, 'San Borja');

INSERT INTO semesters (id, name) VALUES
(1, '2025-2'),
(2, '2026-0'),
(3, '2026-1'),
(4, '2026-2');

INSERT INTO profiles (id, name, created, updated) VALUES
(1, 'Administrador', NOW(), NOW()), -- Administrador
(2, 'Estudiante', NOW(), NOW()), -- Estudiante
(3, 'Empresa', NOW(), NOW()); -- Empresa

INSERT INTO users (id, email, password, reset_token, created, updated, profile_id) VALUES
(1, 'juan.perez@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 1),
(2, 'maria.gomez@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(3, 'carlos.lopez@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(4, 'ana.torres@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(5, 'luis.ramirez@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(6, 'sofia.diaz@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(7, 'diego.mendoza@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(8, 'lucia.morales@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(9, 'javier.castro@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(10, 'elena.romero@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(11, 'contacto@techsolutions.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(12, 'hr@innovatech.io', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(13, 'reclutamiento@globaldev.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(14, 'empleos@datasystems.pe', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(15, 'talento@softworks.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(16, 'pedro.vargas@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(17, 'camila.flores@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(18, 'mateo.benitez@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(19, 'valeria.silva@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(20, 'gabriel.rojas@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(21, 'daniela.reyes@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(22, 'fernando.herrera@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(23, 'paula.guerrero@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(24, 'andres.medina@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(25, 'carolina.vega@example.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 2),
(26, 'contacto@cloudservices.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(27, 'jobs@cybersec.io', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(28, 'rrhh@futuretech.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 3),
(29, 'admin@portalempleo.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 1),
(30, 'soporte@portalempleo.com', '$2b$10$e8T/k9w4g8A2s1D3f4G5h.H6j7K8l9M0n1O2P3Q4R5S6T7U8V9W0X', NULL, NOW(), NOW(), 1);

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('districts_id_seq', (SELECT MAX(id) FROM districts));
SELECT setval('profiles_id_seq', (SELECT MAX(id) FROM profiles));
SELECT setval('semesters_id_seq', (SELECT MAX(id) FROM semesters));

-- migrate:down

DELETE FROM users WHERE id BETWEEN 1 AND 30;
DELETE FROM semesters WHERE id BETWEEN 1 AND 4;
DELETE FROM districts WHERE id BETWEEN 1 AND 5;

SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1), false);
SELECT setval('semesters_id_seq', COALESCE((SELECT MAX(id) FROM semesters), 1), false);
SELECT setval('districts_id_seq', COALESCE((SELECT MAX(id) FROM districts), 1), false);

DELETE FROM profiles WHERE id BETWEEN 1 AND 3;

SELECT setval('profiles_id_seq', COALESCE((SELECT MAX(id) FROM profiles), 1), false)