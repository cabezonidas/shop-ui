import { transform } from "./transform";

const transformImgSrc = (e: string) =>
  `src="${transform(e.substr(5, e.length - 6), { width: "600px" })}"`;

export const parseMarkdownImages = (html: string) => {
  try {
    return html
      .replace(/src="([^"])*"/g, transformImgSrc)
      .replace(/src='([^'])*'/g, transformImgSrc);
  } catch {
    return html;
  }
};
