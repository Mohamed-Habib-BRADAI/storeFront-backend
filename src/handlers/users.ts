import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/tokenValidator';

const store = new UserStore();

const index = async (_req: Request, _res: Response) => {
    const users = await store.index();
    _res.json(users);
}
const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}
const create = async (req: Request, res: Response) => {
    try {
        const user: User = {

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        if (process.env.TOKEN_SECRET) {
            const newUser = await store.create(user)
            let token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
            res.json(token)
        }

    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}
const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    try {
        if (process.env.TOKEN_SECRET)  {
            const u = await store.authenticate(user.firstname, user.lastname, user.password)
            var token = jwt.sign({user: u}, process.env.TOKEN_SECRET);
            res.json(token)
        }
    } catch (error) {
        res.status(401)
        res.json({error})
    }
}


const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users', destroy)
    app.post('/authenticate',authenticate)
}

export default user_routes
