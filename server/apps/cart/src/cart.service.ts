import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { Role } from '@app/common';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addItemToCart(data: any, userId: string, type: Role) {
    return await this.cartRepository.addItemToCart(data, userId, type);
  }

  async removeItemFromCart(id: string) {
    return await this.cartRepository.removeItemFromCart(id);
  }

  async getCart(id: string) {
    return await this.cartRepository.getCart(id);
  }

  async updateQuantityOfItem(id: string, quantity: number) {
    return await this.cartRepository.updateQuantityOfItem(id, quantity);
  }
}
