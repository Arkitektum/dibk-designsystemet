// Generates one React component per SVG in ../svg into ../src. Dependency-free:
// the only transforms an SVG needs to be valid JSX are camelCasing a few kebab
// attributes and namespacing the <clipPath> ids so multiple icons don't collide.
import { readdir, readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const svgDir = resolve(here, "../svg");
const srcDir = resolve(here, "../src/icons");

const ATTR_MAP = {
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "fill-rule": "fillRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "fill-opacity": "fillOpacity",
  "stroke-opacity": "strokeOpacity",
};

const pascal = (name) =>
  "Icon" +
  name
    .split(/[-_]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function toJsx(inner, idPrefix) {
  let out = inner;
  // Inline style strings -> JSX style objects: style="a:b;c:d" => style={{a:"b",c:"d"}}
  out = out.replace(/style="([^"]*)"/g, (_, decls) => {
    const obj = decls
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const i = d.indexOf(":");
        return `${JSON.stringify(camel(d.slice(0, i).trim()))}: ${JSON.stringify(d.slice(i + 1).trim())}`;
      })
      .join(", ");
    return `style={{ ${obj} }}`;
  });
  for (const [k, v] of Object.entries(ATTR_MAP)) {
    out = out.replaceAll(`${k}=`, `${v}=`);
  }
  // Namespace ids so url(#x) refs stay unique across icons in one document.
  out = out
    .replace(/id="([^"]+)"/g, (_, id) => `id="${idPrefix}_${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${idPrefix}_${id})`);
  return out.trim();
}

await rm(srcDir, { recursive: true, force: true });
await mkdir(srcDir, { recursive: true });

const files = (await readdir(svgDir)).filter((f) => f.endsWith(".svg")).sort();
const exported = [];

for (const file of files) {
  const name = basename(file, ".svg");
  const comp = pascal(name);
  const raw = await readFile(resolve(svgDir, file), "utf8");

  const open = raw.match(/<svg\b[^>]*>/i);
  if (!open) throw new Error(`No <svg> root in ${file}`);
  const viewBox = (open[0].match(/viewBox="([^"]+)"/i) || [])[1] ?? "0 0 40 40";
  const inner = raw.slice(open.index + open[0].length, raw.lastIndexOf("</svg>"));
  const jsx = toJsx(inner, name.replace(/-/g, "_"));

  const tsx = `import type { SVGProps } from "react";

export function ${comp}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="${viewBox}"
      width="1em"
      height="1em"
      fill="none"
      role="img"
      aria-hidden="true"
      {...props}
    >
      ${jsx}
    </svg>
  );
}
`;
  await writeFile(resolve(srcDir, `${comp}.tsx`), tsx);
  exported.push({ comp, key: name });
}

// Barrel + a name->component registry for data-driven usage (e.g. IconLinkList).
const barrel = `${exported.map((e) => `export { ${e.comp} } from "./${e.comp}";`).join("\n")}

import type { SVGProps, FunctionComponent } from "react";
${exported.map((e) => `import { ${e.comp} } from "./${e.comp}";`).join("\n")}

export type DibkIconName =
${exported.map((e) => `  | "${e.key}"`).join("\n")};

export const dibkIcons: Record<DibkIconName, FunctionComponent<SVGProps<SVGSVGElement>>> = {
${exported.map((e) => `  "${e.key}": ${e.comp},`).join("\n")}
};
`;
await writeFile(resolve(srcDir, "index.ts"), barrel);

console.log(`Generated ${exported.length} icon components in src/icons/`);
