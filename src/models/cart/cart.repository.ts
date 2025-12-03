import { AbstractRepository } from "@models/abstract.repository";
import { Cart } from "./cart.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



export class CartRepository extends AbstractRepository<Cart> {
    constructor(@InjectModel(Cart.name)   private readonly cartModel:Model<Cart>) {
        super(cartModel);
}
}