import { hasRole, hasPermission, evaluateAccess } from "@rimelight/auth/permissions";
import { cmsStatements } from "@rimelight/cms";

export { hasRole, hasPermission, evaluateAccess };

export const defaultStatements = {
  user: ["create", "list", "set-role", "ban", "impersonate", "delete", "setRole"] as const,
};

export const statement = {
  ...defaultStatements,
  ...cmsStatements,
  organization: ["create", "edit", "delete"],
  team: ["create", "edit", "delete"],
  member: ["create", "edit", "delete"],
  invitation: ["create", "delete"],
  project: ["create", "edit", "delete"],
  asset: ["view", "create", "edit", "delete"],
  blogPost: ["create", "edit", "review", "delete"],
  legal: ["create", "edit", "review", "delete"],
} as const;

export const roles = {
  owner: ["*"],
  admin: ["admin", "owner", "editor"],
  member: ["member", "user"],
  user: ["user"],
} as const;
