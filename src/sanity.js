import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "t22j0eh1",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN, 
});
