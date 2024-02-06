import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SkillScalarFieldEnumSchema = z.enum(['id','name','userId']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','emailVerified','name','gender','image','maritalStatus','volunteerStatus','preferredName','preferredCommunication','preferredStartDate','birthYear','residentialDistrict','roles','emergencyName','emergencyRelationship','emergencyPhone','created_at','updated_at']);

export const MetricsScalarFieldEnumSchema = z.enum(['id','type','unit','value','eventId']);

export const EventLocationScalarFieldEnumSchema = z.enum(['id','name','latitude','longitude','description']);

export const EventTagScalarFieldEnumSchema = z.enum(['name','eventId']);

export const EventRegistrationsScalarFieldEnumSchema = z.enum(['eventId','participant']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','timestamp','duration','details','approvalStatus','image','eventLocationId','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ApprovalStatusSchema = z.enum(['APPROVED','PENDING','CANCELLED']);

export type ApprovalStatusType = `${z.infer<typeof ApprovalStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SKILL SCHEMA
/////////////////////////////////////////

export const SkillSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.string().nullable(),
})

export type Skill = z.infer<typeof SkillSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  name: z.string().nullable(),
  gender: z.string().nullable(),
  image: z.string().nullable(),
  maritalStatus: z.string().nullable(),
  volunteerStatus: z.string().nullable(),
  preferredName: z.string().nullable(),
  preferredCommunication: z.string().nullable(),
  preferredStartDate: z.coerce.date().nullable(),
  birthYear: z.number().int().nullable(),
  residentialDistrict: z.number().int().nullable(),
  roles: z.string().array(),
  emergencyName: z.string().nullable(),
  emergencyRelationship: z.string().nullable(),
  emergencyPhone: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// METRICS SCHEMA
/////////////////////////////////////////

export const MetricsSchema = z.object({
  id: z.number().int(),
  type: z.string(),
  unit: z.string().nullable(),
  value: z.number(),
  eventId: z.number().int().nullable(),
})

export type Metrics = z.infer<typeof MetricsSchema>

/////////////////////////////////////////
// EVENT LOCATION SCHEMA
/////////////////////////////////////////

export const EventLocationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  description: z.string().nullable(),
})

export type EventLocation = z.infer<typeof EventLocationSchema>

/////////////////////////////////////////
// EVENT TAG SCHEMA
/////////////////////////////////////////

export const EventTagSchema = z.object({
  name: z.string(),
  eventId: z.number().int(),
})

export type EventTag = z.infer<typeof EventTagSchema>

/////////////////////////////////////////
// EVENT REGISTRATIONS SCHEMA
/////////////////////////////////////////

export const EventRegistrationsSchema = z.object({
  eventId: z.number().int(),
  participant: z.string(),
})

export type EventRegistrations = z.infer<typeof EventRegistrationsSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  approvalStatus: ApprovalStatusSchema,
  id: z.number().int(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  image: z.string().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SKILL
//------------------------------------------------------

export const SkillIncludeSchema: z.ZodType<Prisma.SkillInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SkillArgsSchema: z.ZodType<Prisma.SkillDefaultArgs> = z.object({
  select: z.lazy(() => SkillSelectSchema).optional(),
  include: z.lazy(() => SkillIncludeSchema).optional(),
}).strict();

export const SkillSelectSchema: z.ZodType<Prisma.SkillSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  skills: z.boolean().optional(),
  Account: z.boolean().optional(),
  Session: z.boolean().optional(),
  Event: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  name: z.boolean().optional(),
  gender: z.boolean().optional(),
  image: z.boolean().optional(),
  maritalStatus: z.boolean().optional(),
  volunteerStatus: z.boolean().optional(),
  preferredName: z.boolean().optional(),
  preferredCommunication: z.boolean().optional(),
  preferredStartDate: z.boolean().optional(),
  birthYear: z.boolean().optional(),
  residentialDistrict: z.boolean().optional(),
  roles: z.boolean().optional(),
  emergencyName: z.boolean().optional(),
  emergencyRelationship: z.boolean().optional(),
  emergencyPhone: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  skills: z.union([z.boolean(),z.lazy(() => SkillFindManyArgsSchema)]).optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// METRICS
//------------------------------------------------------

export const MetricsIncludeSchema: z.ZodType<Prisma.MetricsInclude> = z.object({
  Event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

export const MetricsArgsSchema: z.ZodType<Prisma.MetricsDefaultArgs> = z.object({
  select: z.lazy(() => MetricsSelectSchema).optional(),
  include: z.lazy(() => MetricsIncludeSchema).optional(),
}).strict();

export const MetricsSelectSchema: z.ZodType<Prisma.MetricsSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  unit: z.boolean().optional(),
  value: z.boolean().optional(),
  eventId: z.boolean().optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

// EVENT LOCATION
//------------------------------------------------------

export const EventLocationIncludeSchema: z.ZodType<Prisma.EventLocationInclude> = z.object({
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventLocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventLocationArgsSchema: z.ZodType<Prisma.EventLocationDefaultArgs> = z.object({
  select: z.lazy(() => EventLocationSelectSchema).optional(),
  include: z.lazy(() => EventLocationIncludeSchema).optional(),
}).strict();

export const EventLocationCountOutputTypeArgsSchema: z.ZodType<Prisma.EventLocationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventLocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventLocationCountOutputTypeSelectSchema: z.ZodType<Prisma.EventLocationCountOutputTypeSelect> = z.object({
  Event: z.boolean().optional(),
}).strict();

export const EventLocationSelectSchema: z.ZodType<Prisma.EventLocationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  description: z.boolean().optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventLocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT TAG
//------------------------------------------------------

export const EventTagIncludeSchema: z.ZodType<Prisma.EventTagInclude> = z.object({
  Event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

export const EventTagArgsSchema: z.ZodType<Prisma.EventTagDefaultArgs> = z.object({
  select: z.lazy(() => EventTagSelectSchema).optional(),
  include: z.lazy(() => EventTagIncludeSchema).optional(),
}).strict();

export const EventTagSelectSchema: z.ZodType<Prisma.EventTagSelect> = z.object({
  name: z.boolean().optional(),
  eventId: z.boolean().optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

// EVENT REGISTRATIONS
//------------------------------------------------------

export const EventRegistrationsIncludeSchema: z.ZodType<Prisma.EventRegistrationsInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

export const EventRegistrationsArgsSchema: z.ZodType<Prisma.EventRegistrationsDefaultArgs> = z.object({
  select: z.lazy(() => EventRegistrationsSelectSchema).optional(),
  include: z.lazy(() => EventRegistrationsIncludeSchema).optional(),
}).strict();

export const EventRegistrationsSelectSchema: z.ZodType<Prisma.EventRegistrationsSelect> = z.object({
  eventId: z.boolean().optional(),
  participant: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  location: z.union([z.boolean(),z.lazy(() => EventLocationArgsSchema)]).optional(),
  organiser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  metrics: z.union([z.boolean(),z.lazy(() => MetricsFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => EventTagFindManyArgsSchema)]).optional(),
  EventRegistrations: z.union([z.boolean(),z.lazy(() => EventRegistrationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  metrics: z.boolean().optional(),
  tags: z.boolean().optional(),
  EventRegistrations: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  duration: z.boolean().optional(),
  details: z.boolean().optional(),
  approvalStatus: z.boolean().optional(),
  image: z.boolean().optional(),
  eventLocationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  location: z.union([z.boolean(),z.lazy(() => EventLocationArgsSchema)]).optional(),
  organiser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  metrics: z.union([z.boolean(),z.lazy(() => MetricsFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => EventTagFindManyArgsSchema)]).optional(),
  EventRegistrations: z.union([z.boolean(),z.lazy(() => EventRegistrationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SkillWhereInputSchema: z.ZodType<Prisma.SkillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SkillOrderByWithRelationInputSchema: z.ZodType<Prisma.SkillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SkillWhereUniqueInputSchema: z.ZodType<Prisma.SkillWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillWhereInputSchema),z.lazy(() => SkillWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const SkillOrderByWithAggregationInputSchema: z.ZodType<Prisma.SkillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SkillCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SkillAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SkillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SkillMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SkillSumOrderByAggregateInputSchema).optional()
}).strict();

export const SkillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SkillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillScalarWhereWithAggregatesInputSchema),z.lazy(() => SkillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maritalStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  volunteerStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredCommunication: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredStartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  residentialDistrict: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  roles: z.lazy(() => StringNullableListFilterSchema).optional(),
  emergencyName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emergencyRelationship: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emergencyPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maritalStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  volunteerStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredCommunication: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredStartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  residentialDistrict: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roles: z.lazy(() => SortOrderSchema).optional(),
  emergencyName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emergencyRelationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emergencyPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SkillOrderByRelationAggregateInputSchema).optional(),
  Account: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  Event: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  maritalStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  volunteerStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredCommunication: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preferredStartDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthYear: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  residentialDistrict: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  roles: z.lazy(() => StringNullableListFilterSchema).optional(),
  emergencyName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emergencyRelationship: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emergencyPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  skills: z.lazy(() => SkillListRelationFilterSchema).optional(),
  Account: z.lazy(() => AccountListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maritalStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  volunteerStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredCommunication: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preferredStartDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthYear: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  residentialDistrict: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roles: z.lazy(() => SortOrderSchema).optional(),
  emergencyName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emergencyRelationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emergencyPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  maritalStatus: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  volunteerStatus: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  preferredName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  preferredCommunication: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  preferredStartDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  birthYear: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  residentialDistrict: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  roles: z.lazy(() => StringNullableListFilterSchema).optional(),
  emergencyName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emergencyRelationship: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emergencyPhone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MetricsWhereInputSchema: z.ZodType<Prisma.MetricsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MetricsWhereInputSchema),z.lazy(() => MetricsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetricsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetricsWhereInputSchema),z.lazy(() => MetricsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  Event: z.union([ z.lazy(() => EventNullableRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MetricsOrderByWithRelationInputSchema: z.ZodType<Prisma.MetricsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  unit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const MetricsWhereUniqueInputSchema: z.ZodType<Prisma.MetricsWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MetricsWhereInputSchema),z.lazy(() => MetricsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetricsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetricsWhereInputSchema),z.lazy(() => MetricsWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  Event: z.union([ z.lazy(() => EventNullableRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MetricsOrderByWithAggregationInputSchema: z.ZodType<Prisma.MetricsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  unit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MetricsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MetricsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MetricsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MetricsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MetricsSumOrderByAggregateInputSchema).optional()
}).strict();

export const MetricsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MetricsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MetricsScalarWhereWithAggregatesInputSchema),z.lazy(() => MetricsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetricsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetricsScalarWhereWithAggregatesInputSchema),z.lazy(() => MetricsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const EventLocationWhereInputSchema: z.ZodType<Prisma.EventLocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventLocationWhereInputSchema),z.lazy(() => EventLocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventLocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventLocationWhereInputSchema),z.lazy(() => EventLocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const EventLocationOrderByWithRelationInputSchema: z.ZodType<Prisma.EventLocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Event: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventLocationWhereUniqueInputSchema: z.ZodType<Prisma.EventLocationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EventLocationWhereInputSchema),z.lazy(() => EventLocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventLocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventLocationWhereInputSchema),z.lazy(() => EventLocationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const EventLocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventLocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  longitude: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EventLocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventLocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventLocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventLocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventLocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventLocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventLocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventLocationScalarWhereWithAggregatesInputSchema),z.lazy(() => EventLocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventLocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventLocationScalarWhereWithAggregatesInputSchema),z.lazy(() => EventLocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  longitude: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EventTagWhereInputSchema: z.ZodType<Prisma.EventTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict();

export const EventTagOrderByWithRelationInputSchema: z.ZodType<Prisma.EventTagOrderByWithRelationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  Event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const EventTagWhereUniqueInputSchema: z.ZodType<Prisma.EventTagWhereUniqueInput> = z.object({
  eventId_name: z.lazy(() => EventTagEventIdNameCompoundUniqueInputSchema)
})
.and(z.object({
  eventId_name: z.lazy(() => EventTagEventIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagWhereInputSchema),z.lazy(() => EventTagWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict());

export const EventTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventTagOrderByWithAggregationInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventTagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventTagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventTagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventTagSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema),z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema),z.lazy(() => EventTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const EventRegistrationsWhereInputSchema: z.ZodType<Prisma.EventRegistrationsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventRegistrationsWhereInputSchema),z.lazy(() => EventRegistrationsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventRegistrationsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventRegistrationsWhereInputSchema),z.lazy(() => EventRegistrationsWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  participant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsOrderByWithRelationInputSchema: z.ZodType<Prisma.EventRegistrationsOrderByWithRelationInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional(),
  participant: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional()
}).strict();

export const EventRegistrationsWhereUniqueInputSchema: z.ZodType<Prisma.EventRegistrationsWhereUniqueInput> = z.object({
  eventId_participant: z.lazy(() => EventRegistrationsEventIdParticipantCompoundUniqueInputSchema)
})
.and(z.object({
  eventId_participant: z.lazy(() => EventRegistrationsEventIdParticipantCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EventRegistrationsWhereInputSchema),z.lazy(() => EventRegistrationsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventRegistrationsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventRegistrationsWhereInputSchema),z.lazy(() => EventRegistrationsWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  participant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
}).strict());

export const EventRegistrationsOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventRegistrationsOrderByWithAggregationInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional(),
  participant: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventRegistrationsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventRegistrationsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventRegistrationsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventRegistrationsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventRegistrationsSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventRegistrationsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventRegistrationsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventRegistrationsScalarWhereWithAggregatesInputSchema),z.lazy(() => EventRegistrationsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventRegistrationsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventRegistrationsScalarWhereWithAggregatesInputSchema),z.lazy(() => EventRegistrationsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  participant: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventLocationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => EventLocationRelationFilterSchema),z.lazy(() => EventLocationWhereInputSchema) ]).optional(),
  organiser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsListRelationFilterSchema).optional(),
  tags: z.lazy(() => EventTagListRelationFilterSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => EventLocationOrderByWithRelationInputSchema).optional(),
  organiser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  metrics: z.lazy(() => MetricsOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => EventTagOrderByRelationAggregateInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventLocationId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  location: z.union([ z.lazy(() => EventLocationRelationFilterSchema),z.lazy(() => EventLocationWhereInputSchema) ]).optional(),
  organiser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsListRelationFilterSchema).optional(),
  tags: z.lazy(() => EventTagListRelationFilterSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsListRelationFilterSchema).optional()
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusWithAggregatesFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  eventLocationId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SkillCreateInputSchema: z.ZodType<Prisma.SkillCreateInput> = z.object({
  name: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutSkillsInputSchema).optional()
}).strict();

export const SkillUncheckedCreateInputSchema: z.ZodType<Prisma.SkillUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const SkillUpdateInputSchema: z.ZodType<Prisma.SkillUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutSkillsNestedInputSchema).optional()
}).strict();

export const SkillUncheckedUpdateInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SkillCreateManyInputSchema: z.ZodType<Prisma.SkillCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const SkillUpdateManyMutationInputSchema: z.ZodType<Prisma.SkillUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MetricsCreateInputSchema: z.ZodType<Prisma.MetricsCreateInput> = z.object({
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number(),
  Event: z.lazy(() => EventCreateNestedOneWithoutMetricsInputSchema).optional()
}).strict();

export const MetricsUncheckedCreateInputSchema: z.ZodType<Prisma.MetricsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number(),
  eventId: z.number().int().optional().nullable()
}).strict();

export const MetricsUpdateInputSchema: z.ZodType<Prisma.MetricsUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Event: z.lazy(() => EventUpdateOneWithoutMetricsNestedInputSchema).optional()
}).strict();

export const MetricsUncheckedUpdateInputSchema: z.ZodType<Prisma.MetricsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MetricsCreateManyInputSchema: z.ZodType<Prisma.MetricsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number(),
  eventId: z.number().int().optional().nullable()
}).strict();

export const MetricsUpdateManyMutationInputSchema: z.ZodType<Prisma.MetricsUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MetricsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MetricsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventLocationCreateInputSchema: z.ZodType<Prisma.EventLocationCreateInput> = z.object({
  name: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  Event: z.lazy(() => EventCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const EventLocationUncheckedCreateInputSchema: z.ZodType<Prisma.EventLocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  description: z.string().optional().nullable(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const EventLocationUpdateInputSchema: z.ZodType<Prisma.EventLocationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Event: z.lazy(() => EventUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const EventLocationUncheckedUpdateInputSchema: z.ZodType<Prisma.EventLocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const EventLocationCreateManyInputSchema: z.ZodType<Prisma.EventLocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const EventLocationUpdateManyMutationInputSchema: z.ZodType<Prisma.EventLocationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventLocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventLocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventTagCreateInputSchema: z.ZodType<Prisma.EventTagCreateInput> = z.object({
  name: z.string(),
  Event: z.lazy(() => EventCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const EventTagUncheckedCreateInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateInput> = z.object({
  name: z.string(),
  eventId: z.number().int()
}).strict();

export const EventTagUpdateInputSchema: z.ZodType<Prisma.EventTagUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Event: z.lazy(() => EventUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const EventTagUncheckedUpdateInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagCreateManyInputSchema: z.ZodType<Prisma.EventTagCreateManyInput> = z.object({
  name: z.string(),
  eventId: z.number().int()
}).strict();

export const EventTagUpdateManyMutationInputSchema: z.ZodType<Prisma.EventTagUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsCreateInputSchema: z.ZodType<Prisma.EventRegistrationsCreateInput> = z.object({
  participant: z.string(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventRegistrationsInputSchema)
}).strict();

export const EventRegistrationsUncheckedCreateInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedCreateInput> = z.object({
  eventId: z.number().int(),
  participant: z.string()
}).strict();

export const EventRegistrationsUpdateInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateInput> = z.object({
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutEventRegistrationsNestedInputSchema).optional()
}).strict();

export const EventRegistrationsUncheckedUpdateInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedUpdateInput> = z.object({
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsCreateManyInputSchema: z.ZodType<Prisma.EventRegistrationsCreateManyInput> = z.object({
  eventId: z.number().int(),
  participant: z.string()
}).strict();

export const EventRegistrationsUpdateManyMutationInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateManyMutationInput> = z.object({
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedUpdateManyInput> = z.object({
  eventId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  location: z.lazy(() => EventLocationCreateNestedOneWithoutEventInputSchema),
  organiser: z.lazy(() => UserCreateNestedOneWithoutEventInputSchema),
  metrics: z.lazy(() => MetricsCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string(),
  metrics: z.lazy(() => MetricsUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => EventLocationUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  organiser: z.lazy(() => UserUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  metrics: z.lazy(() => MetricsUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SkillCountOrderByAggregateInputSchema: z.ZodType<Prisma.SkillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SkillAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillMinOrderByAggregateInputSchema: z.ZodType<Prisma.SkillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SkillSumOrderByAggregateInputSchema: z.ZodType<Prisma.SkillSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SkillListRelationFilterSchema: z.ZodType<Prisma.SkillListRelationFilter> = z.object({
  every: z.lazy(() => SkillWhereInputSchema).optional(),
  some: z.lazy(() => SkillWhereInputSchema).optional(),
  none: z.lazy(() => SkillWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const SkillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SkillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  maritalStatus: z.lazy(() => SortOrderSchema).optional(),
  volunteerStatus: z.lazy(() => SortOrderSchema).optional(),
  preferredName: z.lazy(() => SortOrderSchema).optional(),
  preferredCommunication: z.lazy(() => SortOrderSchema).optional(),
  preferredStartDate: z.lazy(() => SortOrderSchema).optional(),
  birthYear: z.lazy(() => SortOrderSchema).optional(),
  residentialDistrict: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => SortOrderSchema).optional(),
  emergencyName: z.lazy(() => SortOrderSchema).optional(),
  emergencyRelationship: z.lazy(() => SortOrderSchema).optional(),
  emergencyPhone: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  birthYear: z.lazy(() => SortOrderSchema).optional(),
  residentialDistrict: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  maritalStatus: z.lazy(() => SortOrderSchema).optional(),
  volunteerStatus: z.lazy(() => SortOrderSchema).optional(),
  preferredName: z.lazy(() => SortOrderSchema).optional(),
  preferredCommunication: z.lazy(() => SortOrderSchema).optional(),
  preferredStartDate: z.lazy(() => SortOrderSchema).optional(),
  birthYear: z.lazy(() => SortOrderSchema).optional(),
  residentialDistrict: z.lazy(() => SortOrderSchema).optional(),
  emergencyName: z.lazy(() => SortOrderSchema).optional(),
  emergencyRelationship: z.lazy(() => SortOrderSchema).optional(),
  emergencyPhone: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  maritalStatus: z.lazy(() => SortOrderSchema).optional(),
  volunteerStatus: z.lazy(() => SortOrderSchema).optional(),
  preferredName: z.lazy(() => SortOrderSchema).optional(),
  preferredCommunication: z.lazy(() => SortOrderSchema).optional(),
  preferredStartDate: z.lazy(() => SortOrderSchema).optional(),
  birthYear: z.lazy(() => SortOrderSchema).optional(),
  residentialDistrict: z.lazy(() => SortOrderSchema).optional(),
  emergencyName: z.lazy(() => SortOrderSchema).optional(),
  emergencyRelationship: z.lazy(() => SortOrderSchema).optional(),
  emergencyPhone: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  birthYear: z.lazy(() => SortOrderSchema).optional(),
  residentialDistrict: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EventNullableRelationFilterSchema: z.ZodType<Prisma.EventNullableRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EventWhereInputSchema).optional().nullable()
}).strict();

export const MetricsCountOrderByAggregateInputSchema: z.ZodType<Prisma.MetricsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MetricsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MetricsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MetricsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MetricsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MetricsMinOrderByAggregateInputSchema: z.ZodType<Prisma.MetricsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MetricsSumOrderByAggregateInputSchema: z.ZodType<Prisma.MetricsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EventLocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventLocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventLocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventLocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventLocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventLocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventLocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventLocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventLocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventLocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventTagEventIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.EventTagEventIdNameCompoundUniqueInput> = z.object({
  eventId: z.number(),
  name: z.string()
}).strict();

export const EventTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagCountOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagAvgOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagMaxOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagMinOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventTagSumOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsEventIdParticipantCompoundUniqueInputSchema: z.ZodType<Prisma.EventRegistrationsEventIdParticipantCompoundUniqueInput> = z.object({
  eventId: z.number(),
  participant: z.string()
}).strict();

export const EventRegistrationsCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsCountOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional(),
  participant: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsAvgOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsMaxOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional(),
  participant: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsMinOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional(),
  participant: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsSumOrderByAggregateInput> = z.object({
  eventId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumApprovalStatusFilterSchema: z.ZodType<Prisma.EnumApprovalStatusFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusFilterSchema) ]).optional(),
}).strict();

export const EventLocationRelationFilterSchema: z.ZodType<Prisma.EventLocationRelationFilter> = z.object({
  is: z.lazy(() => EventLocationWhereInputSchema).optional(),
  isNot: z.lazy(() => EventLocationWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const MetricsListRelationFilterSchema: z.ZodType<Prisma.MetricsListRelationFilter> = z.object({
  every: z.lazy(() => MetricsWhereInputSchema).optional(),
  some: z.lazy(() => MetricsWhereInputSchema).optional(),
  none: z.lazy(() => MetricsWhereInputSchema).optional()
}).strict();

export const EventTagListRelationFilterSchema: z.ZodType<Prisma.EventTagListRelationFilter> = z.object({
  every: z.lazy(() => EventTagWhereInputSchema).optional(),
  some: z.lazy(() => EventTagWhereInputSchema).optional(),
  none: z.lazy(() => EventTagWhereInputSchema).optional()
}).strict();

export const EventRegistrationsListRelationFilterSchema: z.ZodType<Prisma.EventRegistrationsListRelationFilter> = z.object({
  every: z.lazy(() => EventRegistrationsWhereInputSchema).optional(),
  some: z.lazy(() => EventRegistrationsWhereInputSchema).optional(),
  none: z.lazy(() => EventRegistrationsWhereInputSchema).optional()
}).strict();

export const MetricsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MetricsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventRegistrationsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventRegistrationsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  approvalStatus: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  eventLocationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumApprovalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumApprovalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSkillsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSkillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const UserUpdateOneWithoutSkillsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutSkillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSkillsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSkillsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSkillsInputSchema),z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserCreaterolesInputSchema: z.ZodType<Prisma.UserCreaterolesInput> = z.object({
  set: z.string().array()
}).strict();

export const SkillCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutOrganiserInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutOrganiserInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventCreateWithoutOrganiserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema),z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOrganiserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SkillUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutOrganiserInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventCreateWithoutOrganiserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema),z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOrganiserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdaterolesInputSchema: z.ZodType<Prisma.UserUpdaterolesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SkillUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SkillUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutOrganiserNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutOrganiserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventCreateWithoutOrganiserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema),z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutOrganiserInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutOrganiserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOrganiserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutOrganiserInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutOrganiserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutOrganiserInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutOrganiserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillCreateWithoutUserInputSchema).array(),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema),z.lazy(() => SkillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SkillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SkillWhereUniqueInputSchema),z.lazy(() => SkillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SkillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SkillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutOrganiserNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutOrganiserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventCreateWithoutOrganiserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema),z.lazy(() => EventCreateOrConnectWithoutOrganiserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutOrganiserInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutOrganiserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyOrganiserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutOrganiserInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutOrganiserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutOrganiserInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutOrganiserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutMetricsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutMetricsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedCreateWithoutMetricsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutMetricsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EventUpdateOneWithoutMetricsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneWithoutMetricsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedCreateWithoutMetricsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutMetricsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutMetricsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EventWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EventWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutMetricsInputSchema),z.lazy(() => EventUpdateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMetricsInputSchema) ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventCreateWithoutLocationInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema),z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventCreateWithoutLocationInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema),z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EventUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventCreateWithoutLocationInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema),z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventCreateWithoutLocationInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema),z.lazy(() => EventCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => EventUpdateWithoutTagsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutEventRegistrationsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventRegistrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventRegistrationsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutEventRegistrationsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutEventRegistrationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventRegistrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventRegistrationsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutEventRegistrationsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutEventRegistrationsInputSchema),z.lazy(() => EventUpdateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventRegistrationsInputSchema) ]).optional(),
}).strict();

export const EventLocationCreateNestedOneWithoutEventInputSchema: z.ZodType<Prisma.EventLocationCreateNestedOneWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventLocationCreateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventLocationCreateOrConnectWithoutEventInputSchema).optional(),
  connect: z.lazy(() => EventLocationWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutEventInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEventInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEventInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MetricsCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.MetricsCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsCreateWithoutEventInputSchema).array(),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema),z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetricsCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventTagCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventTagCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagCreateWithoutEventInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventTagCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventRegistrationsCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema).array(),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventRegistrationsCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MetricsUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.MetricsUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsCreateWithoutEventInputSchema).array(),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema),z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetricsCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventTagUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagCreateWithoutEventInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventTagCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema).array(),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventRegistrationsCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumApprovalStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumApprovalStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ApprovalStatusSchema).optional()
}).strict();

export const EventLocationUpdateOneRequiredWithoutEventNestedInputSchema: z.ZodType<Prisma.EventLocationUpdateOneRequiredWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventLocationCreateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventLocationCreateOrConnectWithoutEventInputSchema).optional(),
  upsert: z.lazy(() => EventLocationUpsertWithoutEventInputSchema).optional(),
  connect: z.lazy(() => EventLocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventLocationUpdateToOneWithWhereWithoutEventInputSchema),z.lazy(() => EventLocationUpdateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedUpdateWithoutEventInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutEventNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEventInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEventInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEventInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEventInputSchema),z.lazy(() => UserUpdateWithoutEventInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventInputSchema) ]).optional(),
}).strict();

export const MetricsUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.MetricsUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsCreateWithoutEventInputSchema).array(),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema),z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetricsUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => MetricsUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetricsCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetricsUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => MetricsUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetricsUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => MetricsUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetricsScalarWhereInputSchema),z.lazy(() => MetricsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventTagUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventTagUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagCreateWithoutEventInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventTagCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventTagUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventTagUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventRegistrationsUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema).array(),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventRegistrationsUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventRegistrationsCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventRegistrationsUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventRegistrationsUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventRegistrationsScalarWhereInputSchema),z.lazy(() => EventRegistrationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MetricsUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.MetricsUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsCreateWithoutEventInputSchema).array(),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema),z.lazy(() => MetricsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MetricsUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => MetricsUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MetricsCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MetricsWhereUniqueInputSchema),z.lazy(() => MetricsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MetricsUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => MetricsUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MetricsUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => MetricsUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MetricsScalarWhereInputSchema),z.lazy(() => MetricsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagCreateWithoutEventInputSchema).array(),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventTagCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventTagUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventTagCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventTagWhereUniqueInputSchema),z.lazy(() => EventTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventTagUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventTagUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventTagUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema).array(),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventRegistrationsCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventRegistrationsUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventRegistrationsCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventRegistrationsWhereUniqueInputSchema),z.lazy(() => EventRegistrationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventRegistrationsUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventRegistrationsUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventRegistrationsUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventRegistrationsScalarWhereInputSchema),z.lazy(() => EventRegistrationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedEnumApprovalStatusFilterSchema: z.ZodType<Prisma.NestedEnumApprovalStatusFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumApprovalStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumApprovalStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ApprovalStatusSchema).optional(),
  in: z.lazy(() => ApprovalStatusSchema).array().optional(),
  notIn: z.lazy(() => ApprovalStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => NestedEnumApprovalStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumApprovalStatusFilterSchema).optional()
}).strict();

export const UserCreateWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSkillsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSkillsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSkillsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSkillsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSkillsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSkillsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSkillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSkillsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSkillsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSkillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const SkillCreateWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateWithoutUserInput> = z.object({
  name: z.string()
}).strict();

export const SkillUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const SkillCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SkillCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SkillCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SkillCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SkillCreateManyUserInputSchema),z.lazy(() => SkillCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventCreateWithoutOrganiserInputSchema: z.ZodType<Prisma.EventCreateWithoutOrganiserInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  location: z.lazy(() => EventLocationCreateNestedOneWithoutEventInputSchema),
  metrics: z.lazy(() => MetricsCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutOrganiserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  metrics: z.lazy(() => MetricsUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutOrganiserInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutOrganiserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema) ]),
}).strict();

export const EventCreateManyOrganiserInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyOrganiserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyOrganiserInputSchema),z.lazy(() => EventCreateManyOrganiserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SkillUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SkillUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SkillUpdateWithoutUserInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SkillCreateWithoutUserInputSchema),z.lazy(() => SkillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SkillUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SkillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateWithoutUserInputSchema),z.lazy(() => SkillUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SkillUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SkillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SkillUpdateManyMutationInputSchema),z.lazy(() => SkillUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SkillScalarWhereInputSchema: z.ZodType<Prisma.SkillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SkillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SkillScalarWhereInputSchema),z.lazy(() => SkillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutOrganiserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedUpdateWithoutOrganiserInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedCreateWithoutOrganiserInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutOrganiserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutOrganiserInputSchema),z.lazy(() => EventUncheckedUpdateWithoutOrganiserInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutOrganiserInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutOrganiserInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approvalStatus: z.union([ z.lazy(() => EnumApprovalStatusFilterSchema),z.lazy(() => ApprovalStatusSchema) ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  eventLocationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventCreateWithoutMetricsInputSchema: z.ZodType<Prisma.EventCreateWithoutMetricsInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  location: z.lazy(() => EventLocationCreateNestedOneWithoutEventInputSchema),
  organiser: z.lazy(() => UserCreateNestedOneWithoutEventInputSchema),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutMetricsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutMetricsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutMetricsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutMetricsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedCreateWithoutMetricsInputSchema) ]),
}).strict();

export const EventUpsertWithoutMetricsInputSchema: z.ZodType<Prisma.EventUpsertWithoutMetricsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMetricsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedCreateWithoutMetricsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutMetricsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutMetricsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutMetricsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutMetricsInputSchema) ]),
}).strict();

export const EventUpdateWithoutMetricsInputSchema: z.ZodType<Prisma.EventUpdateWithoutMetricsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => EventLocationUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  organiser: z.lazy(() => UserUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutMetricsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutMetricsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutLocationInputSchema: z.ZodType<Prisma.EventCreateWithoutLocationInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  organiser: z.lazy(() => UserCreateNestedOneWithoutEventInputSchema),
  metrics: z.lazy(() => MetricsCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  userId: z.string(),
  metrics: z.lazy(() => MetricsUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const EventCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyLocationInputSchema),z.lazy(() => EventCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutLocationInputSchema),z.lazy(() => EventUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutLocationInputSchema),z.lazy(() => EventUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutLocationInputSchema),z.lazy(() => EventUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutLocationInputSchema) ]),
}).strict();

export const EventCreateWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateWithoutTagsInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  location: z.lazy(() => EventLocationCreateNestedOneWithoutEventInputSchema),
  organiser: z.lazy(() => UserCreateNestedOneWithoutEventInputSchema),
  metrics: z.lazy(() => MetricsCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutTagsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string(),
  metrics: z.lazy(() => MetricsUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const EventUpsertWithoutTagsInputSchema: z.ZodType<Prisma.EventUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutTagsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutTagsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutTagsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const EventUpdateWithoutTagsInputSchema: z.ZodType<Prisma.EventUpdateWithoutTagsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => EventLocationUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  organiser: z.lazy(() => UserUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  metrics: z.lazy(() => MetricsUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventCreateWithoutEventRegistrationsInput> = z.object({
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  location: z.lazy(() => EventLocationCreateNestedOneWithoutEventInputSchema),
  organiser: z.lazy(() => UserCreateNestedOneWithoutEventInputSchema),
  metrics: z.lazy(() => MetricsCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutEventRegistrationsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int(),
  userId: z.string(),
  metrics: z.lazy(() => MetricsUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutEventRegistrationsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventRegistrationsInputSchema) ]),
}).strict();

export const EventUpsertWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventUpsertWithoutEventRegistrationsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventRegistrationsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventRegistrationsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutEventRegistrationsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutEventRegistrationsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventRegistrationsInputSchema) ]),
}).strict();

export const EventUpdateWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventUpdateWithoutEventRegistrationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => EventLocationUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  organiser: z.lazy(() => UserUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  metrics: z.lazy(() => MetricsUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutEventRegistrationsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutEventRegistrationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventLocationCreateWithoutEventInputSchema: z.ZodType<Prisma.EventLocationCreateWithoutEventInput> = z.object({
  name: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const EventLocationUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventLocationUncheckedCreateWithoutEventInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  description: z.string().optional().nullable()
}).strict();

export const EventLocationCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventLocationCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventLocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventLocationCreateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const UserCreateWithoutEventInputSchema: z.ZodType<Prisma.UserCreateWithoutEventInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEventInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const MetricsCreateWithoutEventInputSchema: z.ZodType<Prisma.MetricsCreateWithoutEventInput> = z.object({
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number()
}).strict();

export const MetricsUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.MetricsUncheckedCreateWithoutEventInput> = z.object({
  id: z.number().int().optional(),
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number()
}).strict();

export const MetricsCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.MetricsCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => MetricsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const MetricsCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.MetricsCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MetricsCreateManyEventInputSchema),z.lazy(() => MetricsCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventTagCreateWithoutEventInputSchema: z.ZodType<Prisma.EventTagCreateWithoutEventInput> = z.object({
  name: z.string()
}).strict();

export const EventTagUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventTagUncheckedCreateWithoutEventInput> = z.object({
  name: z.string()
}).strict();

export const EventTagCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventTagCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventTagCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.EventTagCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventTagCreateManyEventInputSchema),z.lazy(() => EventTagCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventRegistrationsCreateWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsCreateWithoutEventInput> = z.object({
  participant: z.string()
}).strict();

export const EventRegistrationsUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedCreateWithoutEventInput> = z.object({
  participant: z.string()
}).strict();

export const EventRegistrationsCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventRegistrationsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventRegistrationsCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.EventRegistrationsCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventRegistrationsCreateManyEventInputSchema),z.lazy(() => EventRegistrationsCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventLocationUpsertWithoutEventInputSchema: z.ZodType<Prisma.EventLocationUpsertWithoutEventInput> = z.object({
  update: z.union([ z.lazy(() => EventLocationUpdateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventLocationCreateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedCreateWithoutEventInputSchema) ]),
  where: z.lazy(() => EventLocationWhereInputSchema).optional()
}).strict();

export const EventLocationUpdateToOneWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventLocationUpdateToOneWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventLocationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventLocationUpdateWithoutEventInputSchema),z.lazy(() => EventLocationUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventLocationUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventLocationUpdateWithoutEventInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventLocationUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventLocationUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  longitude: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutEventInputSchema: z.ZodType<Prisma.UserUpsertWithoutEventInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEventInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEventInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEventInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEventInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const UserUpdateWithoutEventInputSchema: z.ZodType<Prisma.UserUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MetricsUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.MetricsUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => MetricsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MetricsUpdateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => MetricsCreateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const MetricsUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.MetricsUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => MetricsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MetricsUpdateWithoutEventInputSchema),z.lazy(() => MetricsUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const MetricsUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.MetricsUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => MetricsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MetricsUpdateManyMutationInputSchema),z.lazy(() => MetricsUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const MetricsScalarWhereInputSchema: z.ZodType<Prisma.MetricsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MetricsScalarWhereInputSchema),z.lazy(() => MetricsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MetricsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MetricsScalarWhereInputSchema),z.lazy(() => MetricsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  value: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  eventId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const EventTagUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventTagUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventTagUpdateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventTagCreateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventTagUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventTagUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventTagUpdateWithoutEventInputSchema),z.lazy(() => EventTagUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventTagUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventTagUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventTagUpdateManyMutationInputSchema),z.lazy(() => EventTagUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const EventTagScalarWhereInputSchema: z.ZodType<Prisma.EventTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventTagScalarWhereInputSchema),z.lazy(() => EventTagScalarWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const EventRegistrationsUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventRegistrationsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventRegistrationsUpdateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventRegistrationsCreateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventRegistrationsUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventRegistrationsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventRegistrationsUpdateWithoutEventInputSchema),z.lazy(() => EventRegistrationsUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventRegistrationsUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventRegistrationsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventRegistrationsUpdateManyMutationInputSchema),z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const EventRegistrationsScalarWhereInputSchema: z.ZodType<Prisma.EventRegistrationsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventRegistrationsScalarWhereInputSchema),z.lazy(() => EventRegistrationsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventRegistrationsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventRegistrationsScalarWhereInputSchema),z.lazy(() => EventRegistrationsScalarWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  participant: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  name: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  volunteerStatus: z.string().optional().nullable(),
  preferredName: z.string().optional().nullable(),
  preferredCommunication: z.string().optional().nullable(),
  preferredStartDate: z.coerce.date().optional().nullable(),
  birthYear: z.number().int().optional().nullable(),
  residentialDistrict: z.number().int().optional().nullable(),
  roles: z.union([ z.lazy(() => UserCreaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.string().optional().nullable(),
  emergencyRelationship: z.string().optional().nullable(),
  emergencyPhone: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  skills: z.lazy(() => SkillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutOrganiserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maritalStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volunteerStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredCommunication: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preferredStartDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthYear: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residentialDistrict: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roles: z.union([ z.lazy(() => UserUpdaterolesInputSchema),z.string().array() ]).optional(),
  emergencyName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyRelationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emergencyPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  skills: z.lazy(() => SkillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutOrganiserNestedInputSchema).optional()
}).strict();

export const SkillCreateManyUserInputSchema: z.ZodType<Prisma.SkillCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const EventCreateManyOrganiserInputSchema: z.ZodType<Prisma.EventCreateManyOrganiserInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  eventLocationId: z.number().int()
}).strict();

export const SkillUpdateWithoutUserInputSchema: z.ZodType<Prisma.SkillUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SkillUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SkillUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUpdateWithoutOrganiserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.lazy(() => EventLocationUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  metrics: z.lazy(() => MetricsUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutOrganiserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutOrganiserInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutOrganiserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventLocationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateManyLocationInputSchema: z.ZodType<Prisma.EventCreateManyLocationInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  timestamp: z.coerce.date(),
  duration: z.number().int(),
  details: z.string(),
  approvalStatus: z.lazy(() => ApprovalStatusSchema).optional(),
  image: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const EventUpdateWithoutLocationInputSchema: z.ZodType<Prisma.EventUpdateWithoutLocationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organiser: z.lazy(() => UserUpdateOneRequiredWithoutEventNestedInputSchema).optional(),
  metrics: z.lazy(() => MetricsUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metrics: z.lazy(() => MetricsUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  tags: z.lazy(() => EventTagUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  EventRegistrations: z.lazy(() => EventRegistrationsUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutLocationInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutLocationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approvalStatus: z.union([ z.lazy(() => ApprovalStatusSchema),z.lazy(() => EnumApprovalStatusFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MetricsCreateManyEventInputSchema: z.ZodType<Prisma.MetricsCreateManyEventInput> = z.object({
  id: z.number().int().optional(),
  type: z.string(),
  unit: z.string().optional().nullable(),
  value: z.number()
}).strict();

export const EventTagCreateManyEventInputSchema: z.ZodType<Prisma.EventTagCreateManyEventInput> = z.object({
  name: z.string()
}).strict();

export const EventRegistrationsCreateManyEventInputSchema: z.ZodType<Prisma.EventRegistrationsCreateManyEventInput> = z.object({
  participant: z.string()
}).strict();

export const MetricsUpdateWithoutEventInputSchema: z.ZodType<Prisma.MetricsUpdateWithoutEventInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MetricsUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.MetricsUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MetricsUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.MetricsUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventTagUpdateWithoutEventInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateWithoutEventInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventTagUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.EventTagUncheckedUpdateManyWithoutEventInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUpdateWithoutEventInput> = z.object({
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedUpdateWithoutEventInput> = z.object({
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventRegistrationsUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.EventRegistrationsUncheckedUpdateManyWithoutEventInput> = z.object({
  participant: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SkillFindFirstArgsSchema: z.ZodType<Prisma.SkillFindFirstArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SkillFindFirstOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillFindManyArgsSchema: z.ZodType<Prisma.SkillFindManyArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SkillScalarFieldEnumSchema,SkillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SkillAggregateArgsSchema: z.ZodType<Prisma.SkillAggregateArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithRelationInputSchema.array(),SkillOrderByWithRelationInputSchema ]).optional(),
  cursor: SkillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillGroupByArgsSchema: z.ZodType<Prisma.SkillGroupByArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
  orderBy: z.union([ SkillOrderByWithAggregationInputSchema.array(),SkillOrderByWithAggregationInputSchema ]).optional(),
  by: SkillScalarFieldEnumSchema.array(),
  having: SkillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SkillFindUniqueArgsSchema: z.ZodType<Prisma.SkillFindUniqueArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SkillFindUniqueOrThrowArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const MetricsFindFirstArgsSchema: z.ZodType<Prisma.MetricsFindFirstArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereInputSchema.optional(),
  orderBy: z.union([ MetricsOrderByWithRelationInputSchema.array(),MetricsOrderByWithRelationInputSchema ]).optional(),
  cursor: MetricsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MetricsScalarFieldEnumSchema,MetricsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MetricsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MetricsFindFirstOrThrowArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereInputSchema.optional(),
  orderBy: z.union([ MetricsOrderByWithRelationInputSchema.array(),MetricsOrderByWithRelationInputSchema ]).optional(),
  cursor: MetricsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MetricsScalarFieldEnumSchema,MetricsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MetricsFindManyArgsSchema: z.ZodType<Prisma.MetricsFindManyArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereInputSchema.optional(),
  orderBy: z.union([ MetricsOrderByWithRelationInputSchema.array(),MetricsOrderByWithRelationInputSchema ]).optional(),
  cursor: MetricsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MetricsScalarFieldEnumSchema,MetricsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MetricsAggregateArgsSchema: z.ZodType<Prisma.MetricsAggregateArgs> = z.object({
  where: MetricsWhereInputSchema.optional(),
  orderBy: z.union([ MetricsOrderByWithRelationInputSchema.array(),MetricsOrderByWithRelationInputSchema ]).optional(),
  cursor: MetricsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MetricsGroupByArgsSchema: z.ZodType<Prisma.MetricsGroupByArgs> = z.object({
  where: MetricsWhereInputSchema.optional(),
  orderBy: z.union([ MetricsOrderByWithAggregationInputSchema.array(),MetricsOrderByWithAggregationInputSchema ]).optional(),
  by: MetricsScalarFieldEnumSchema.array(),
  having: MetricsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MetricsFindUniqueArgsSchema: z.ZodType<Prisma.MetricsFindUniqueArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereUniqueInputSchema,
}).strict() ;

export const MetricsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MetricsFindUniqueOrThrowArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereUniqueInputSchema,
}).strict() ;

export const EventLocationFindFirstArgsSchema: z.ZodType<Prisma.EventLocationFindFirstArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereInputSchema.optional(),
  orderBy: z.union([ EventLocationOrderByWithRelationInputSchema.array(),EventLocationOrderByWithRelationInputSchema ]).optional(),
  cursor: EventLocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventLocationScalarFieldEnumSchema,EventLocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventLocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventLocationFindFirstOrThrowArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereInputSchema.optional(),
  orderBy: z.union([ EventLocationOrderByWithRelationInputSchema.array(),EventLocationOrderByWithRelationInputSchema ]).optional(),
  cursor: EventLocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventLocationScalarFieldEnumSchema,EventLocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventLocationFindManyArgsSchema: z.ZodType<Prisma.EventLocationFindManyArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereInputSchema.optional(),
  orderBy: z.union([ EventLocationOrderByWithRelationInputSchema.array(),EventLocationOrderByWithRelationInputSchema ]).optional(),
  cursor: EventLocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventLocationScalarFieldEnumSchema,EventLocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventLocationAggregateArgsSchema: z.ZodType<Prisma.EventLocationAggregateArgs> = z.object({
  where: EventLocationWhereInputSchema.optional(),
  orderBy: z.union([ EventLocationOrderByWithRelationInputSchema.array(),EventLocationOrderByWithRelationInputSchema ]).optional(),
  cursor: EventLocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventLocationGroupByArgsSchema: z.ZodType<Prisma.EventLocationGroupByArgs> = z.object({
  where: EventLocationWhereInputSchema.optional(),
  orderBy: z.union([ EventLocationOrderByWithAggregationInputSchema.array(),EventLocationOrderByWithAggregationInputSchema ]).optional(),
  by: EventLocationScalarFieldEnumSchema.array(),
  having: EventLocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventLocationFindUniqueArgsSchema: z.ZodType<Prisma.EventLocationFindUniqueArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereUniqueInputSchema,
}).strict() ;

export const EventLocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventLocationFindUniqueOrThrowArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereUniqueInputSchema,
}).strict() ;

export const EventTagFindFirstArgsSchema: z.ZodType<Prisma.EventTagFindFirstArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventTagFindFirstOrThrowArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagFindManyArgsSchema: z.ZodType<Prisma.EventTagFindManyArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventTagScalarFieldEnumSchema,EventTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventTagAggregateArgsSchema: z.ZodType<Prisma.EventTagAggregateArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithRelationInputSchema.array(),EventTagOrderByWithRelationInputSchema ]).optional(),
  cursor: EventTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventTagGroupByArgsSchema: z.ZodType<Prisma.EventTagGroupByArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
  orderBy: z.union([ EventTagOrderByWithAggregationInputSchema.array(),EventTagOrderByWithAggregationInputSchema ]).optional(),
  by: EventTagScalarFieldEnumSchema.array(),
  having: EventTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventTagFindUniqueArgsSchema: z.ZodType<Prisma.EventTagFindUniqueArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventTagFindUniqueOrThrowArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventRegistrationsFindFirstArgsSchema: z.ZodType<Prisma.EventRegistrationsFindFirstArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereInputSchema.optional(),
  orderBy: z.union([ EventRegistrationsOrderByWithRelationInputSchema.array(),EventRegistrationsOrderByWithRelationInputSchema ]).optional(),
  cursor: EventRegistrationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventRegistrationsScalarFieldEnumSchema,EventRegistrationsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventRegistrationsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventRegistrationsFindFirstOrThrowArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereInputSchema.optional(),
  orderBy: z.union([ EventRegistrationsOrderByWithRelationInputSchema.array(),EventRegistrationsOrderByWithRelationInputSchema ]).optional(),
  cursor: EventRegistrationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventRegistrationsScalarFieldEnumSchema,EventRegistrationsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventRegistrationsFindManyArgsSchema: z.ZodType<Prisma.EventRegistrationsFindManyArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereInputSchema.optional(),
  orderBy: z.union([ EventRegistrationsOrderByWithRelationInputSchema.array(),EventRegistrationsOrderByWithRelationInputSchema ]).optional(),
  cursor: EventRegistrationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventRegistrationsScalarFieldEnumSchema,EventRegistrationsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventRegistrationsAggregateArgsSchema: z.ZodType<Prisma.EventRegistrationsAggregateArgs> = z.object({
  where: EventRegistrationsWhereInputSchema.optional(),
  orderBy: z.union([ EventRegistrationsOrderByWithRelationInputSchema.array(),EventRegistrationsOrderByWithRelationInputSchema ]).optional(),
  cursor: EventRegistrationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventRegistrationsGroupByArgsSchema: z.ZodType<Prisma.EventRegistrationsGroupByArgs> = z.object({
  where: EventRegistrationsWhereInputSchema.optional(),
  orderBy: z.union([ EventRegistrationsOrderByWithAggregationInputSchema.array(),EventRegistrationsOrderByWithAggregationInputSchema ]).optional(),
  by: EventRegistrationsScalarFieldEnumSchema.array(),
  having: EventRegistrationsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventRegistrationsFindUniqueArgsSchema: z.ZodType<Prisma.EventRegistrationsFindUniqueArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereUniqueInputSchema,
}).strict() ;

export const EventRegistrationsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventRegistrationsFindUniqueOrThrowArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const SkillCreateArgsSchema: z.ZodType<Prisma.SkillCreateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
}).strict() ;

export const SkillUpsertArgsSchema: z.ZodType<Prisma.SkillUpsertArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
  create: z.union([ SkillCreateInputSchema,SkillUncheckedCreateInputSchema ]),
  update: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
}).strict() ;

export const SkillCreateManyArgsSchema: z.ZodType<Prisma.SkillCreateManyArgs> = z.object({
  data: z.union([ SkillCreateManyInputSchema,SkillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SkillDeleteArgsSchema: z.ZodType<Prisma.SkillDeleteArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateArgsSchema: z.ZodType<Prisma.SkillUpdateArgs> = z.object({
  select: SkillSelectSchema.optional(),
  include: SkillIncludeSchema.optional(),
  data: z.union([ SkillUpdateInputSchema,SkillUncheckedUpdateInputSchema ]),
  where: SkillWhereUniqueInputSchema,
}).strict() ;

export const SkillUpdateManyArgsSchema: z.ZodType<Prisma.SkillUpdateManyArgs> = z.object({
  data: z.union([ SkillUpdateManyMutationInputSchema,SkillUncheckedUpdateManyInputSchema ]),
  where: SkillWhereInputSchema.optional(),
}).strict() ;

export const SkillDeleteManyArgsSchema: z.ZodType<Prisma.SkillDeleteManyArgs> = z.object({
  where: SkillWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const MetricsCreateArgsSchema: z.ZodType<Prisma.MetricsCreateArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  data: z.union([ MetricsCreateInputSchema,MetricsUncheckedCreateInputSchema ]),
}).strict() ;

export const MetricsUpsertArgsSchema: z.ZodType<Prisma.MetricsUpsertArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereUniqueInputSchema,
  create: z.union([ MetricsCreateInputSchema,MetricsUncheckedCreateInputSchema ]),
  update: z.union([ MetricsUpdateInputSchema,MetricsUncheckedUpdateInputSchema ]),
}).strict() ;

export const MetricsCreateManyArgsSchema: z.ZodType<Prisma.MetricsCreateManyArgs> = z.object({
  data: z.union([ MetricsCreateManyInputSchema,MetricsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MetricsDeleteArgsSchema: z.ZodType<Prisma.MetricsDeleteArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  where: MetricsWhereUniqueInputSchema,
}).strict() ;

export const MetricsUpdateArgsSchema: z.ZodType<Prisma.MetricsUpdateArgs> = z.object({
  select: MetricsSelectSchema.optional(),
  include: MetricsIncludeSchema.optional(),
  data: z.union([ MetricsUpdateInputSchema,MetricsUncheckedUpdateInputSchema ]),
  where: MetricsWhereUniqueInputSchema,
}).strict() ;

export const MetricsUpdateManyArgsSchema: z.ZodType<Prisma.MetricsUpdateManyArgs> = z.object({
  data: z.union([ MetricsUpdateManyMutationInputSchema,MetricsUncheckedUpdateManyInputSchema ]),
  where: MetricsWhereInputSchema.optional(),
}).strict() ;

export const MetricsDeleteManyArgsSchema: z.ZodType<Prisma.MetricsDeleteManyArgs> = z.object({
  where: MetricsWhereInputSchema.optional(),
}).strict() ;

export const EventLocationCreateArgsSchema: z.ZodType<Prisma.EventLocationCreateArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  data: z.union([ EventLocationCreateInputSchema,EventLocationUncheckedCreateInputSchema ]),
}).strict() ;

export const EventLocationUpsertArgsSchema: z.ZodType<Prisma.EventLocationUpsertArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereUniqueInputSchema,
  create: z.union([ EventLocationCreateInputSchema,EventLocationUncheckedCreateInputSchema ]),
  update: z.union([ EventLocationUpdateInputSchema,EventLocationUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventLocationCreateManyArgsSchema: z.ZodType<Prisma.EventLocationCreateManyArgs> = z.object({
  data: z.union([ EventLocationCreateManyInputSchema,EventLocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventLocationDeleteArgsSchema: z.ZodType<Prisma.EventLocationDeleteArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  where: EventLocationWhereUniqueInputSchema,
}).strict() ;

export const EventLocationUpdateArgsSchema: z.ZodType<Prisma.EventLocationUpdateArgs> = z.object({
  select: EventLocationSelectSchema.optional(),
  include: EventLocationIncludeSchema.optional(),
  data: z.union([ EventLocationUpdateInputSchema,EventLocationUncheckedUpdateInputSchema ]),
  where: EventLocationWhereUniqueInputSchema,
}).strict() ;

export const EventLocationUpdateManyArgsSchema: z.ZodType<Prisma.EventLocationUpdateManyArgs> = z.object({
  data: z.union([ EventLocationUpdateManyMutationInputSchema,EventLocationUncheckedUpdateManyInputSchema ]),
  where: EventLocationWhereInputSchema.optional(),
}).strict() ;

export const EventLocationDeleteManyArgsSchema: z.ZodType<Prisma.EventLocationDeleteManyArgs> = z.object({
  where: EventLocationWhereInputSchema.optional(),
}).strict() ;

export const EventTagCreateArgsSchema: z.ZodType<Prisma.EventTagCreateArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  data: z.union([ EventTagCreateInputSchema,EventTagUncheckedCreateInputSchema ]),
}).strict() ;

export const EventTagUpsertArgsSchema: z.ZodType<Prisma.EventTagUpsertArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
  create: z.union([ EventTagCreateInputSchema,EventTagUncheckedCreateInputSchema ]),
  update: z.union([ EventTagUpdateInputSchema,EventTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventTagCreateManyArgsSchema: z.ZodType<Prisma.EventTagCreateManyArgs> = z.object({
  data: z.union([ EventTagCreateManyInputSchema,EventTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventTagDeleteArgsSchema: z.ZodType<Prisma.EventTagDeleteArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagUpdateArgsSchema: z.ZodType<Prisma.EventTagUpdateArgs> = z.object({
  select: EventTagSelectSchema.optional(),
  include: EventTagIncludeSchema.optional(),
  data: z.union([ EventTagUpdateInputSchema,EventTagUncheckedUpdateInputSchema ]),
  where: EventTagWhereUniqueInputSchema,
}).strict() ;

export const EventTagUpdateManyArgsSchema: z.ZodType<Prisma.EventTagUpdateManyArgs> = z.object({
  data: z.union([ EventTagUpdateManyMutationInputSchema,EventTagUncheckedUpdateManyInputSchema ]),
  where: EventTagWhereInputSchema.optional(),
}).strict() ;

export const EventTagDeleteManyArgsSchema: z.ZodType<Prisma.EventTagDeleteManyArgs> = z.object({
  where: EventTagWhereInputSchema.optional(),
}).strict() ;

export const EventRegistrationsCreateArgsSchema: z.ZodType<Prisma.EventRegistrationsCreateArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  data: z.union([ EventRegistrationsCreateInputSchema,EventRegistrationsUncheckedCreateInputSchema ]),
}).strict() ;

export const EventRegistrationsUpsertArgsSchema: z.ZodType<Prisma.EventRegistrationsUpsertArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereUniqueInputSchema,
  create: z.union([ EventRegistrationsCreateInputSchema,EventRegistrationsUncheckedCreateInputSchema ]),
  update: z.union([ EventRegistrationsUpdateInputSchema,EventRegistrationsUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventRegistrationsCreateManyArgsSchema: z.ZodType<Prisma.EventRegistrationsCreateManyArgs> = z.object({
  data: z.union([ EventRegistrationsCreateManyInputSchema,EventRegistrationsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventRegistrationsDeleteArgsSchema: z.ZodType<Prisma.EventRegistrationsDeleteArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  where: EventRegistrationsWhereUniqueInputSchema,
}).strict() ;

export const EventRegistrationsUpdateArgsSchema: z.ZodType<Prisma.EventRegistrationsUpdateArgs> = z.object({
  select: EventRegistrationsSelectSchema.optional(),
  include: EventRegistrationsIncludeSchema.optional(),
  data: z.union([ EventRegistrationsUpdateInputSchema,EventRegistrationsUncheckedUpdateInputSchema ]),
  where: EventRegistrationsWhereUniqueInputSchema,
}).strict() ;

export const EventRegistrationsUpdateManyArgsSchema: z.ZodType<Prisma.EventRegistrationsUpdateManyArgs> = z.object({
  data: z.union([ EventRegistrationsUpdateManyMutationInputSchema,EventRegistrationsUncheckedUpdateManyInputSchema ]),
  where: EventRegistrationsWhereInputSchema.optional(),
}).strict() ;

export const EventRegistrationsDeleteManyArgsSchema: z.ZodType<Prisma.EventRegistrationsDeleteManyArgs> = z.object({
  where: EventRegistrationsWhereInputSchema.optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;