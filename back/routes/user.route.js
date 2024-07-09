import {Router} from "express";
import {getUsers, getUser, createUser, updateUser, deleteUser, loginUser, logoutUser} from "../controllers/user.controller.js";

const routes = Router();

routes.get('/', getUsers);
routes.get('/getinfo/:token', getUser);
routes.post('/login', loginUser);
routes.post('/logout', logoutUser);
routes.post('/', createUser);
routes.put('/:id', updateUser);
routes.delete('/:id', deleteUser);

export default routes;