export default defineNitroConfig({
  preset: "firebase",
  moduleSideEffects: ["@abraham/reflection"],
  srcDir: "./functions",
  errorHandler: "~/utils/error",
  //baseURL: "api/v1/",
  esbuild: {
    options: {
      target: "esnext",
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
  firebase: {
    gen: 1,
    region: "asia-northeast1",
    nodeVersion: "18",
  },
});
