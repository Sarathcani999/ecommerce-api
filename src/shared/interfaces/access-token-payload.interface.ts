export interface AccessTokenPayload {
  _id: string
  name: string
  email: string
  role: string
  refreshToken: string
  billingAddress: BillingAddress
  __v: number
  iat: number
  exp: number
}

export interface BillingAddress {
  firstLine: string
  secondLine: string
  zip: string
  phone: string
  _id: string
}
