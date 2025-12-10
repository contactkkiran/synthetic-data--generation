import { faker } from "@faker-js/faker";
// declare const fetch: any; // uncomment if TS complains about fetch

// 1) Create one fake user JSON
function makeUser() {
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

// Public API that returns JSON
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// ---------- GET ----------
async function demoGet() {
  console.log("=== GET EXAMPLE ===");
  const res = await fetch(`${BASE_URL}/1`, { method: "GET" });

  console.log("Status:", res.status);

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    console.log("Response JSON:");
    console.log(JSON.stringify(data, null, 2));
  } catch {
    console.log("Response was not JSON, raw body:");
    console.log(text.slice(0, 300));
  }
}

// ---------- PUT ----------
async function demoPut() {
  console.log("\n=== PUT EXAMPLE (using faker JSON) ===");

  const payload = makeUser();
  console.log("Request JSON:");
  console.log(JSON.stringify(payload, null, 2));

  const res = await fetch(`${BASE_URL}/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("Status:", res.status);

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    console.log("Response JSON:");
    console.log(JSON.stringify(data, null, 2));
  } catch {
    console.log("Response was not JSON, raw body:");
    console.log(text.slice(0, 300));
  }
}

// ---------- MAIN ----------
async function main() {
  await demoGet();
  await demoPut();
}

main().catch((err) => {
  console.error("Error in REST calls:", err);
});
