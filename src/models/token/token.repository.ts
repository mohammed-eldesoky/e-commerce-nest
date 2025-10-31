



import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Token } from "./token.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TokenRepository extends AbstractRepository<Token>{
    constructor(@InjectModel(Token.name) TokenModel:Model<Token>) {
        super(TokenModel);
    }
}
