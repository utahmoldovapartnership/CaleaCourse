export const INVITE_CODE = "CALE-A2026";

export function normalizeInviteCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidInviteCode(code: string): boolean {
  return normalizeInviteCode(code) === INVITE_CODE;
}
