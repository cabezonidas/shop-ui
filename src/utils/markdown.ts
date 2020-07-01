import { getLanguage, highlight, highlightAuto } from "highlight.js";
import MarkdownIt from "markdown-it";
import markdownItAbbr from "markdown-it-abbr";
import markdownItDeflist from "markdown-it-deflist";
import markdownItEmoji from "markdown-it-emoji";
import markdownItDootnote from "markdown-it-footnote";
import markdownItIns from "markdown-it-ins";
import markdownItMark from "markdown-it-mark";
import markdownItSub from "markdown-it-sub";
import markdownItSup from "markdown-it-sup";
import markdownItVideo from "markdown-it-video";
import { listMarkdownImages } from "./parse-markdown-images";

export const markdown = MarkdownIt({
  html: false,
  xhtmlOut: true,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: (str: string, lang: string) => {
    if (lang && getLanguage(lang)) {
      try {
        return highlight(lang, str).value;
      } catch (__) {
        return "";
      }
    }
    try {
      return highlightAuto(str).value;
    } catch (__) {
      return "";
    }
  },
})
  .use(markdownItAbbr)
  .use(markdownItDeflist)
  .use(markdownItEmoji)
  .use(markdownItDootnote)
  .use(markdownItIns)
  .use(markdownItMark)
  .use(markdownItSub)
  .use(markdownItSup)
  // Video plugin not par of CM spec
  .use(markdownItVideo, {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: "simple" },
    prezi: { width: 550, height: 400 },
  });

export default markdown;

export const listImagesFromRawMarkdown = (body: string) =>
  listMarkdownImages(markdown.render(body));
