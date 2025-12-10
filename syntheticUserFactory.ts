// syntheticUserFactory.ts
import { faker } from "@faker-js/faker";

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  dateOfBirth: Date;
  address: Address;
}

// 1) Create one fake user JSON
export function makeUser(): User {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
  };
}

// (Optional helper) generate multiple fake users
export function makeUsers(count: number): User[] {
  return Array.from({ length: count }, () => makeUser());
}
