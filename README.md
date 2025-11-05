# コーディング規約案
# VS Codeの拡張機能
## 必須
| 拡張名                        | 拡張ID                             | 用途・効果                                                   |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| ESLint                        | `dbaeumer.vscode-eslint`           | `.eslintrc`を読んで、Vue/TS含め保存時にLint修正＆警告表示    |
| Prettier - Code Formatter     | `esbenp.prettier-vscode`           | `.prettierrc`に従って自動整形、保存時フォーマットは必須      |
| Volar (Vue Language Features) | `Vue.volar`                        | Vue 3用の新言語サーバ、Composition API／script setup対応     |
| TypeScript Vue Plugin (Volar) | `Vue.vscode-typescript-vue-plugin` | Volarと一緒にTS連携強化、`.vue`ファイル内TS補完を正確にする  |
| Vitest                        | `ZixuanChen.vitest-explorer`       | サイドバーでテスト実行・結果確認、`vi.mock()` 等の補完もあり |
| Error Lens                    | `usernamehw.errorlens`             | ESLint／TSエラーをその場で強調表示、赤線より見やすい         |
| EditorConfig for VS Code      | `EditorConfig.EditorConfig`        | `.editorconfig`に従ってインデントや改行統一                  |

## 任意
あると便利なものを記載、これら以外にも便利なものがあるので各々調べて入れるとよい

| 拡張名                 | 拡張ID                               | 用途・効果                                                                           |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------ |
| Path Intellisense      | `christian-kohler.path-intellisense` | importパス自動補完（`@` /エイリアスにも対応）                                        |
| Auto Import            | `steoates.autoimport`                | 未importの関数・型を自動補完＆import文生成                                           |
| Todo Tree              | `Gruntfuggly.todo-tree`              | `// TODO:` や `// FIXME:` コメントなどを一覧化、規約でコメント残しを管理しやすくなる |
| GitLens                | `eamodio.gitlens`                    | コードの blame／コミット履歴確認、レビュー時に便利                                   |
| Bracket Pair Color DLW | `CoenraadS.bracket-pair-color-dlw`   | ネスト構造を色で視覚化、composableとかのロジック追いやすくする                       |
| Intent Rainbow         | `oderwat.indent-rainbow`             | インデントの深さに沿って色分けをしてくれる                                           |


# 静的チェックツール
Lintとフォーマッタを使うにあたり、必要なコマンドとファイルをまとめておく

## フォーマッタ・Lintツールのインストール
```bash
# ESLint/TS/Vue/Prettierツール系すべて
npm i -D eslint eslint-plugin-vue vue-eslint-parser \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  prettier eslint-plugin-prettier eslint-config-prettier

# import順/Promise/ソナー系
npm i -D eslint-plugin-import eslint-import-resolver-typescript \
  eslint-plugin-promise eslint-plugin-sonarjs
```

## 2 各設定ファイルの説明
各設定ファイルを規約にあわせて作成した

- `.eslintrc.cjs`: Lintツールの設定ファイル
- `.prettierrc.json`: フォーマッタの設定ファイル
- `.editorconfig`: エディタでずれないように、保険程度
- `tsconfig.json`: これはすでにプロジェクトに存在する、こういう設定だといいよ、という例
- `.vscode/settings.json`: VS CODEのプロジェクト専用設定ファイル、保存時に ESLint → Prettier で機械的に統一されてLintツールも効く
- `package.json`: すでに存在するファイル、`npm run` 部分に入れておくべきものをまとめてある

# テスト導入
## 導入方法
```bash
npm i -D vitest @vitejs/plugin-vue @vue/test-utils jsdom
```
