import { Router } from 'express';
import {
    getCurrentUser,
    getApplicationStats,
    updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions, checkForTestUser, checkForUserType } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
    authorizePermissions('admin'),
    getApplicationStats,
]);
router.patch('/update-user', checkForTestUser, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), validateUpdateUserInput, updateUser);

export default router;