import express from 'express'
import { Router } from 'express';
const router = Router()

router.get('/', (req, res) => {
    res.send('manejador get')
})

export default router