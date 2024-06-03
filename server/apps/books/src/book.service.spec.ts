// import { Test, TestingModule } from '@nestjs/testing';
// import { BookService } from './books.service';
// import { PrismaService } from '@app/common';

// describe('BookService', () => {
//   let service: BookService;
//   let prisma: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [BookService, PrismaService],
//     }).compile();

//     service = module.get<BookService>(BookService);
//     prisma = module.get<PrismaService>(PrismaService);
//   });

//   it('should return all books', async () => {
//     const mockBooks = [{ id: 1, title: 'Test Book', author: 'Test Author' }];
//     jest
//       .spyOn(prisma.book, 'findMany')
//       .mockImplementation(() => Promise.resolve(mockBooks));

//     expect(await service.findAll()).toEqual(mockBooks);
//   });
// });
