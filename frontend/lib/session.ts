async function refreshAccess() {
  try {
    const response = await fetch(`/api/token/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to renew access token: ", error);
  }
}

export async function backendFetch(url: string, options = {}) {
  // options.credentials = "include";

  // Proceed with the original fetch request
  return fetch(`${url}`, options);
}
