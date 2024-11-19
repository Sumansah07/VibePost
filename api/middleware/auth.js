import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/keys.js'; 
import userModel from '../models/user.model.js'; 

export const loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET); 
    req.userDetails = decode;
    next();
  } catch (err) {
    res.status(401).json({ 
      error: "You must be logged in",
    });
  }
};

export const isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body; // corrected variable name
  if (
    !loggedInUserId ||
    !req.userDetails || // removed optional chaining
    loggedInUserId !== req.userDetails._id
  ) {
    return res.status(403).json({ error: "You are not authenticated" });
  }
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId); // corrected variable name
    // If user role is 0, that means not admin, it's a customer
    if (reqUser.userRole === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (err) {
    return res.status(404).json({ error: "User not found" }); 
  }
};