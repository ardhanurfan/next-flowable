import { unstable_noStore as noStore } from "next/cache";

export const username: string = "rest-admin";
const password: string = "test";
const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials); // Encoding kredensial ke Base64

export async function fetchTasks() {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/runtime/tasks`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}

export async function fetchApp() {
  noStore();
  const response = await fetch(
    `http://localhost:5000/flowable-rest/app-api/app-repository/app-definitions?latest=true`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}
