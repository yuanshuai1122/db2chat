export enum DatabaseTypeCode {
  REDIS = 'REDIS',
  MEMCACHE = 'MEMCACHE',
}

export enum ConsoleOpenedStatus {
  IS_OPEN = 'y',
  NOT_OPEN = 'n',
}

export enum ConsoleStatus {
  DRAFT = 'DRAFT',
  RELEASE = 'RELEASE',
}

export enum OSType {
  WIN = 'Win',
  MAC = 'Mac',
  RESTS = 'rests',
}

export enum ConnectionKind {
  Private = 'PRIVATE',
  Shared = 'SHARED'
}

// 通用的增删改查枚举
export enum CRUD {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  UPDATE_COPY = 'UPDATE_COPY',
}
