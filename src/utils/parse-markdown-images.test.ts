import { parseMarkdownImages } from "./parse-markdown-images";

const fakeHtml = `
<div>
<img src="https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture1.png" />
<img src="https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture2.png" />
<div>
`;
const fakeHtmlParsed = `
<div>
<img src="https://ik.imagekit.io/syuhz8bmxl/friends/picture1.png?tr=w-600px" />
<img src="https://ik.imagekit.io/syuhz8bmxl/friends/picture2.png?tr=w-600px" />
<div>
`;

describe("markdown parser", () => {
  it("converts aws images to imagekit cdn", () => {
    expect(parseMarkdownImages(fakeHtml)).toBe(fakeHtmlParsed);
  });
});
