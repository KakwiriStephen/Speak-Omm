import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "knkrz2tc",
  dataset: "production",
  apiVersion: "2021-03-25",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);


