import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'apps/categories/src/categories.service';

type Service = CategoriesService;

export type EntityNames =
  | 'authors'
  | 'categories'
  | 'customers'
  | 'orders'
  | 'products'
  | 'publishers'
  | 'feedbacks';

@Injectable()
export class AdminService {
  constructor(private readonly categoriesService: CategoriesService) {}

  getServiceFromEntityName(entityName: EntityNames): Service {
    return this[`${entityName}Service`] as Service;
  }

  async listRes(entityName: EntityNames) {
    const entityService = this.getServiceFromEntityName(entityName);

    const res = await entityService.findAll();
    return res;
  }

  async deleteRes(entityName: EntityNames, id: string) {
    const entityService = this.getServiceFromEntityName(entityName);

    await entityService.delete(id);
  }

  async createRes(entityName: EntityNames, data: any) {
    const entityService = this.getServiceFromEntityName(entityName);

    await entityService.create(data);
  }

  async updateRes(entityName: EntityNames, id: string, data: any) {
    const entityService = this.getServiceFromEntityName(entityName);

    const rs = await entityService.update(id, data);
    return rs;
  }

  async getRes(entityName: EntityNames, id: string) {
    const entityService = this.getServiceFromEntityName(entityName);

    const res = await entityService.findOne(id);
    return res;
  }
}
