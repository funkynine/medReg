import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import Controller from 'controllers/controller';


export default function checkToken(value) {
  if (!value) return false;

  const token = value.split(' ');
  return Observable.create((observer) => {
    jwt.verify(token[1], token[0], (err, decoded) => {
      if (err) {
        observer.next({ success: false, message: 'Failed to authenticate token.' });
      } else {
        Controller.getOneId(decoded.user_id, (error, user) => {
          if (error) observer.next({ success: false, message: error });
          if (!user) {
            observer.next({ success: false, message: 'Not found user' });
          } else {
            observer.next({ success: user.token === token[1], user_id: decoded.user_id });
          }
        });
      }
    });
  });
}
