export const backendUrl: string | undefined =
  process.env.NEXT_PUBLIC_BACKEND_URL;

async function refreshAccess() {
  if (backendUrl) {
    try {
      const response = await fetch(`${backendUrl}/api/token/refresh/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to renew access token: ", error);
    }
  } else {
    console.error("Can't renew token. backendUrl not set.");
  }
}

export async function backendFetch(url: string, options = {}) {
  if (!backendUrl) {
    console.error("Cannot fetch. backendUrl is not set");
    return null;
  }

  // options.credentials = "include";

  // Proceed with the original fetch request
  return fetch(`${backendUrl}${url}`, options);
}
