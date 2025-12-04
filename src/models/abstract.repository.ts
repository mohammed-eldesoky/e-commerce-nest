import {
  FilterQuery,
  Model,
  MongooseUpdateQueryOptions,
  ObjectId,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

   //________________________________________________________
  public async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

   //________________________________________________________
  public async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }
   //________________________________________________________
  async getAll(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.find(filter, projection, options);
  }
  //________________________________________________________
  async exist(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.findOne(filter, projection, options);
  }
  //________________________________________________________
  async update(
    filter: FilterQuery<T>,
    update?: UpdateQuery<T>,
    option?: QueryOptions<T>
  ) {
   return await this.model.findOneAndUpdate(filter, update, option);
  }
  //________________________________________________________
  async delete(filter: RootFilterQuery<T>) {
    await this.model.deleteOne(filter);
  }
  //________________________________________________________
  public async findById(id: string | ObjectId, projection?: ProjectionType<T>) {
  return this.model.findById(id, projection);
}
  //________________________________________________________
public  async updateMany(
  filter: RootFilterQuery<T>,
  update: UpdateQuery<T>,
  option?: MongooseUpdateQueryOptions<T>
) {
  return this.model.updateMany(filter, update, option);
}
  //________________________________________________________
async deleteMany(filter: RootFilterQuery<T>): Promise<any> {
  return this.model.deleteMany(filter);
}


}
