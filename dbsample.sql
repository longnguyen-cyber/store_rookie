-- Users
INSERT INTO
  "users" (
    "user_id",
    "username",
    "password",
    "email",
    "is_admin",
    "created_at"
  )
VALUES
  (
    '1',
    'john_doe',
    'password123',
    'john@example.com',
    true,
    '2024-05-01T12:34:56Z'
  ),
  (
    '2',
    'jane_smith',
    'password456',
    'jane@example.com',
    false,
    '2024-05-02T08:22:34Z'
  );

-- Categories
INSERT INTO
  "categories" ("category_id", "name")
VALUES
  ('1', 'Fiction'),
  ('2', 'Non-Fiction');

-- Authors
INSERT INTO
  "authors" ("author_id", "name")
VALUES
  ('1', 'George Orwell'),
  ('2', 'J.K. Rowling');

-- Publishers
INSERT INTO
  "publishers" ("publisher_id", "name")
VALUES
  ('1', 'Penguin Random House'),
  ('2', 'HarperCollins');

-- Books
INSERT INTO
  "books" (
    "book_id",
    "title",
    "description",
    "category_id",
    "images",
    "created_at"
  )
VALUES
  (
    '1',
    '1984',
    'A dystopian social science fiction novel and cautionary tale.',
    '1',
    '["https://example.com/images/1984_1.jpg", "https://example.com/images/1984_2.jpg"]',
    '2024-05-03T14:18:22Z'
  ),
  (
    '2',
    'Harry Potter and the Sorcerer''s Stone',
    'Fantasy novel written by British author J.K. Rowling.',
    '1',
    '["https://example.com/images/hp1_1.jpg", "https://example.com/images/hp1_2.jpg"]',
    '2024-05-04T09:15:44Z'
  );

-- Book Prices
INSERT INTO
  "book_prices" (
    "price_id",
    "book_id",
    "price",
    "start_date",
    "end_date",
    "created_at"
  )
VALUES
  (
    '1',
    '1',
    19.99,
    '2024-05-01',
    null,
    '2024-05-01T12:34:56Z'
  ),
  (
    '2',
    '2',
    24.99,
    '2024-05-02',
    null,
    '2024-05-02T08:22:34Z'
  );

-- Book Authors
INSERT INTO
  "book_authors" ("book_id", "author_id")
VALUES
  ('1', '1'),
  ('2', '2');

-- Book Publishers
INSERT INTO
  "book_publishers" ("book_id", "publisher_id")
VALUES
  ('1', '1'),
  ('2', '2');

-- Promotions
INSERT INTO
  "promotions" (
    "promotion_id",
    "book_id",
    "promotion_type",
    "start_date",
    "end_date"
  )
VALUES
  ('1', '1', 'Discount', '2024-05-05', '2024-05-15');

-- Reviews
INSERT INTO
  "reviews" (
    "review_id",
    "book_id",
    "user_id",
    "rating",
    "comment",
    "created_at"
  )
VALUES
  (
    '1',
    '1',
    '1',
    5,
    'A timeless classic!',
    '2024-05-06T11:23:45Z'
  ),
  (
    '2',
    '2',
    '2',
    4,
    'Very engaging and magical.',
    '2024-05-07T14:50:12Z'
  );

-- Orders
INSERT INTO
  "orders" ("order_id", "user_id", "order_date", "status")
VALUES
  ('1', '1', '2024-05-08T10:30:00Z', 'Pending'),
  ('2', '2', '2024-05-09T12:45:00Z', 'Completed');

-- Order Items
INSERT INTO
  "order_items" (
    "order_item_id",
    "order_id",
    "book_id",
    "quantity",
    "price_id"
  )
VALUES
  ('1', '1', '1', 1, '1'),
  ('2', '2', '2', 2, '2');