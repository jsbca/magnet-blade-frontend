export type UserRole = 'admin' | 'user' | null

const ROLE_STORAGE_KEY = 'role'

export function normalizeRole(role: unknown): UserRole {
  if (typeof role !== 'string') return null
  const upper = role.toUpperCase()
  if (upper.includes('ADMIN')) return 'admin'
  if (upper.includes('USER')) return 'user'
  return null
}

function decodeJwtPayload(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    )
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

export function resolveRoleFromToken(token: string | null): UserRole {
  if (!token) return null
  const payload = decodeJwtPayload(token)
  if (!payload) return null

  const role =
    payload.role ??
    payload.roles ??
    payload.authorities ??
    payload.authority ??
    payload.scope ??
    payload.scopes

  if (Array.isArray(role)) {
    return normalizeRole(role[0])
  }

  return normalizeRole(role)
}

export function getStoredRole(): UserRole {
  return normalizeRole(localStorage.getItem(ROLE_STORAGE_KEY))
}

export function setStoredRole(role: UserRole) {
  if (role) {
    localStorage.setItem(ROLE_STORAGE_KEY, role)
  }
}

export function clearStoredRole() {
  localStorage.removeItem(ROLE_STORAGE_KEY)
}

export function ensureRole(): UserRole {
  const token = localStorage.getItem('token')
  let role = getStoredRole()
  if (!role && token) {
    role = resolveRoleFromToken(token)
    if (role) {
      setStoredRole(role)
    }
  }
  return role
}
