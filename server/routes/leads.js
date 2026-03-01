import express from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, admin, getLeads);
router.put('/:id/status', protect, admin, updateLeadStatus);

export default router;
