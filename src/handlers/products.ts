import express, {Request,Response} from 'express';
import  {Product,ProductStore} from '../models/product'
import verifyAuthToken from '../utilities/tokenValidator';

const store = new ProductStore();

const index = async(_req: Request,_res: Response) => {
    const products = await store.index();
    _res.json(products);
}
const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}
const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        }
        console.log('createProduct', product);
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => { 
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}

const product_routes=(app:express.Application) => {
app.get('/products',index);
app.get('/products/:id', show)
app.post('/products',verifyAuthToken ,create)
app.delete('/products',verifyAuthToken , destroy)
}

export default product_routes
