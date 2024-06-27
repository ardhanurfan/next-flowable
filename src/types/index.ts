interface ProcessDefinition {
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
