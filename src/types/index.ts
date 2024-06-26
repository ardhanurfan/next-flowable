interface AppDefinition {
  id: string;
  url: string;
  category: string | null;
  name: string;
  key: string;
  description: string;
  version: number;
  resourceName: string;
  deploymentId: string;
  tenantId: string;
}
