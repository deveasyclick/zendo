// cast - type-safe casting of values
// Example usage: const user = cast<User>(clerkUser);
const cast = <T>(value: unknown): T => {
  return value as T;
};

export default cast;
