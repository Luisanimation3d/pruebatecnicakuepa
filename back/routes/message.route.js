import {Router} from "express";
import {getMessages, getMessage, createMessage, deleteMessage} from "../controllers/message.controller.js";

const routes = Router();

routes.get('/', getMessages);
routes.get('/:id', getMessage);
routes.post('/', createMessage);
routes.delete('/:id', deleteMessage);

export default routes;