import { NextFunction } from "express"
import { CustomRequest } from "../../interfaces/user/custom-request"
import { UserBehaviorController } from "../../modules/user/user-behavior-controller"
import UserManagerService from "../../modules/user/user-manager"

 UserManagerService.prototype.trackUserBehavior = (req: CustomRequest, res: Response, next: NextFunction) => {
     const user = req.user
     const action = req.url
     const parsedUrl = new URL(req.url, 'http://example.com')
     const userBehaviorController = new UserBehaviorController()
// private userBehaviorController = UserBehaviorController
    

  if (userBehaviorController) {
    userBehaviorController.trackUserBehavior(user)
  }

  next
}
  