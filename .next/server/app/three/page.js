const CHUNK_PUBLIC_PATH = "server/app/three/page.js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_b8ddad._.js");
runtime.loadChunk("server/chunks/ssr/_cbced4._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/three/page/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js?page=/three/page { COMPONENT_0 => \"[project]/node_modules/next/dist/client/components/not-found-error.js [app-rsc] (ecmascript, Next.js server component)\", COMPONENT_1 => \"[project]/app/three/page.jsx [app-rsc] (ecmascript, Next.js server component)\" } [app-rsc] (ecmascript) <facade>", CHUNK_PUBLIC_PATH).exports;
