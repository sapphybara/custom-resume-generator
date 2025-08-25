import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".pnpm/**",
      "*.log",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      "next-env.d.ts",
      "*.tsbuildinfo",
      "coverage/**",
    ]
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "no-unused-vars": "off",

      "import/order": [
        "error",
        {
          "groups": [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"]
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],

      "no-console": ["warn", { "allow": ["error", "warn"] }],

      "prefer-const": "error",

      "@typescript-eslint/no-explicit-any": "warn",

      "object-curly-spacing": ["error", "always"],
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "no-trailing-spaces": "error",
      "eol-last": "error",
    }
  }
];

export default eslintConfig;
