const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function isRateLimited(key: string) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}
