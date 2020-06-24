import { parseMarkdownImages, listMarkdownImages } from "./parse-markdown-images";

const fakeHtml = `
<div>
<img src="https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture1.png" />
<img src='https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture2.png' />
<div>
`;
const fakeHtmlParsed = `
<div>
<img src="https://ik.imagekit.io/syuhz8bmxl/friends/picture1.png?tr=w-600px" />
<img src='https://ik.imagekit.io/syuhz8bmxl/friends/picture2.png?tr=w-600px' />
<div>
`;

describe("markdown parser", () => {
  it("converts aws images to imagekit cdn", () => {
    expect(parseMarkdownImages(fakeHtml)).toBe(fakeHtmlParsed);
  });
  it("gets all the images", () => {
    const images = listMarkdownImages(fakeHtml);
    expect(images[0]).toBe("https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture1.png");
    expect(images[1]).toBe("https://cabezonidas-shop-photos.s3.amazonaws.com/friends/picture2.png");
    expect(images.length).toBe(2);
  });
});
