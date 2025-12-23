import { config } from "@growserver/config";
import { createAuthClient } from "better-auth/client";
import {
  adminClient,
  emailOTPClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient as createAuthClientVue } from "better-auth/vue";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return `https://${config.web.loginUrl}`;
};

export const authVanilla = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [usernameClient(), adminClient(), emailOTPClient()],
});


export const authVue = createAuthClientVue({
  baseURL: getBaseURL(),
  plugins: [usernameClient(), adminClient(), emailOTPClient()],
});
