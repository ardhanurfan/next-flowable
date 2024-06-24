export const username: string = "rest-admin";
const password: string = "test";
const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials); // Encoding kredensial ke Base64

export async function fetchTasks() {
  const response = await fetch(
    `http://localhost:8080/flowable-rest/service/runtime/tasks`,
    {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
  );

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  throw result;
}
