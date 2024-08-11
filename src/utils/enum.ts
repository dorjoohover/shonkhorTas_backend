// user
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
export enum UserType {
  default = 'default',
  agent = 'agent',
  organization = 'organization',
  admin = 'admin',
  system = 'system',
}
export enum UserStatus {
  pending = 'pending',
  active = 'active',
  banned = 'banned',
  returned = 'returned',
}
export enum OrderStatus {
  pending = 'pending',
  active = 'active',
  banned = 'banned',
  returned = 'returned',
}



export enum ActionMessage {
  success = 'success',
  warning = 'warning',
  error = 'error',
}
