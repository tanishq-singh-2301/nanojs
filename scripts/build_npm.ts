import { dnt } from "../deps.ts";

const { build } = dnt;

for await (const entryName of Deno.readDir("/"))
    if (entryName.name === "npm")
        await Deno.remove("npm", { recursive: true });

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        deno: true,
    },
    package: {
        name: "nanojs",
        version: Deno.args[0],
        description: "Your package.",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/tanishq-singh-2301/nanojs.git",
        },
        bugs: {
            url: "https://github.com/tanishq-singh-2301/nanojs/issues",
        },
    },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
