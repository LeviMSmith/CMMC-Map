export function getEnvVar(variable: string): string {
  const value: string | undefined = process.env[variable];
  if (!value) {
    throw new Error(`Required environment variable '${variable}' is not set.`);
  }

  return value;
}
