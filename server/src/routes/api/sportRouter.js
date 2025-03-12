import express from 'express';
const router = express.Router();
import {
  createUser,
  login,
  getSingleUser,
  saveTeam,
  deleteTeam
} from '../../controllers/user-controller.js';


// import middleware
import { authenticateToken } from '../../services/auth.js';


router.route('/me').get(authenticateToken, getSingleUser);



router.route('/login').post(login);

router.route('/Team').put(saveTeam, authenticateToken);
router.route('/').post(createUser)


router.route('/Team/:full_name').delete(deleteTeam, authenticateToken);

export default router;
