import apiBaseUrl from "@/constants/variables";

export const Get = async ({ path }: { path: string }) => {
  try {
    return await fetch(`${apiBaseUrl()}/api/${path}`, {
      method: "GET",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};
export const Post = async ({ path, data }: { path: string; data: any }) => {
  try {
    return await fetch(`${apiBaseUrl()}/api/${path}`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};

const Http = {
  Post,
  Get,
};

export default Http;
