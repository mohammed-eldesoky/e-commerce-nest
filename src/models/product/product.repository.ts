import { AbstractRepository } from "@models/abstract.repository";
import { Product } from "./product.schma";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


export class ProductRepository extends AbstractRepository<Product>{

constructor(@InjectModel (Product.name)private readonly productModel:Model<Product>){
    super(productModel)

}
}