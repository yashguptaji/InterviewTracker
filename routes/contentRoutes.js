const { Router } = require('express');
const router = Router();

const { requireAuth }= require('../middleware/authMiddleware');
const contentController= require('../controllers/contentController');

router.get('/topics',requireAuth,contentController.topic);

router.get('/topics/:name',requireAuth,contentController.question);

router.get('/addquestion',requireAuth,contentController.addQuestion_GET);

router.delete('/topics/:id',requireAuth,contentController.question_delete);

router.post('/addquestion',requireAuth,contentController.addQuestion_POST);

module.exports=router;
