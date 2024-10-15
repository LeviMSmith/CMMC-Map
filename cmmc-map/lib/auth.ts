import NextAuth from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";

import { getEnvVar } from "@/lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    AzureAD({
      tenantId: getEnvVar("AUTH_AZURE_AD_TENANT_ID"),
      clientId: getEnvVar("AUTH_AZURE_AD_ID"),
      clientSecret: getEnvVar("AUTH_AZURE_AD_SECRET"),
    }),
  ],
});
