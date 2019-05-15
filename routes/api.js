import express from 'express';
import v1Account from './v1/account';
import v1Auth from './v1/auth';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'This page from API' });
});

router.use('/account', v1Account);
router.use('/auth', v1Auth);

export default router;
