import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getBlogContent = (slug: string) => {
  const folders = fs
    .readdirSync(path.join(process.cwd(), "content"))
    .filter((file) =>
      fs.statSync(path.join(process.cwd(), "content", file)).isDirectory()
    );

  const folder = folders.find((folder) => {
    const files = fs.readdirSync(path.join(process.cwd(), "content", folder));
    return files.some((f) => f.replace(/\.md$/, "") === slug);
  });
  const filePath = path.join(process.cwd(), "content", `${folder}`, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent); // Parse front matter and content
  return { data, content };
};

export const getBlogMetadata = () => {
  const folders = fs.readdirSync(path.join(process.cwd(), "content")).filter((file) => fs.statSync(path.join(process.cwd(), "content")).isDirectory())
  const datas = folders.map((folder) => {
    const files = fs.readdirSync(path.join(process.cwd(), "content", `${folder}`))
    return files.map((file) => {
      const filePath = path.join(process.cwd(), "content", `${folder}`, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent); // Extract frontmatter only
      return { ...data, slug: file.replace(/\.md$/, ""), type: folder };
    });
  })
  return datas.filter((data) => {
    return data.length > 0;
  })
};
