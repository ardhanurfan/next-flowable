import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export const username: string = "admin";
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
    `http://localhost:5000/flowable-rest/service/repository/process-definitions?latest=true`,
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

export async function startProcess({
  id,
  key,
  name,
}: {
  id: string;
  key: string;
  name: string;
}) {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/runtime/process-instances`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        processDefinitionId: id,
        businessKey: key,
        returnVariables: true,
        variables: [
          {
            name: name,
            value: "any",
          },
        ],
      }),
    }
  );

  const result = await response.json();

  console.log(result);

  if (response.ok) {
    return result;
  }

  throw result;
}
