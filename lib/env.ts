const requiredClientEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

const requiredServerEnv = {
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
} as const;

function findMissing(envMap: Record<string, string | undefined>) {
  return Object.entries(envMap)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

export function getClientEnv() {
  const missing = findMissing(requiredClientEnv);
  if (missing.length > 0) {
    throw new Error(`Missing required client env vars: ${missing.join(", ")}`);
  }

  return {
    supabaseUrl: requiredClientEnv.NEXT_PUBLIC_SUPABASE_URL as string,
    supabaseAnonKey: requiredClientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  };
}

export function getServerEnv() {
  const missing = findMissing({
    ...requiredClientEnv,
    ...requiredServerEnv,
  });

  if (missing.length > 0) {
    throw new Error(`Missing required server env vars: ${missing.join(", ")}`);
  }

  return {
    ...getClientEnv(),
    serviceRoleKey: requiredServerEnv.SUPABASE_SERVICE_ROLE_KEY as string,
  };
}

export function getEnvCheckSummary() {
  return {
    clientReady: findMissing(requiredClientEnv).length === 0,
    serverReady:
      findMissing({
        ...requiredClientEnv,
        ...requiredServerEnv,
      }).length === 0,
  };
}
