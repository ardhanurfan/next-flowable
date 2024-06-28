export interface ProcessDefinition {
  id: string;
  url: string;
  key: string;
  version: number;
  name: string;
  description: string;
  tenantId: string;
  deploymentId: string;
  category: string | null;
}

export interface Task {
  id: string;
  processDefinitionId: string;
  assignee: string;
  name: string;
  description: string;
  dueDate?: Date | null;
  formKey: string;
}
