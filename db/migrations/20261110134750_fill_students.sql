-- migrate:up

INSERT INTO students (
  id, names, last_names, email, phone, district_id, picture_url, summary, carrere_id, sementer_id, user_id, created, updated
) VALUES
(1, 'María', 'Gómez', 'maria.gomez@example.com', '987654321', 1, NULL, 'Estudiante de Software enfocada en desarrollo Web.', 1, 3, 2, NOW(), NOW()),
(2, 'Carlos', 'López', 'carlos.lopez@example.com', '987654322', 2, NULL, 'Apasionado por la inteligencia artificial y ciencia de datos.', 1, 4, 3, NOW(), NOW()),
(3, 'Ana', 'Torres', 'ana.torres@example.com', '987654323', 3, NULL, 'Diseñadora UI/UX en formación con interés en desarrollo frontend.', 2, 3, 4, NOW(), NOW()),
(4, 'Luis', 'Ramírez', 'luis.ramirez@example.com', '987654324', 4, NULL, 'Desarrollador backend orientado a microservicios en Node.js.', 1, 2, 5, NOW(), NOW()),
(5, 'Sofía', 'Díaz', 'sofia.diaz@example.com', '987654325', 5, NULL, 'Interesada en gestión de proyectos y análisis de sistemas.', 3, 4, 6, NOW(), NOW()),
(6, 'Diego', 'Mendoza', 'diego.mendoza@example.com', '987654326', 1, NULL, 'Estudiante enfocado en bases de datos PostgreSQL y Sequelize.', 1, 1, 7, NOW(), NOW()),
(7, 'Lucía', 'Morales', 'lucia.morales@example.com', '987654327', 2, NULL, 'Entusiasta del desarrollo móvil con Flutter y React Native.', 1, 3, 8, NOW(), NOW()),
(8, 'Javier', 'Castro', 'javier.castro@example.com', '987654328', 3, NULL, 'Apasionado por la ciberseguridad y redes computacionales.', 4, 4, 9, NOW(), NOW()),
(9, 'Elena', 'Romero', 'elena.romero@example.com', '987654329', 4, NULL, 'Especialista en desarrollo frontend con React y CSS avanzado.', 2, 2, 10, NOW(), NOW()),
(10, 'Pedro', 'Vargas', 'pedro.vargas@example.com', '987654330', 5, NULL, 'Desarrollador fullstack junior en búsqueda de prácticas.', 1, 3, 16, NOW(), NOW()),
(11, 'Camila', 'Flores', 'camila.flores@example.com', '987654331', 1, NULL, 'Interesada en QA testing y automatización de pruebas.', 3, 1, 17, NOW(), NOW()),
(12, 'Mateo', 'Benítez', 'mateo.benitez@example.com', '987654332', 2, NULL, 'Estudiante enfocado en computación en la nube (AWS/GCP).', 1, 4, 18, NOW(), NOW()),
(13, 'Valeria', 'Silva', 'valeria.silva@example.com', '987654333', 3, NULL, 'Desarrolladora apasionada por arquitecturas limpias y MVC.', 1, 3, 19, NOW(), NOW()),
(14, 'Gabriel', 'Rojas', 'gabriel.rojas@example.com', '987654334', 4, NULL, 'Investigador en temas de Machine Learning y Python.', 1, 4, 20, NOW(), NOW()),
(15, 'Daniela', 'Reyes', 'daniela.reyes@example.com', '987654335', 5, NULL, 'Diseñadora web y maquetadora enfocada en accesibilidad.', 2, 2, 21, NOW(), NOW()),
(16, 'Fernando', 'Herrera', 'fernando.herrera@example.com', '987654336', 1, NULL, 'Desarrollador backend en Go y Node.js.', 1, 3, 22, NOW(), NOW()),
(17, 'Paula', 'Guerrero', 'paula.guerrero@example.com', '987654337', 2, NULL, 'Interesada en la gestión de producto y metodologías ágiles.', 3, 4, 23, NOW(), NOW()),
(18, 'Andrés', 'Medina', 'andres.medina@example.com', '987654338', 3, NULL, 'Entusiasta de DevOps y entornos Docker.', 1, 1, 24, NOW(), NOW()),
(19, 'Carolina', 'Vega', 'carolina.vega@example.com', '987654339', 4, NULL, 'Estudiante de sistemas con enfoque en analítica de negocios.', 4, 3, 25, NOW(), NOW());

SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));

-- migrate:down

DELETE FROM students WHERE id BETWEEN 1 AND 19;

SELECT setval('students_id_seq', COALESCE((SELECT MAX(id) FROM students), 1), false);