/**
 * Lets Conclave attach a Firebase ID token to BFF fetches without importing Firebase in fetch helpers.
 */

let idTokenProvider: () => Promise<string | null> = async () => null;

export function setConclaveFirebaseIdTokenProvider(fn: () => Promise<string | null>): void {
  idTokenProvider = fn;
}

export async function getConclaveAuthHeadersForFetch(): Promise<Record<string, string>> {
  try {
    const token = await idTokenProvider();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}
