import { Category } from '@app/common/@generated/category/category.model';
import { CreateCategoryInput } from '@app/common/categories';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Query(() => PaginatedCategoryResponse, { name: 'categories' })
  // async categories(
  //   @Args('page', { type: () => Int }) page: number,
  //   @Args('limit', { type: () => Int }) limit: number,
  // ) {
  //   const allData = await this.categoriesService.findAll();
  //   const total = allData.length;

  //   const start = (page - 1) * limit;
  //   const end = page * limit;
  //   const data = allData.slice(start, end);

  //   const pagination = this.handlePagination(page, limit, total, 'category');

  //   return { data, pagination };
  // }

  @Query(() => [Category], { name: 'categories' })
  async categories() {
    return this.categoriesService.findAll();
  }

  private handlePagination(
    pageStr: number,
    limit: number,
    total: number,
    entityName: string,
  ) {
    const page = parseInt(pageStr.toString());
    const totalPages = Math.ceil(total / limit);
    let nextPage = page + 1;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    let prevPage = page - 1;
    if (prevPage < 1) {
      prevPage = 1;
    }

    // Generate an array of page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return {
      nextPage: `/${entityName}?page=${nextPage}&limit=${limit}`,
      prevPage: `/${entityName}?page=${prevPage}&limit=${limit}`,
      pages,
      currentPage: page,
    };
  }
  // @Query(() => PaginatedCategoryResponse, { name: 'category' })
  // async category(
  //   @Args('id') id: string,
  //   @Args('page', { type: () => Int }) page: number,
  //   @Args('limit', { type: () => Int }) limit: number,
  // ) {
  //   const allData = await this.categoriesService.findAll();
  //   const total = allData.length;

  //   const start = (page - 1) * limit;
  //   const end = page * limit;
  //   const data = allData.slice(start, end);

  //   const pagination = this.handlePagination(page, limit, total, 'category');

  //   return { data, pagination };
  // }

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
