import { createAccessControl, defaultStatements } from "@rimelight/auth/permissions"
import { cmsStatements } from "@rimelight/cms"

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
  legal: ["create", "edit", "review", "delete"]
} as const

export const ac = createAccessControl(statement)

export const owner = ac.newRole({
  user: ["create", "list", "set-role", "ban", "impersonate", "delete", "setRole"],
  organization: ["create", "edit", "delete"],
  team: ["create", "edit", "delete"],
  member: ["create", "edit", "delete"],
  invitation: ["create", "delete"],
  project: ["create", "edit", "delete"],
  asset: ["view", "create", "edit", "delete"],
  blogPost: ["create", "edit", "review", "delete"],
  legal: ["create", "edit", "review", "delete"]
})

export const admin = ac.newRole({
  user: ["create", "list", "set-role", "ban", "impersonate", "delete", "setRole"],
  organization: [],
  team: ["create", "edit", "delete"],
  member: ["create", "edit", "delete"],
  invitation: ["create", "delete"],
  project: ["create", "edit", "delete"],
  asset: ["view", "create", "edit", "delete"],
  blogPost: ["create", "edit", "review", "delete"],
  legal: ["create", "edit", "review", "delete"]
})

export const member = ac.newRole({
  user: ["create", "list"],
  organization: [],
  team: [],
  member: [],
  invitation: [],
  project: ["create", "edit", "delete"],
  asset: ["view", "create", "edit", "delete"],
  blogPost: ["create", "edit", "review", "delete"],
  legal: ["create", "edit", "review", "delete"]
})

export const user = ac.newRole({
  organization: [],
  team: [],
  member: [],
  invitation: [],
  project: [],
  asset: [],
  blogPost: [],
  legal: []
})
