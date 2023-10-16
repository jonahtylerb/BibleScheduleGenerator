import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import solidStyled from "unplugin-solid-styled";

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ["solid-js"],
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          extension: "jsx",
        }),
      ],
    }),
    solidStyled.vite({
      filter: {
        include: "(src/**/*.tsx|src/*.tsx)",
        exclude: "node_modules/**",
      },
    }),
    solid(),
    Icons({
      compiler: "solid",
    }),
  ],
});
