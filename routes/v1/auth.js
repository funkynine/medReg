
import express from 'express';
import Controller from 'controllers/controller';
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';
import { config } from 'app/config';

const router = express.Router();

router.get('/sign-in', (req, res) => {
  Controller.getOne({ email: req.body.email }, (error, user) => {
    if (error) res.status(422).json({ error });

    if (!user) {
      res.status(422).json({ message: 'Username not found' });
    } else if (!passwordHash.verify(req.body.password, user.password)) {
      res.status(422).json({ message: 'Password incorrect' });
    } else {
      const token = jwt.sign({ user_id: user._id }, config.secret);

      Controller.findByIdAndUpdate(user._id, { token }, (err, data) => {
        if (err) res.status(422).json({ message: 'Something wrong, try later' });
        if (!data) {
          res.status(422).json({ message: 'User not found' });
        } else {
          delete data.password;
          data.token = token;
          res.json({ data });
        }
      });
    }
  });
});

export default router;
