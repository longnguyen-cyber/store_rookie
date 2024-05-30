import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class CommonService {
  private readonly LIMIT_SIZE = 20; // 20 MB

  isNotEmptyObject(obj: object): boolean {
    return obj && Object.keys(obj).length !== 0;
  }

  filterEmptyObject(obj: object): object {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key]) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }

  exclude = <T, Key extends keyof T>(entity: T, keys: Key[]): Omit<T, Key> => {
    for (const key of keys) {
      delete entity[key];
    }
    return entity;
  };

  deleteField(obj: any, removeFields: string[], addFields?: string[]): any {
    const fieldDefaultRemove = [
      'password',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    if (removeFields.length === 0) {
      removeFields = fieldDefaultRemove;
    } else {
      removeFields = [...removeFields, ...fieldDefaultRemove];
    }

    // If addFields is specified, remove these removeFields from the removeFields array
    if (addFields) {
      removeFields = removeFields.filter((field) => !addFields.includes(field));
    }

    for (const key in obj) {
      if (removeFields.includes(key)) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        this.deleteField(obj[key], removeFields, addFields);
      }
    }

    return obj;
  }

  formatDate(obj: any): any {
    for (const key in obj) {
      if (obj[key] instanceof Date) {
        obj[key] = format(obj[key], 'MM/dd/yyyy');
      } else if (typeof obj[key] === 'object') {
        this.formatDate(obj[key]);
      }
    }

    return obj;
  }

  convertToDate(obj: any): any {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && !isNaN(Date.parse(obj[key]))) {
        obj[key] = new Date(obj[key]);
      } else if (typeof obj[key] === 'object') {
        this.convertToDate(obj[key]);
      }
    }

    return obj;
  }
}
