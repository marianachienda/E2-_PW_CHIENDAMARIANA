// admin/configs/routes.js
import { Router } from 'express';
import * as admins from '../controllers/admin_controllers.js';
import * as carrers from '../controllers/carrer_controllers.js';
//import * as students from '../controllers/student_controllers.js';
import * as studentApis from '../apis/student_api.js';
import * as owners from '../controllers/owner_controllers.js';
import * as enterprises from '../controllers/enterprise_controllers.js';
import * as nationApis from '../apis/nations_apis.js';
import * as carrerApis from '../apis/carrers_apis.js';
import * as profileApis from '../apis/profiles_apis.js';
import * as districtApis from '../apis/districts_apis.js';
import * as semesterApis from '../apis/semesters_apis.js';
import * as amigoApis from '../apis/amigos_api.js';
import * as linksApis from '../apis/links_api.js';

import { redirectIfAuthenticated, requireAuth, soloOwner, soloEnterprise, soloLogueado } from '../../configs/middlewares.js'; 

const router = Router();

// react views
router.get('/admin', requireAuth, admins.home);
router.get('/admin/players', requireAuth, admins.home);
router.get('/admin/teams', requireAuth, admins.home);
router.get('/admin/leagues', requireAuth, admins.home);
router.get('/admin/nations', requireAuth, admins.home);
router.get('/admin/catalogs', requireAuth, admins.home);

// api nations
router.get('/api/v1/nations', nationApis.listNations);
router.get('/api/v1/nations/:id', nationApis.getNationById);
router.post('/api/v1/nations', nationApis.createNation);
router.put('/api/v1/nations/:id', nationApis.updateNation);
router.delete('/api/v1/nations/:id', nationApis.deleteNation);

// api carrers
router.get('/api/v1/carrers', carrerApis.listCarrersSimple);
router.post('/api/v1/carrers', carrerApis.createCarrer);
router.delete('/api/v1/carrers/:id', carrerApis.deleteCarrer);
router.get('/api/v1/carrers/:id', carrerApis.getCarrerById);
router.put('/api/v1/carrers/:id', carrerApis.updateCarrer);

// api profiles
router.get('/api/v1/profiles', profileApis.listProfilesSimple);
router.post('/api/v1/profiles', profileApis.createProfile);
router.delete('/api/v1/profiles/:id', profileApis.deleteProfile);
router.get('/api/v1/profiles/:id', profileApis.getProfileById);
router.put('/api/v1/profiles/:id', profileApis.updatedProfile);

// api students (NUEVO)
router.get('/api/v1/students/test', studentApis.test);
router.get('/api/v1/students/simple', studentApis.listStudentsSimple);
router.get('/api/v1/students', studentApis.listStudents);
router.get('/api/v1/students/:id', studentApis.getStudentById);
router.post('/api/v1/students', studentApis.createStudent);
router.put('/api/v1/students/:id', studentApis.updateStudent);
router.delete('/api/v1/students/:id', studentApis.deleteStudent);

// api districts
router.get('/api/v1/districts', districtApis.listDistrictsSimple);
router.get('/api/v1/districts/paginated', districtApis.listDistricts);
router.get('/api/v1/districts/:id', districtApis.getDistrictById);
router.post('/api/v1/districts', districtApis.createDistrict);
router.put('/api/v1/districts/:id', districtApis.updateDistrict);
router.delete('/api/v1/districts/:id', districtApis.deleteDistrict);

// api amigos
router.get('/api/v1/amigos', amigoApis.listAmigosSimple);
router.get('/api/v1/amigos/paginated', amigoApis.listAmigos);
router.get('/api/v1/amigos/:id', amigoApis.getAmigoById);
router.post('/api/v1/amigos', amigoApis.createAmigo);
router.put('/api/v1/amigos/:id', amigoApis.updateAmigo);
router.delete('/api/v1/amigos/:id', amigoApis.deleteAmigo);

// api links
router.get('/api/v1/links', linksApis.listLinksSimple);
router.get('/api/v1/links/paginated', linksApis.listLinks);
router.get('/api/v1/links/:id', linksApis.getLinksById);
router.post('/api/v1/links', linksApis.createLinks);
router.put('/api/v1/links/:id', linksApis.updateLinks);
router.delete('/api/v1/links/:id', linksApis.deleteLinks);

// api semesters
router.get('/api/v1/semesters', semesterApis.listSemestersSimple);
router.get('/api/v1/semesters/paginated', semesterApis.listSemesters);
router.get('/api/v1/semesters/:id', semesterApis.getSemesterById);
router.post('/api/v1/semesters', semesterApis.createSemester);
router.put('/api/v1/semesters/:id', semesterApis.updateSemester);
router.delete('/api/v1/semesters/:id', semesterApis.deleteSemester);

// carrers
router.get('/admin/carrers', carrers.home);

// students (NUEVO)
//router.get('/admin/students', requireAuth, students.home);

// owner & enterprise
router.get('/owner', soloLogueado, soloOwner, owners.home);
router.get('/enterprise', enterprises.home);
router.get('/enterprise/carrers', enterprises.home);
router.get('/enterprise/carrers/new', enterprises.home);
router.get('/enterprise/carrers/:id/edit', enterprises.home);
router.get('/enterprise/profiles', enterprises.home);
router.get('/enterprise/profiles/new', enterprises.home);
router.get('/enterprise/profiles/:id/edit', enterprises.home);
router.get('/enterprise/convocatorias', enterprises.home);
router.get('/enterprise/convocatorias/nueva', enterprises.home);
router.get('/enterprise/postulantes', enterprises.home);
router.get('/enterprise/students', enterprises.home);
router.get('/enterprise/students/:id', enterprises.home);
router.get('/enterprise/perfil', enterprises.home);
router.get('/enterprise/resenas', enterprises.home);
router.get('/enterprise/cambiar-contrasena', enterprises.home);
router.get('/enterprise/links', enterprises.home);

export default router;