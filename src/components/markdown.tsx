/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Box } from ".";
import { useTheme } from "../theme";
import { parseMarkdownImages } from "../utils/parse-markdown-images";
import markdown from "../utils/markdown";

interface IPreview extends React.ComponentProps<typeof Box> {
  body: string;
}

export const Markdown = React.forwardRef<HTMLDivElement, IPreview>(({ body, ...props }, ref) => {
  const { colors, mode } = useTheme();
  return (
    <Box
      css={{
        h1: {
          marginTop: 20,
          marginBottom: 10,
          fontWeight: 600,
          lineHeight: 1.25,
          fontSize: 36,
        },
        h2: {
          marginTop: 20,
          marginBottom: 10,
          fontWeight: 500,
          lineHeight: 1.1,
          fontSize: 30,
        },
        h3: {
          marginTop: 20,
          marginBottom: 10,
          fontWeight: 500,
          lineHeight: 1.1,
          fontSize: 24,
        },
        h4: {
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          lineHeight: 1.1,
          fontSize: 18,
        },
        h5: {
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          lineHeight: 1.1,
          fontSize: 14,
        },
        h6: {
          marginTop: 10,
          marginBottom: 10,
          fontWeight: 500,
          lineHeight: 1.1,
          fontSize: 12,
        },
        code: {
          padding: "2px 4px",
          fontSize: "90%",
          color: colors.neutral.darkest,
          backgroundColor: colors.neutral.light,
          borderRadius: "4px",
        },
        hr: {
          borderWidth: "1px",
          borderStyle: "inset",
          marginTop: 20,
          marginBottom: 20,
        },
        p: {
          margin: "0 0 10px",
          lineHeight: 1.5,
        },
        strong: {
          fontWeight: "bold",
        },
        em: {
          fontStyle: "italic",
        },
        sup: {
          verticalAlign: "super",
          fontSize: "smaller",
        },
        sub: {
          verticalAlign: "sub",
          fontSize: "smaller",
        },
        ins: {
          margin: "0 0 10px",
          lineHeight: 1.5,
        },
        blockquote: {
          padding: "10px 20px",
          margin: "0 0 20px",
          fontSize: "17.5px",
          borderLeft: `5px solid ${
            mode === "light" ? colors.neutral.light : colors.neutral.mediumDark
          }`,
        },
        ul: {
          listStyleType: "square",
          paddingInlineStart: "40px",
        },
        ol: {
          listStyleType: "decimal",
          paddingInlineStart: "40px",
        },
        pre: {
          display: "block",
          padding: "9.5px",
          margin: "0 0 10px",
          fontSize: "13px",
          lineHeight: "1.42857143",
          wordBreak: "break-all",
          wordErap: "break-word",
          color: colors.neutral.darkest,
          backgroundColor: "#ededee",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "auto",
          code: {
            color: "unset",
            backgroundColor: "unset",
            padding: "unset",
          },
        },
        table: {
          width: "100%",
          maxWidth: "100%",
          marginBottom: "20px",
          borderSpacing: 0,
          borderCollapse: "collapse",
        },
        thead: {
          display: "table-header-group",
          verticalAlign: "middle",
          borderColor: "inherit",
        },
        th: {
          padding: 8,
          fontWeight: "bold",
          textAlign: "left",
        },
        tbody: {
          tr: {
            backgroundColor: "transparent",
            ":nth-of-type(odd)": {
              backgroundColor: mode === "dark" ? colors.neutral.dark : "#ededee",
            },
          },
        },
        td: {
          padding: "8px",
          lineHeight: 1.42857143,
          verticalAlign: "top",
          borderTop: "1px solid #ddd",
        },
        img: {
          maxWidth: "100%",
        },
        mark: {
          padding: ".2em",
          backgroundColor: `${colors.warning.lightest}80`,
          color: mode === "dark" ? colors.neutral.lightest : colors.neutral.darkest,
          borderRadius: 2,
        },
        "a.footnote-backref": {
          color: "unset",
        },
        dt: {
          fontWeight: "bold",
          lineHeight: 1.42857143,
        },
        dd: {
          marginLeft: 0,
          lineHeight: 1.42857143,
        },
        iframe: {
          maxWidth: "100%",
        },
      }}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: parseMarkdownImages(markdown.render(body)) }}
      {...props}
    />
  );
});

export default Markdown;
