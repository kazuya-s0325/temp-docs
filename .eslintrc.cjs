module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
    project: "./adelia.vite/tsconfig.json", // 型ベースの厳しめLintも有効化
  },
  plugins: ["vue", "@typescript-eslint", "import", "promise", "sonarjs", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended", // Vue3推奨
    "plugin:@typescript-eslint/recommended", // TypeScript基本
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: { project: "./tsconfig.json" },
    },
    "import/internal-regex": "^@/", // "@/..."をinternal扱いにする
  },
  rules: {
    /* JavaScriptのベース設定部分 */
    "no-var": "error",
    "prefer-const": ["error", { destructuring: "all" }],
    "prefer-arrow-callback": "error",
    "max-len": [
      "error",
      {
        code: 128,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ], // 1行128文字まで（規約）
    "max-lines": ["warn", { max: 500, skipBlankLines: true, skipComments: true }], // 規約の300〜500目安（コメントと空行は除く）

    /* TypeScript設定部分 */
    "@typescript-eslint/explicit-function-return-type": "error", // 戻り値に型を必須化（規約の「型は必ず明示」に基づく）
    "@typescript-eslint/no-explicit-any": "warn", // anyは警告（規約では原則禁止としている）
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",

    /* Vue（規約反映）*/
    // Composition API / script setup 強制 & Option API禁止
    "vue/component-api-style": ["error", ["script-setup", "composition"]],

    // SFC上部タグ順を強制: <template> → <script> → <style>
    "vue/component-tags-order": [
      "error",
      {
        order: [["template", "script", "style"]],
      },
    ],

    // 属性の並び順（規約の順に一致させる）
    "vue/attributes-order": [
      "warn",
      {
        order: [
          "DEFINITION", // is
          "LIST_RENDERING", // v-for
          "CONDITIONALS", // v-if / v-else-if / v-else / v-show / v-cloak
          "RENDER_MODIFIERS", // v-pre / v-once
          "GLOBAL", // id
          "UNIQUE", // ref / key
          "TWO_WAY_BINDING", // v-model
          "OTHER_ATTR", // その他
          "EVENTS", // @click 等
          "CONTENT", // v-html / v-text
        ],
        alphabetical: false,
      },
    ],

    // 複数属性は改行・1行あたりの属性個数
    "vue/first-attribute-linebreak": ["error", { multiline: "below" }],
    "vue/max-attributes-per-line": ["error", { singleline: 1, multiline: 1 }],

    // ディレクティブ短縮記法（: / @ / #）を強制(ただしwarnに留める)
    "vue/v-bind-style": ["warn", "shorthand"],
    "vue/v-on-style": ["warn", "shorthand"],

    // テンプレ内の命名規約・記法
    "vue/prop-name-casing": ["error", "camelCase"], // propsはcamelCase定義
    "vue/custom-event-name-casing": ["error", "kebab-case"], // emitはkebab-case
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        // 使用時はkebab-case
        registeredComponentsOnly: false,
      },
    ],

    // v-for系
    "vue/require-v-for-key": "error", // v-forにはkeyを強制（規約）
    "vue/no-use-v-if-with-v-for": ["error", { allowUsingIterationVar: false }], // 併用禁止（規約）

    // インデント：2スペース
    "vue/html-indent": ["error", 2],

    // v-htmlは原則使わない（規約では非推奨、安全が確認できていれば使用してもOK）
    "vue/no-v-html": "warn",

    // script setup の未使用変数誤判定回避
    "vue/script-setup-uses-vars": "error",

    /* import順（規約のグループ順）*/
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"], // Node標準, npm
          ["internal"], // @/*
          ["parent", "sibling", "index", "object"],
          ["type"],
        ],
        pathGroups: [{ pattern: "@/**", group: "internal", position: "before" }],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],

    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    // TS resolverに任せる
    "import/no-unresolved": "off",

    /* Promise/コメント */
    "promise/prefer-await-to-then": "error", // async/awaitへ（規約の非同期方針）
    // TODO: sonarjs1.0.0以降でしか有効にならない、ESLint9へ上げる必要あり
    // "sonarjs/no-commented-out-code": "error", // コメントアウトを禁止（規約）

    // Cognitive Complexityの閾値を15、warnに留める
    "sonarjs/cognitive-complexity": ["warn", 15],
    "prettier/prettier": "error",
  },
};
