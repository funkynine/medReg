import express from 'express';
import Controller from 'controllers/controller';
// eslint-disable-next-line import/named
import { checkToken } from 'utils/utils';
import passwordHash from 'password-hash';

const router = express.Router();

router.post('/register', (req, res) => {
  const data = req.body;
  Controller.getOne({ email: data.email }, (error, user) => {
    if (error) res.status(422).send(error);

    if (!user) {
      const payload = {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: passwordHash.generate(data.password),
      };

      Controller.create(payload, (err) => {
        if (err) {
          res.status(422).json({ error: err.errors });
        } else {
          res.status(201).json({ message: 'Success' });
        }
      });
    } else {
      res.status(422).json({ message: 'Username taken' });
    }
  });
});

router.get('/users', (req, res) => {
  Controller.getAllUsers((err, users) => {
    if (err) res.send(err);

    res.send(users);
  });
});

router.post('/role', (req, res) => {
  const data = req.body;
  const payload = {
    role: data.role,
  };

  Controller.createRole(payload, (err) => {
    if (err) {
      res.status(422).json({ error: err.errors });
    } else {
      res.status(201).json({ message: 'Success' });
    }
  });
});

// router.patch('/update', (req, res) => {
//   //
// });

router.delete('/remove', (req, res) => {
  checkToken(req.headers.jwt)
    .subscribe((result) => {
      if (result.success) {
        Controller.deleteUser({ _id: result.user_id }, (error) => {
          if (error) res.status(422).send({ error });
          res.status(201).json({ message: 'Success' });
        });
      } else {
        res.status(422).json({ message: result.message });
      }
    });
});

router.get('/roles', (req, res) => {
  // TODO
  Controller.getAllUsersRole((err, role) => {
    if (err) res.send(err);

    res.send(role);
  });
});

export default router;
