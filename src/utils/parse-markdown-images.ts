import { transform } from "./transform";

const transformImgSrc = (e: string, quote: string) =>
  `src=${quote}${transform(e.substr(5, e.length - 6), { width: "600px" })}${quote}`;

export const parseMarkdownImages = (html: string) => {
  try {
    return html
      .replace(/src="([^"])*"/g, e => transformImgSrc(e, '"'))
      .replace(/src='([^'])*'/g, e => transformImgSrc(e, "'"));
  } catch {
    return html;
  }
};

export const listMarkdownImages = (html: string) => {
  const trimMatch1 = (src: string) => src.replace('src="', "").slice(0, -1);
  const trimMatch2 = (src: string) => src.replace("src='", "").slice(0, -1);
  const urls1 = html.match(/src="([^"])*"/g)?.map(trimMatch1) ?? [];
  const urls2 = html.match(/src='([^'])*'/g)?.map(trimMatch2) ?? [];
  return [...urls1, ...urls2].filter((value, index, self) => self.indexOf(value) === index);
};
