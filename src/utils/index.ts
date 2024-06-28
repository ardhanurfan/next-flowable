import { Task } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

export const usernameLogin: string = "arvel";

const credentialsRest = "admin:test";
const encodedCredentials = btoa(credentialsRest); // Encoding kredensial ke Base64

export async function fetchTasks() {
  noStore();
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
    const data = result.data as Task[];
    return data.filter((task) => task.assignee === usernameLogin);
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
  noStore();
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
      body: JSON.stringify({
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
