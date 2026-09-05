import { relations } from "drizzle-orm"
import {
  type AnySQLiteColumn,
  integer,
  sqliteTable,
  primaryKey,
  text,
  uniqueIndex,
  index
} from "drizzle-orm/sqlite-core"
import type { UserAvailability } from "#types/user"

// ============================================================================
// Core Auth Tables
// ============================================================================

export const user = sqliteTable(
  "user",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    name: text("name").notNull(),
    tag: text("tag").notNull().default("0000"),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
    image: text("image"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    availability: text("availability").$type<UserAvailability>().notNull().default("available"),
    status: text("status"),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    role: text("role"),
    banned: integer("banned", { mode: "boolean" }).default(false),
    banReason: text("ban_reason"),
    banExpires: integer("ban_expires", { mode: "timestamp" }),
    publicKey: text("public_key"),
    encryptedPrivateKey: text("encrypted_private_key"),
    derivationSalt: text("derivation_salt")
  },
  (table) => [uniqueIndex("user_name_tag_unique").on(table.name, table.tag)]
)

export const session = sqliteTable(
  "session",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
    activeOrganizationId: text("active_organization_id"),
    activeTeamId: text("active_team_id")
  },
  (table) => [index("session_userId_idx").on(table.userId)]
)

export const account = sqliteTable(
  "account",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
    scope: text("scope"),
    password: text("password"),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" })
  },
  (table) => [index("account_userId_idx").on(table.userId)]
)

export const verification = sqliteTable(
  "verification",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" })
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

export const rateLimit = sqliteTable("rate_limit", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  key: text("key"),
  count: integer("count"),
  lastRequest: integer("last_request")
})

// ============================================================================
// Organization Tables
// ============================================================================

export const organization = sqliteTable("organization", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
  metadata: text("metadata")
})

export const member = sqliteTable(
  "member",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: text("role").default("member").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" })
  },
  (table) => [
    index("member_organizationId_idx").on(table.organizationId),
    index("member_userId_idx").on(table.userId)
  ]
)

export const invitation = sqliteTable(
  "invitation",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").default("pending").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [
    index("invitation_organizationId_idx").on(table.organizationId),
    index("invitation_email_idx").on(table.email)
  ]
)

export const team = sqliteTable(
  "team",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .notNull()
      .primaryKey(),
    name: text("name").notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    parentId: text("parent_id").references((): AnySQLiteColumn => team.id, {
      onDelete: "cascade"
    }),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
    metadata: text("metadata")
  },
  (table) => [index("team_organizationId_idx").on(table.organizationId)]
)

export const teamMember = sqliteTable("team_member", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  teamId: text("team_id")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
})

// ============================================================================
// Note Tables (shared feature)
// ============================================================================

export const todo = sqliteTable("todo", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
})

export const note = sqliteTable("note", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title"),
  content: text("content"),
  isPinned: integer("is_pinned", { mode: "boolean" }).default(false).notNull(),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
})

export const noteLabel = sqliteTable("noteLabel", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .notNull()
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" })
})

export const note_noteLabel = sqliteTable(
  "note_noteLabel",
  {
    noteId: text("note_id")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),
    labelId: text("label_id")
      .notNull()
      .references(() => noteLabel.id, { onDelete: "cascade" })
  },
  (t) => [primaryKey({ columns: [t.noteId, t.labelId] })]
)

// ============================================================================
// Relations
// ============================================================================

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  members: many(member),
  invitations: many(invitation),
  notes: many(note),
  noteLabels: many(noteLabel),
  todos: many(todo),
  teamMembers: many(teamMember)
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}))

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
  teams: many(team)
}))

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id]
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id]
  })
}))

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id]
  }),
  user: one(user, {
    fields: [invitation.inviterId],
    references: [user.id]
  })
}))

export const teamRelations = relations(team, ({ one, many }) => ({
  organization: one(organization, {
    fields: [team.organizationId],
    references: [organization.id]
  }),
  parentTeam: one(team, {
    fields: [team.parentId],
    references: [team.id],
    relationName: "subteams"
  }),
  subteams: many(team, { relationName: "subteams" }),
  members: many(teamMember)
}))

export const teamMemberRelations = relations(teamMember, ({ one }) => ({
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.id]
  }),
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id]
  })
}))

export const noteRelations = relations(note, ({ one, many }) => ({
  user: one(user, {
    fields: [note.userId],
    references: [user.id]
  }),
  noteLabels: many(note_noteLabel)
}))

export const noteLabelRelations = relations(noteLabel, ({ one, many }) => ({
  user: one(user, {
    fields: [noteLabel.userId],
    references: [user.id]
  }),
  noteLabels: many(note_noteLabel)
}))

export const note_noteLabelRelations = relations(note_noteLabel, ({ one }) => ({
  note: one(note, {
    fields: [note_noteLabel.noteId],
    references: [note.id]
  }),
  label: one(noteLabel, {
    fields: [note_noteLabel.labelId],
    references: [noteLabel.id]
  })
}))

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, {
    fields: [todo.userId],
    references: [user.id]
  })
}))

// ============================================================================
// Type Exports
// ============================================================================

export type User = typeof user.$inferSelect
export type Session = typeof session.$inferSelect
export type Account = typeof account.$inferSelect
export type Verification = typeof verification.$inferSelect
export type Organization = typeof organization.$inferSelect
export type Member = typeof member.$inferSelect
export type Invitation = typeof invitation.$inferSelect
export type Team = typeof team.$inferSelect
export type TeamMember = typeof teamMember.$inferSelect
export type Note = typeof note.$inferSelect & {
  labels: Array<
    typeof note_noteLabel.$inferSelect & {
      label: typeof noteLabel.$inferSelect
    }
  >
}
export type Label = typeof noteLabel.$inferSelect
export type Todo = typeof todo.$inferSelect
