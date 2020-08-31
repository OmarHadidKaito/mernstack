import express from 'express'
import userController from '../controllers/user.controller'
import expenseController from '../controllers/expense.controller'
import authenticate from '../middleware/passport.middleware'

const router = express.Router()

router.post(`/register`, userController.register)
router.post(`/auth`, userController.login)


router.all(`*`, authenticate)
//--------------authorized  router------------//
router.get(`/me`, userController.me)
router.post(`/expense`, expenseController.create)
router.get(`/expense/:month?`, expenseController.get);
router.delete(`/expense/:id`, expenseController.delete)
router.put(`/expense/:id`, expenseController.update)



export default router