import express from 'express';
import rateLimit from 'express-rate-limit';
import {requireAuth} from '../middleware/auth.js';
import {nexusIntelligenceService as nexus} from '../services/nexusIntelligenceService.js';
const router=express.Router();router.use(requireAuth);
router.use(rateLimit({windowMs:60000,max:20,keyGenerator:req=>`${req.user.company_id}:${req.user.id}`,standardHeaders:true,legacyHeaders:false}));
router.get('/overview',async(req,res,next)=>{try{res.json({data:await nexus.overview(req.user,req.query.period||7)});}catch(e){next(e);}});
router.post('/investigate',async(req,res,next)=>{try{res.json({data:await nexus.investigate(req.user,req.body)});}catch(e){next(e);}});
export default router;
