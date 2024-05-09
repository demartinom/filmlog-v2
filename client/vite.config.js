import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:3000",
//     },
//   },
// });

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  const envVars = loadEnv(mode, process.cwd());
  return defineConfig({
    // To a plugins: [react()],
    server: {
      proxy: {
        "/api": envVars.VITE_API_URL,
      },
    },
  });
};
