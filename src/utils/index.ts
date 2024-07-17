import { Task } from "@/types";

export const usernameLogin: string = "admin";

const credentialsRest = "admin:test";
const encodedCredentials = btoa(credentialsRest); // Encoding kredensial ke Base64

export async function fetchTasks() {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/runtime/tasks?assignee=${usernameLogin}&size=100`,
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
    // const data = result.data as Task[];
    // return data.filter((task) => task.assignee === usernameLogin);
    return result.data as Task[];
  }

  throw result;
}

export async function fetchApp() {
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
    return result.data;
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

  if (response.ok) {
    return result;
  }

  throw result;
}

export async function fetchTaskForm({ taskId }: { taskId: string }) {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/runtime/tasks/${taskId}/form`,
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

export async function postTaskForm({
  taskId,
  formValues,
}: {
  taskId: string;
  formValues: any;
}) {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/runtime/tasks/${taskId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body:
        formValues &&
        JSON.stringify({
          action: "complete",
          variables: Object.entries(formValues).map(([name, value]) => ({
            name,
            value,
          })),
        }),
    }
  );

  if (!response.ok) {
    throw response;
  }
}

export async function fetchUsers() {
  const response = await fetch(
    `http://localhost:5000/flowable-rest/service/identity/users`,
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
    return result.data;
  }

  throw result;
}
