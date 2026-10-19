import express from 'express';
import rateLimit from 'express-rate-limit';
import { requireAuth } from '../middleware/auth.js';
import { workplaceAccessService } from '../services/workplaceAccessService.js';
const router=express.Router();
router.use(requireAuth);
router.use(rateLimit({windowMs:60000,max:12,keyGenerator:req=>`${req.user.company_id}:${req.user.id}`,standardHeaders:true,legacyHeaders:false}));
router.post('/ping',async(req,res,next)=>{try {res.json({data:await workplaceAccessService.ping(req.user,req.body)});}catch(error){next(error);}});
export default router;
