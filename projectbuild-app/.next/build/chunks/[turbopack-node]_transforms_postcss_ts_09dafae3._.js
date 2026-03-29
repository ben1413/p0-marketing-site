module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Projects/projectbuild-app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/8a24a_5efc7c31._.js",
  "chunks/[root-of-the-server]__8ba7f842._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Projects/projectbuild-app/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];