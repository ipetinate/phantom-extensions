import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin, ViteDevServer } from "vite";

const PACKAGE_NAME = "phantom-mdx";

const CONTENT_TYPES: Readonly<Record<string, string>> = {
  ".mdx": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

const CSP_META = /\s*<meta http-equiv="Content-Security-Policy"[^>]*>/i;

function packageRoot(): string {
  let directory = path.dirname(fileURLToPath(import.meta.url));
  while (true) {
    const manifest = path.join(directory, "package.json");
    if (existsSync(manifest) && (JSON.parse(readFileSync(manifest, "utf8")) as { name?: string }).name === PACKAGE_NAME) {
      return directory;
    }
    const parent = path.dirname(directory);
    if (parent === directory) throw new Error(`could not find the ${PACKAGE_NAME} package root above ${import.meta.url}`);
    directory = parent;
  }
}

function packageVersion(root: string): string {
  return (JSON.parse(readFileSync(path.join(root, "package.json"), "utf8")) as { version: string }).version;
}

function insideDirectory(directory: string, target: string): boolean {
  const relative = path.relative(directory, target);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function serveExtension(directory: string, server: ViteDevServer): void {
  server.middlewares.use("/ext", (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");
    const target = path.resolve(directory, `.${decodeURIComponent(url.pathname)}`);
    if (!insideDirectory(directory, target) || !existsSync(target) || !statSync(target).isFile()) {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end(`not found: ${url.pathname}`);
      return;
    }
    response.setHeader("Content-Type", CONTENT_TYPES[path.extname(target).toLowerCase()] ?? "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");
    createReadStream(target).pipe(response);
  });
}

function watchExtension(directory: string, server: ViteDevServer): void {
  server.watcher.add(directory);
  server.watcher.on("all", (_event, file) => {
    if (file === directory || insideDirectory(directory, file)) {
      server.hot.send({ type: "custom", event: "phantom-mdx:changed", data: { file: path.relative(directory, file) } });
    }
  });
}

export function previewPlugin(directory: string): Plugin {
  return {
    name: "phantom-mdx-preview",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(CSP_META, "").replace("</body>", '    <script type="module" src="./preview.tsx"></script>\n  </body>');
      },
    },
    configureServer(server) {
      serveExtension(directory, server);
      watchExtension(directory, server);
    },
  };
}

export async function startPreview(directory: string): Promise<void> {
  const { createServer } = await import("vite");
  const { default: react } = await import("@vitejs/plugin-react");
  const root = packageRoot();
  const server = await createServer({
    configFile: false,
    root: path.join(root, "src", "viewer"),
    define: { __PHANTOM_MDX_VERSION__: JSON.stringify(packageVersion(root)) },
    plugins: [react(), previewPlugin(directory)],
    server: { open: !process.env.CI, fs: { allow: [root, directory] } },
    appType: "spa",
    logLevel: "info",
  });
  await server.listen();
  server.printUrls();
  process.stdout.write(`previewing ${directory}\n`);
}
