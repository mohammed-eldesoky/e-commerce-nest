export enum GENDER_TYPES {
  male = 'male',
  female = 'female',
}

export enum USER_AGENT {
  local = 'local',
  google = 'google',
  facebook = 'facebook',
}

export enum TOKEN_TYPES {
  access = 'access',
  refresh = 'refresh',
}

export enum discountType {
  fixed_amount = 'fixed_amount',
  percentage = 'percentage',
}

export enum PAYMENT_METHODS {
  COD = 'COD',
  CREDIT_CARD = 'CREDIT_CARD',
  E_WALLET = 'E_WALLET',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  PLACED = 'placed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}
