import { Category } from '@app/common/@generated/category/category.model';
import { CreateCategoryInput } from '@app/common/categories';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  async categories() {
    const categories = await this.categoriesService.findAll();
    return categories;
  }

  // query category($id:String!){
  //   category(id:$id){
  //     id
  //     name
  //   }
  // }
  // {
  //   "id":"2"
  // }
  @Query(() => Category, { name: 'category' })
  async category(@Args('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    return category;
  }

  @Mutation(() => Boolean)
  async createCategory(@Args('data') data: CreateCategoryInput) {
    const category = await this.categoriesService.create(data);
    return !!category;
  }

  @Mutation(() => Boolean)
  async updateCategory(
    @Args('id') id: string,
    @Args('data') data: CreateCategoryInput,
  ) {
    const category = await this.categoriesService.update(id, data);
    return !!category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string) {
    const category = await this.categoriesService.delete(id);
    return !!category;
  }
}
