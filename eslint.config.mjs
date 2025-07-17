import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns (replaces .eslintignore)
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
      // Semicolons and formatting preferences
      "semi": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }],
      "comma-dangle": ["error", "always-multiline"],
      
      // Unused variables with underscore exceptions
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "no-unused-vars": "off",
      
      // Import organization
      "import/order": [
        "error",
        {
          "groups": [
            ["builtin", "external"], // Group Node.js built-ins WITH npm packages
            "internal",              // Your @/ imports get their own group
            ["parent", "sibling", "index"] // All relative imports together
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],
      
      // Console usage control
      "no-console": ["warn", { "allow": ["error", "warn"] }],
      
      // Modern JavaScript practices
      "prefer-const": "error",
      
      // TypeScript preferences
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Spacing and formatting (if not covered by base configs)
      "object-curly-spacing": ["error", "always"],
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "no-trailing-spaces": "error",
      "eol-last": "error",
    }
  }
];

export default eslintConfig;
