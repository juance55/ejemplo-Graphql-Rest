import { createSchema } from 'graphql-yoga'
import { authors } from "../datos/authors";
import { books } from "../datos/books";
import { reviews } from "../datos/reviews";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
  type Query {
    authors(query: String): [Author!]!
    books: [Book!]!
    reviews: [Review!]!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    text: String!
    book: Book!
  }
`,

  resolvers: {
    Query: {
      authors(_, { query }) {
        if (!query) {
          return authors;
        }
        return authors.filter(author => {
          return author.name.toLowerCase().includes(query.toLowerCase());
        });
      },
      books() {
        return books;
      },
      reviews() {
        return reviews;
      }
    },
    Book: {
      author(parent) {
        return authors.find(author => {
          return author.id === parent.author;
        });
      },
      reviews(parent) {
        return reviews.filter(review => {
          return review.book === parent.id;
        });
      }
    },
    Author: {
      books(parent) {
        return books.filter(book => {
          return book.author === parent.id;
        });
      }
    },
    Review: {
      book(parent) {
        return books.find(book => {
          return book.id === parent.book;
        });
      }
    }
  }
})