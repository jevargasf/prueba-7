import express from 'express'
import { Router } from 'express';
import { getPaises, postPaises, deletePaises } from '../controllers/controllers.js';
const router = Router()

router.get('/', getPaises)

router.post('/', postPaises)

router.delete('/:nombre', deletePaises)

export default router