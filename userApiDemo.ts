// userApiDemo.ts
import { makeUser } from "./syntheticUserFactory";

// Uncomment if TypeScript complains in some setups
// declare const fetch: any;

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

// ---------- PUT (using synthetic data) ----------
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
