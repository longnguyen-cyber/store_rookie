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
}
