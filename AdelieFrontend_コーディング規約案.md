# Adelie Frontend コーディング規約
# 目次
- [Adelie Frontend コーディング規約](#adelie-frontend-コーディング規約)
- [目次](#目次)
- [1.基本部分](#1基本部分)
  - [0. 全体方針](#0-全体方針)
    - [0.1 プロジェクト全体設定](#01-プロジェクト全体設定)
    - [0.2 GitHub運用方法](#02-github運用方法)
  - [1.1 ディレクトリ構成](#11-ディレクトリ構成)
    - [ルール](#ルール)
  - [1.2 命名規約](#12-命名規約)
    - [1.2.1 全般](#121-全般)
    - [1.2.2 コンポーネントについて](#122-コンポーネントについて)
    - [1.2.3 propsについて](#123-propsについて)
    - [1.2.4 emit/イベント名について](#124-emitイベント名について)
    - [1.2.5 router名について](#125-router名について)
    - [1.2.6 基底コンポーネント](#126-基底コンポーネント)
    - [1.2.7 密結合コンポーネント](#127-密結合コンポーネント)
- [2. コーディングスタイル](#2-コーディングスタイル)
  - [2.1 全体のスタイル](#21-全体のスタイル)
    - [インデント](#インデント)
    - [文字数](#文字数)
    - [1ファイルあたりの行数](#1ファイルあたりの行数)
    - [フォーマッター](#フォーマッター)
    - [宣言](#宣言)
      - [変数・定数](#変数定数)
      - [関数](#関数)
    - [非同期処理](#非同期処理)
    - [コメント](#コメント)
  - [2.1 TypeScript全般のコーディングスタイル](#21-typescript全般のコーディングスタイル)
    - [2.1.1 型について](#211-型について)
    - [2.1.2 型定義について](#212-型定義について)
    - [2.1.3 nullとundefinedについて](#213-nullとundefinedについて)
    - [2.1.4 Union Typeについて](#214-union-typeについて)
    - [2.1.5 関数と副作用について](#215-関数と副作用について)
    - [2.1.6 import](#216-import)
  - [2.2 Vueテンプレートのコーディングスタイル](#22-vueテンプレートのコーディングスタイル)
    - [2.2.1 全般について](#221-全般について)
    - [2.2.2 テンプレートのコーディングスタイル](#222-テンプレートのコーディングスタイル)
      - [Top-LevelのVueコンポーネントタグ順](#top-levelのvueコンポーネントタグ順)
      - [複数属性の記載](#複数属性の記載)
      - [v-modelの使い方](#v-modelの使い方)
      - [v-forの使い方](#v-forの使い方)
      - [v-forとv-ifを同時使用しない](#v-forとv-ifを同時使用しない)
      - [ロジックはcomposableへ](#ロジックはcomposableへ)
      - [要素属性並び順](#要素属性並び順)
      - [ディレクティブの短縮記法](#ディレクティブの短縮記法)
      - [算出プロパティ（computed）](#算出プロパティcomputed)
  - [2.3 Vueのcomposableのスタイル](#23-vueのcomposableのスタイル)
    - [2.3.1 命名規則](#231-命名規則)
    - [2.3.2 構成ディレクトリ](#232-構成ディレクトリ)
    - [2.3.3 composableのコーディングスタイル](#233-composableのコーディングスタイル)
  - [2.4 Pinia Storeのスタイル](#24-pinia-storeのスタイル)
    - [2.4.1 Piniaを使うべき場面](#241-piniaを使うべき場面)
    - [2.4.2 Piniaのコーディングスタイル](#242-piniaのコーディングスタイル)
      - [ストアの基本構成](#ストアの基本構成)
      - [ストアの命名規約](#ストアの命名規約)
      - [ストアの責務](#ストアの責務)
      - [一方向データフローの厳守](#一方向データフローの厳守)
      - [永続化（`pinia-plugin-persistedstate`）使用時](#永続化pinia-plugin-persistedstate使用時)
      - [共通処理はcomposableへ](#共通処理はcomposableへ)
      - [その他禁止事項](#その他禁止事項)
- [3. テスト方針](#3-テスト方針)
  - [3.1 概要](#31-概要)
  - [3.2 テストの基本方針](#32-テストの基本方針)
    - [APIラッパー](#apiラッパー)
    - [composables](#composables)
    - [vueコンポーネント（.vueファイル）](#vueコンポーネントvueファイル)
    - [store(Pinia)](#storepinia)
    - [utils（共通関数）](#utils共通関数)
      - [原則](#原則)
  - [3.3 composablesのテスト方針](#33-composablesのテスト方針)
  - [3.4 store(Pinia)のテスト方針](#34-storepiniaのテスト方針)
  - [3.5 テスト命名規則](#35-テスト命名規則)
  - [3.6 Mock化ガイドライン](#36-mock化ガイドライン)
    - [基本方針](#基本方針)
    - [Mock化の例](#mock化の例)
      - [APIラッパーのMock例](#apiラッパーのmock例)
      - [Store依存のMock例](#store依存のmock例)
      - [Router依存のMock例](#router依存のmock例)
    - [テスト時のポイント](#テスト時のポイント)
  - [3.7 カバレッジ](#37-カバレッジ)
  - [3.8 テストの意義](#38-テストの意義)

# 1.基本部分
## 0. 全体方針
### 0.1 プロジェクト全体設定
- **[MUST]** プロジェクト全体方針は以下の方針を守る

| 区分             | 内容                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------- |
| フレームワーク   | 必ず **Composition API** (Vue3標準) を使用する<br>Vue2以前の Option API は使用しないこと      |
| 型システム       | TypeScript                                                                                    |
| Lint             | ESLint + `plugin:vue/vue3-recommended` + `@typescript-eslint`                                 |
| Formatter        | Prettier（eslint-plugin-prettier で統合）                                                     |
| 命名規則         | camelCase, PascalCase, kebab-caseを用いて用途別で厳格化                                       |
| ディレクトリ構成 | 「セパレーション・オブ・コンサーン」を徹底<br>（components, composables, stores, utils, etc） |


### 0.2 GitHub運用方法
- **[MUST]** `README.MD`の記載は必ず行う
  - プロジェクトの基本情報や、開発環境のセットアップなどを記載しておく

- **[MUST]** `main`/`master`ブランチへの直コミットはしてはならない
  - `main`/`master`への直コミットを行うと以下の問題が発生するため禁止とする

    | 問題点                         | 説明                                                                                                                                                                                                                            |
    | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | レビューがスキップされる       | 誰もコードレビューしないまま本番へ即反映されるため                                                                                                                                                                              |
    | 履歴が汚染される               | 修正・試行錯誤・「typoを修正」といった全コミットが全部`main`/`master`に乗ってしまう<br>→ `git log`が肥大化して過去解析が難しくなる                                                                                              |
    | ほかブランチとの競合が発生する | 他の開発者が`feature/*`ブランチを切っても`main/master`が直接進むせいで、本来は不要なはずの`rebase`や`merge`を行わなければならない事態が頻発する                                                                                 |
    | 本番事故リスクがある           | 運用フェーズに入った際は、`main`/`master`は本番環境へのデプロイ対象であるため、直コミット = 本番に未レビューのコードが即入り込む<br> → デグレや障害の特定が難しくなる、開発段階の時点で直コミットをしない癖付けをすることが重要 |

- **[SHOULD]** 各ブランチの種類とその役割は以下のように定義する

  | 種類             | 命名規則                                   | 派生元             | マージ先           | 説明                                                                                                   |
  | ---------------- | ------------------------------------------ | ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------ |
  | 本番ブランチ     | `main`/`master`                            | (なし)             | (なし)             | 本番稼働ブランチ、常に正しく動く状態でなくてはならない                                                 |
  | 開発統合ブランチ | `develop`                                  | `main`<br>`master` | `main`<br>`master` | 開発統合用のブランチ、開発環境が存在する場合はそちらにデプロイするためのブランチとしても利用可能       |
  | 開発用ブランチ   | `feature/xxx`(xxxには作業内容を完結に記載) | `develop`          | `develop`          | 開発者単位で使用するブランチ、こちらで作業し`PR`を通じて開発統合ブランチへマージする                   |
  | 緊急修正ブランチ | `hotfix/xxx`                               | `main`<br>`master` | `main`<br>`master` | 緊急のバグ修正用ブランチ、本番から派生してPRを通して本番へマージする（運用フェーズを想定したブランチ） |

  ```
  main/master
  └── develop
      ├── feature/xxx
      └── hotfix/xxx
  ```

- **[SHOULD]** PR時には必ず1名以上がコードレビューを実施する
- **[SHOULD]** PRタイトルは目的と対象を明確にする
  - 例: 受注入力画面のバリデーション処理の修正
- **[SHOULD]** PR説明欄に以下を必ず含める（GitHubにテンプレートを仕込んでおくと良い）
  - 作業の概要（何を、なぜ）
  - GitHubで課題管理を行っている場合は関連Issue、外部でタスク管理をしている場合はチケット番号や管理番号など
- **[SHOULD]** PRは小さく出す（基本的には1PR1機能/1修正）
  - 巨大PRはレビュアーの負担となるのでそこを考慮すること
- **[SHOULD]** PRからマージを行う際は以下のポリシーで実施する

  | マージ                      | マージ方法                     | 理由                                                                                                                                                                                     |
  | --------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `feature/*` → `develop`     | Squash Merge                   | ・個人作業中の細かいコミットを一纏めにできる<br>・`develop`ブランチの履歴がきれいになる<br>・「この機能は誰が実装したか」が1コミット単位で明確になる                                     |
  | `develop` → `main`/`master` | Merge Commit<br>（通常マージ） | ・リリース時のマージ履歴を保持することで、「どの時点でリリースしたか」「どのPRが含まれているか」をトレースしやすい<br>・リリースノート生成（GitHub Releaseや自動生成ツール）と相性が良い |

- **[MUST]** マージ後の作業ブランチは速やかに削除する
  - 追加作業が必要になった際は改めてブランチを切り直せばよい

- **[SHOULD]** コミットメッセージは以下のフォーマットで記載する

  ```
  <type>: <短い説明>

  <詳細な説明を箇条書き>

  例:
  fix: 受注入力画面のバリデーション処理を修正

  * catalogCdを任意から必須に
  * tokuiCdを必須から任意に
  ```

  `type`の分類は以下の通り
  | 種類     | 意味                                 |
  | -------- | ------------------------------------ |
  | feat     | 新機能追加                           |
  | fix      | バグ修正                             |
  | refactor | リファクタリング                     |
  | docs     | ドキュメント変更                     |
  | style    | コード整形（機能影響なし）           |
  | test     | テスト追加・修正                     |
  | chore    | 雑務（上記のどれにも当てはまらない） |

  フォーマットを決めておくと、semantic-release系ツールとの連携が発生した際に有利となる

- **[SHOULD]** FEとBEでリポジトリは分けておく
  - FEとBEの変更履歴が完全に別れるため、`git log`での過去解析がしやすくなる
  - また`git clone`時の時間短縮にもつながる

## 1.1 ディレクトリ構成
- **[MUST]** viteプロジェクトのディレクトリ構成は以下のとおりとする

  ```bash
  src/
  ├── api/         # API呼び出し系 (axiosラッパーなど)
  ├── assets/      # 画像・フォント・CSSなど
  ├── components/  # 再利用コンポーネント（共通部品）
  ├── composables/ # Composition APIロジック
  ├── router/      # router
  ├── store/       # Piniaストア
  ├── tests/       # Vitest
  ├── types/       # TypeScript型定義
  ├── utils/       # 共通関数
  └── views/       # 画面単位のVue
  ```
### ルール
- **[MUST]** `components/` 下は機能単位でサブディレクトリを切る
  - e.g.`components/user/UserForm.vue`, `components/user/UserList.vue`
- **[MUST]** `composables/` は `useXxx.ts` と命名
  - e.g.`useFetchUser`, `useDialog`

## 1.2 命名規約
### 1.2.1 全般
- **[MUST]** 各対象・要素に対する命名規約は以下のとおりとする

  | 対象             | 規則                         | 例                                |
  | ---------------- | ---------------------------- | --------------------------------- |
  | コンポーネント   | PascalCase                   | UserCard.vue                      |
  | props, 関数名    | camelCase                    | catalogCd, handleSubmit           |
  | emit, イベント名 | kebab-case                   | user-clicked                      |
  | tsファイル名     | camelCase                    | printPdf.ts                       |
  | composable       | camelCase + `use` prefix     | useFetchUserData.ts               |
  | 定数             | UPPER_SNAKE_CASE             | API_BASE_URL                      |
  | 型               | PascalCase + `type` or `DTO` | UserInfoType, UserLoginRequestDTO |

- **[MUST]** 略語は広く一般的に用いられているものを除いて、基本的には使用しないこと
  - エディタの補完機能があるので、そもそも省略する必要性は薄い
  - 特に略すことで2通り以上の意味に取れてしまいかねないものは絶対に使用しない
    - 例: `dt` → `date`と`data`で混同する

- **[MUST]** ハンガリアン記法は使用しない、あくまでも意味ベースでの命名を意識する
  - 型についてはTypeScriptが参照する、また型情報の提供はIDE側で行われるので変数名に含める必要性は無い

    **TypeScript全般の例:**
    | BAD           | GOOD                    | 理由                                         |
    | ------------- | ----------------------- | -------------------------------------------- |
    | `strName`     | `name: string`          | 型はTypeScriptがもつ、名前は「意味」をもつ   |
    | `iCount`      | `count: number`         | 同上                                         |
    | `bIsActive`   | `isActive: boolean`     | 真偽値は`is`/`has`/`can`/`should`で始める    |
    | `objResponse` | `response: ApiResponse` | オブジェクトの命名は意味名で、型の定義も行う |
    | `tblUserMst`  | `userMaster`            | DB種別は名前に含めない                       |

    **vueテンプレート内のUI要素の例:**
    | BAD                  | GOOD                     | 理由                                     |
    | -------------------- | ------------------------ | ---------------------------------------- |
    | txtShohinName        | `shohinName`             | UI型を外して役割だけにする               |
    | cmdSearch, btnSearch | `search`, `searchAction` | ボタン程度なら`*Action`程度は可          |
    | selCategory          | `category`               | UI型を外す、select→radioへの変更に耐える |
    | lblError             | `errorMessage`           | 読み手に意味が伝わる                     |

### 1.2.2 コンポーネントについて
- **[MUST]** import時は `PascalCase` とする
  ```ts
  import UserCard from '/UserCard.vue'
  ```
- **[MUST]** テンプレート内での使用時は `kebab-case` とする(html属性と統一する)
  ```html
  <user-card />
  ```

### 1.2.3 propsについて
- **[MUST]** `camelCase` で定義し、 `kebab-case` で使用する(html属性と統一するため)
  ```
  props: {
    userName: string,
    isActive: boolean,
  }

  <user-card user-name="Name" :is-active="true">
  ```

### 1.2.4 emit/イベント名について
- **[MUST]** `kebab-case` で定義して使用する
  ```
  // 子
  emit('user-clicked')

  // 親
  <user-card @user-clicked="onUserClicked" />
  ```

### 1.2.5 router名について
- **[MUST]** `vue router`の命名規則は以下とする

  | 対象       | 規則       | 例         |
  | ---------- | ---------- | ---------- |
  | route name | PascalCase | UserList   |
  | path       | kebab-case | /user-list |
  ```ts
  {
    path: '/user-list',
    name: 'UserList',
    component: () => import('@/views/UserList.vue')
  }
  ```

### 1.2.6 基底コンポーネント
- **[SHOULD]** 基底コンポーネント（アプリ特有のスタイルやルールを適用するコンポーネント）には `Base` prefixをつけて命名する
  ```
  components/
  ├── BaseButton.vue
  ├── BaseInput.vue
  ├── BaseTable.vue
  ```

### 1.2.7 密結合コンポーネント
- **[SHOULD]** 親コンポーネントと密に結合した子コンポーネント（再利用を前提としていない子コンポーネント）には、親コンポーネントの名前をprefixにして命名する
  ```
  ├── TodoList.vue
  ├── TodoListItem.vue
  ├── TodoListItemButton.vue
  ```

# 2. コーディングスタイル
## 2.1 全体のスタイル
### インデント
- **[MUST]** 1レベルのインデントに2つの空白を使用する、水平タブは使用しない

### 文字数
- **[MUST]** 1行あたりの文字数は、（特別な事情がない限り）128文字以内に収める

### 1ファイルあたりの行数
- **[SHOULD]** 1ファイルあたり300～500行くらいに収める
  - これを超える場合は、責務を複数抱えている可能性が高いので、1ファイル1責務をルールに分割を行う

### フォーマッター
- **[MUST]** コードはフォーマッタで整形し、基礎的なスタイルを機械的に合わせる

### 宣言
#### 変数・定数
- **[MUST]** `let`, `const` は適切に使い分ける

  使用例:
  ```ts
  // 変更しない値は const を使用する
  const API_URL = '/api/user';

  // 関数も const を使用する
  const add = (a: number, b: number): number => a + b;


  // 再代入を行う場合は let を使用する
  let count = 0;
  count++

  // reactive なオブジェクトは const を使用する
  // → 中身が変わるだけで、参照は固定なため
  const user = reactive({
    name: "Alpha",
    age: 20,
  });
  user.age++
  ```

- **[MUST]** `var` は使用してはならない

  例:
  ```ts
  function example() {
    console.log(a); // undefined（巻き上げが発生しエラーにならない）
    var a = 10;
    console.log(a); // 10
  }

  // また、varは関数スコープなので例えばfor文で
  // 以下のような想定外の挙動を示す場合がある
  for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
  }

  //↓上記処理の出力結果
  // 3
  // 3
  // 3
  ```

#### 関数
- **[MUST]** 関数リテラルには原則アロー関数を使用する
  - アロー関数は見た目がシンプルで見通しが良くなるだけでなく、`this`がレキシカルスコープに束縛され、バグを防止効果を期待できる
  - 例外として、クラスメソッド定義や外部ライブラリで明示的な`this`バインディングが必要な場合はこの限りではない

    ```ts
    // 即時関数やコールバックなどはアロー関数で統一
    const users = list.map(user => user.name);

    const handleClick = (event: MouseEvent) => {
      console.log(event.target);
    };
    ```


### 非同期処理
- **[MUST]** 非同期処理は `Promise` オブジェクトを用いて、 `async/await` スタイルで記載する

  BAD:
  ```ts
  fetchUserData()
    .then(user => {
      return fetchUserSettings(user.id);
    })
    .then(settings => {
      return saveSettings(settings);
    })
    .then(() => {
      console.log("設定を保存しました！");
    })
    .catch(err => {
      console.error("エラー:", err);
    });
  ```

  GOOD:
  ```ts
  const updateUserSettings = async (): Promise<void> => {
    try {
      const user = await fetchUserData();
      const settings = await fetchUserSettings(user.id);
      await saveSettings(settings);
      console.log("設定を保存しました！");
    } catch (err) {
      console.error("エラー:", err);
    }
  }
  ```
- **[SHOULD]** 相互依存しない複数の非同期処理を同時実行する場合は `Promise.all()` の利用を検討すること

  BAD:
  ```ts
  const loadDashboardData = async (): Promise<void> => {
    try {
      const user = await fetchUserData();
      const notifications = await fetchNotifications();
      const settings = await fetchUserSettings();
      console.log("全部完了！");
    } catch (err) {
      console.error("エラー:", err);
    }
  }
  ```

  GOOD:
  ```ts
  const loadDashboardData = async (): Promise<void> => {
    try {
      // ユーザー情報・通知・設定を同時に取得する
      const [user, notifications, settings] = await Promise.all([
        fetchUserData(),
        fetchNotifications(),
        fetchUserSettings()
      ]);
      console.log("ユーザー:", user.name);
      console.log("通知数:", notifications.length);
      console.log("テーマ:", settings.theme);
    } catch (err) {
      console.error("ダッシュボードデータの取得に失敗:", err);
    }
  }
  ```

### コメント
- **[MUST]** コメントに使用する言語は統一する
  - 例えば、英語や日本語を混ぜてはならない（どちらかに統一する）
- **[MUST]** コメントアウトは残してはならない
  - コードの見通しが悪くなるだけでなく、grep時にノイズとなり調査の手間が増える
  - 何らかの事情で意図的に残す場合は、必ずコメントに理由と削除する基準を明確に記載しておくこと

    ```ts
    // TODO: API仕様未確定のため保留
    // 呼び出し側修正完了後に再有効化予定（2025/11/10に確認）
    // const result = await callNewApi();
    ```
- **[MUST]** コメントには「コードからは読み取れない意図や理由」を書く
  - コードの内容を説明（≒日本語訳）するために書くものではない

    BAD:
    ```ts
    // ユーザーデータを取得する
    const getUserData = () => api.get('/user/data')

    // 変数iをインクリメントする
    for (let i = 0; i < 10; i++) {}
    ```

    GOOD:
    ```ts
    // バックエンド仕様上、nullを許容する必要があるため、空文字ではなくnullを返す
    const getUserName = (id: string): string | null => {
      // DB制約の都合で null を明示的に返す
      return userMap[id] ?? null;
    }

    // キャッシュにより挙動が変わるので、処理前にキャッシュをクリアする
    // ※性能劣化のトリガーになりうるので頻繁に呼ばないこと
    invalidateCache()
    ```

- **[SHOULD]** 必要に応じてJSDocコメントを使用する
  - 関数にJSDocコメントを使用するとIDE上で関数の概要をホバー表示できるため助けになる
  - もちろん全関数にJSDocコメントを付与する必要はない（例えば引数の多い関数などに使用するとよい）

    ```ts
    /**
    * 商品情報を取得する
    * @param productId 商品ID
    * @returns 商品情報（存在しない場合はnull）
    */
    const fetchProduct = async (productId: string): Promise<Product | null> => {
      /* 処理 */
    }
    ```

- **[SHOULD]** `TODO:`や`FIXME:`といったコメントを使用する場合は、必ず明確な目的を記載する
  - また、このようなコメントはIDE上で管理対象とすることも可能なので必要に応じて活用する
  - 一緒にIssueや課題管理番号も紐づけると、grep時に便利な場合もある

    ```
    TODO: ページング対応の追加 課題管理番号: ADE-025
    FIXME: 暫定対応、API側修正完了後にこの処理は削除予定
    ```

- **[MUST]** コード上に「作成者」「更新者」などの情報は記載しない
  - これらはGitHubで追跡可能なため、重複情報となり無駄なメンテナンスコストとなる
  - 複数人で編集された場合に、誰がいつ更新したのかの整合性が崩れる
  - コメント更新漏れにより、嘘の履歴が残るリスクが有る

    > 監査などで、どうしても履歴コメントが必要な場合はコメントではなくファイルヘッダテンプレート、または自動スクリプトで自動化して機械的に記載されるようにすること

## 2.1 TypeScript全般のコーディングスタイル
### 2.1.1 型について
- **[MUST]** 型は必ず明示する
- **[MUST]** 変数・関数戻り値・props・emitには型定義を必ず書くこと
- **[MUST]** `any` は明確な理由がない限り禁止する

  BAD:
  ```ts
  let count = 0
  const add = (a, b) => {
    return a + b;
  }
  ```

  GOOD:
  ```ts
  const count: number = 0
  const add = (a: number, b: number): number => {
    return a + b;
  }
  ```

### 2.1.2 型定義について
- **[MUST]** 型定義については明確な意図を持って命名する
- **[SHOULD]** `type` のほうがUnionやMapped型を活かしやすいので基本的にはこちらを使用する
- **[SHOULD]** `interface` はクラス実装時のみ使用する

  BAD:(極端な例だが)
  ```ts
  type A = { a: string; b: string }
  ```

  GOOD:
  ```ts
  export type UserInfoDTO = {
    id: string;
    name: string;
    tel?: number;
    email?: string;
  }
  ```

### 2.1.3 nullとundefinedについて
- **[MUST]** `nullable` は意図的に許容するときにのみ使用する
- **[MUST]** オプショナル `?` と `null` を混ぜない
- **[SHOULD]** `strictNullChecks` をONにする(tsconfig)

  BAD:
  ```ts
  const getUserName = (user) => { // any型
    // undefinedの場合ここで落ちる
    return user.name
  }
  ```

  GOOD:
  ```ts
  const getUserName = (user?: UserDTO): string => {
    return user?.name ?? 'Guest'
  }
  ```
### 2.1.4 Union Typeについて
- **[SHOULD]** `enum` は出力が複雑（JS変換時のオブジェクト化）なので、`Union literal` で完結する
  - とくに `enum` はトランスパイル後のコード肥大化やstrictチェック崩壊の原因になりやすい
  - APIレスポンス等では `enum` よりstring literalのほうが型推論も柔軟に対応できる

    BAD:
    ```ts
    // JSでバイナリ化されるので非推奨
    enum UserRoleEnum {
      ADMIN = 'ADMIN',
      USER = 'USER',
      GUEST = 'GUEST',
    }
    ```

    GOOD:
    ```ts
    type Role = 'admin' | 'user' | 'guest'

    function hasPermission(role: Role): boolean {
      return role === 'admin'
    }
    ```

### 2.1.5 関数と副作用について
- **[MUST]**「ロジック」と「副作用（API/DOM操作など）」を一つの処理に同居させない
  - 副作用を外に追い出すだけで、再利用性とテスタビリティが上がる

    BAD:
    ```ts
    // vue内で直書きしている
    onMounted(async () => {
      const res = await axios.get('/users')
      user.value = res.data
    })
    ```

    GOOD:
    ```ts
    // composables/useFetchUser.ts
    export const useFetchUser = async (id: string): Promise<UserDTO> => {
      const res = await api.get(`/users/${id}`)
      return res.data
    }
    ```

### 2.1.6 import
- **[MUST]** 読みやすくするためと、diff時の見やすさのために、以下のグループ順で統一する
- **[MUST]** `alias` は**必ずsrc直下に"@"をエイリアス**する

  | グループ        | 内容                               | 例                                                |
  | --------------- | ---------------------------------- | ------------------------------------------------- |
  | built-in        | Node.js標準モジュール              | `import fs from 'fs'`                             |
  | external        | npm依存ライブラリ                  | `import { ref } from 'vue'`                       |
  | internal(Alias) | @/などのプロジェクト内alias import | `import { useUserStore } from '@/store/user'`     |
  | parent          | 親ディレクトリ相対                 | `import { fetchData } from '../api'`              |
  | Sibling         | 同一階層                           | `import Button from './Button.vue`                |
  | type            | 型専用import                       | `import type { UserInfoDTO } from '@/types/user'` |

また、ESLintの `ESLint import-order` に上記の設定を適用しておくことで、コードフォーマッターで順序を整えてくれるようになる

## 2.2 Vueテンプレートのコーディングスタイル
### 2.2.1 全般について
- **[MUST]** Script setup構文を使用する
  ```ts
  <script lang="ts" setup>
  import { ref, computed } from 'vue'

  const props = defineProps<{ userId: string }>()
  const emit = defineEmits<{
    (e: 'submit', id: string): void
  }>()

  const name = ref('')
  const upperName = computed(() => name.value.toUpperCase())

  function handleSubmit() {
    emit('submit', name.value)
  }
  </script>
  ```
- **[MUST]** Option API (`export default { data() {…} }`) は使用禁止とする
  - Composition APIを使用する
- **[SHOULD]** `watch`の使用は「リアクティブな入力に対するリアクティブな反応」という文脈でのみ使用し、データ取得を状態の副作用として扱いたい場合は `watchEffect` を使用する

  BAD:
  ```ts
  // データ取得トリガーにしたwatch
  watch(() => form.value.userId, async (id) => {
    const res = await api.fetch(id)
    data.value = res
  })
  // この場合、画面を開いた際にwatchが走ったり
  // userIdが空になったときにエラーとなる事故が発生しやすい
  ```

  GOOD:<br>
  `watchEffect` または `computed` によせる<br>
  特に、`watchEffect` は依存を自動トラッキングしてくれるので、「どの変数を監視しているか」を明示する必要がない
  ```ts
  watchEffect(async () => {
    if (userId.value) {
      data.value = await api.fetch(userId.value)
    }
  })
  ```

  または `watch` を関数呼出しトリガーとしてのみ使用する
  ```ts
  const fetchData = async (id: string) => {
    if (!id) return
    const res = await api.fetch(id)
    data.value = res
  }

  // watchは関数呼び出しトリガーのみ
  watch(userId, fetchData)
  ```

### 2.2.2 テンプレートのコーディングスタイル
#### Top-LevelのVueコンポーネントタグ順
- **[MUST]** 以下の順番とする
  ```html
  <template>...</template>
  <script>/* ... */</script>
  <style>/* ... */</style>
  ```

#### 複数属性の記載
- **[MUST]** 複数の属性を記載する場合は改行する

  BAD:
  ```html
  <MyComponent foo="a" bar="b" baz="c"/>
  <img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
  ```

  GOOD:
  ```html
  <MyComponent
    foo="a"
    bar="b"
    baz="c"
  />
  <img
    src="https://vuejs.org/images/logo.png"
    alt="Vue Logo"
  >
  ```

#### v-modelの使い方
`v-model`は親子間の明示的な値受け渡しのための糖衣構文<br>
内部的には`props` + `emit`で構成されている<br>
安易に使用するとリアクティブ依存関係が不明確になる（データフローが追えなくなる）場合があるので、利用箇所を明確に制限する

- `v-model`使用の原則
  - `v-model`は単一値の入出力に限定して使用する
  - オブジェクト全体・複合データ・Store直参照などの双方向バインドは禁止する
  - 親子間のデータ連携には原則は`props` + `emit`で行い、必要に応じて`computed`で補助する

- **[MUST]** 表示専用（ReadOnly）の項目に`v-model`を使用してはならない
  - 双方向バインドの意味がなく、不要なリアクティブ監視が発生する
  - 読み取り専用の値は`v-model`ではなく`:value`または`{{ }}`で表現する
  - `v-model`は「入力と出力が存在する」ケースに限定すること

    BAD:
    ```html
    <!-- 表示専用なのにv-modelしている -->
    <el-input v-model="formData.juchuHeaderData.catalogName" readonly />

    <!-- 再描画や子更新でも無駄にwatchが走る -->
    ```

    GOOD:
    ```html
    <!-- 純粋に表示したいだけならバインド or プレーン表示でよい -->
    <el-input :value="formData.juchuHeaderData.catalogName" readonly />
    <!-- または -->
    <span>{{ formData.juchuHeaderData.catalogName }}</span>
    ```

- **[MUST]** `<input>`や`<select>`など、UI入力値を1対1で扱うときは`v-model`を使用する
  - コンポーネントが単一の値を管理するときに限定する
    ```html
    <el-input v-model="userName" />
    <el-checkbox v-model="isActive" />
    ```

- **[MUST]** 複数の値を扱う場合は `v-model:xxx` 構文で命名して明示する
  - 例: `v-model:checked` / `v-model:dateRange` / `v-model:selectedItem`

    ```html
    <!-- Parent.vue -->
    <date-picker v-model:start="dateRange.start" v-model:end="dateRange.end" />

    <!-- DatePicker.vue -->
    <script setup lang="ts">
    defineProps<{ start: string; end: string }>()
    defineEmits(['update:start', 'update:end'])
    </script>
    ```

    > 複数の双方向データを持つ場合、`v-model`を明示的に名前付きで扱うことで
    > 可読性と責務の分離を保ちやすくなる（公式推奨）

- **[MUST]** 再利用が可能な"入力系"子コンポーネントを使用する場合は`v-model`を使用する
  - ただし、「`v-model`を使用する = `modelValue`を`props`として受け取る」という理解が前提となる
  - 子コンポーネントには`props.modelValue`と`emit('update:modelValue')`をセットで実装すること
  - 1入力1出力のシンプルな単一責務に限定する

    ```html
    <!-- ChildInput.vue -->
    <template>
      <el-input
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
      />
    </template>
    <script setup lang="ts">
    defineProps<{ modelValue: string }>()
    defineEmits(['update:modelValue'])
    </script>
    ```

- **[MUST]** `v-model`を使用する場合は、必ず子コンポーネント側で`emit`を行う
  - emitを行わない = propsを直接書き換えているのと同等
  - 値の更新は親の責務であり、子はあくまで通知役に徹する
  - 直接propsを書き換えるとVueの警告が発生し、リアクティブの整合性も壊れる

    BAD:<br>
    ```html
    <!-- Parent.vue -->
    <child-input v-model="userName" />

    <!-- ChildInput.vue -->
    <template>
      <el-input v-model="modelValue" />
    </template>

    <script setup lang="ts">
    defineProps<{ modelValue: string }>()
    // emitしてない -> propsを勝手に書き換えてるだけ
    </script>
    ```

    ↑ このBADの例は、動作はするがイベントが「親に伝わってない」<br>
    結果、親が再レンダリングされた瞬間に値が巻き戻る、または消えるという事象が発生する可能性がある

    GOOD:
    ```html
    <!-- Parent.vue -->
    <child-input v-model="userName" />

    <script setup lang="ts">
    const userName = ref('')
    </script>

    <!-- ChildInput.vue -->
    <template>
      <el-input
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
      />
    </template>

    <script setup lang="ts">
    defineProps<{ modelValue: string }>()
    defineEmits(['update:modelValue'])
    </script>
    ```

    > v-modelの正体はあくまでも、`props`で受け取り、`emit`で返すというもの (糖衣構文に過ぎない)<br>
    > 「一方向のデータフロー × 通知」で成り立ってるという意識を持つことが重要

      **[参考程度]**`@vueuse/core`の`useVModel`を使用すると`props`+`emit`のboilerplateコードを隠蔽することができる（慣れていないとちょっと分かりづらいかも）
      ```html
      <!-- ChildInput.vue -->
      <template>
        <el-input v-model="localValue" />
      </template>

      <script setup lang="ts">
      const props = defineProps<{ modelValue: string }>()
      const emit = defineEmits(['update:modelValue'])
      const localValue = useVModel(props, 'modelValue', emit)
      </script>
      ```

- **[MUST]** 直接データ構造（オブジェクト）を`v-model`でバインドしてはならない
  - 部分更新がどこからでも発生し、依存追跡が不明確になる
  - 無限更新、パフォーマンス劣化、state破壊の温床になる

    BAD:
    ```html
    <my-component v-model="formData" />

    <script>
      const formData = reactive({
        header: {
          tokuiCD: "",
          tokuiName: "",
          // 以下たくさん
        },
        total,
        // 以下たくさん
      })
    </script>
    ```

    GOOD:
    子コンポーネント側に明示的に`props` + `emits`で伝達を行うようにする
    ```html
    <my-component :formData="formData" @change="updateForm" />
    <script setup lang="ts">
    const formData = reactive({ ... })

    const updateForm = (partial) => {
      Object.assign(formData, partial) // 明示的な部分更新
    }
    ```


- **[MUST]** ネストされたオブジェクトへの直接バインドは禁止する
  - 再代入時にリアクティブトラッキングが壊れる
  - Vueの`reactive()`はネストオブジェクトの参照変更を検知できない場合がある

    > もうすこし正確にいうと・・・<br>
    >`reactive()`でラップしたオブジェクトは、ネスト内のプロパティ再代入をトラッキングできない（つまり、再代入ではなくプロパティ書き換えが必要になる）

    BAD:
    ```html
    <el-input v-model="formData.juchuHeaderData.catalogCD" />
    ```

    GOOD:
    ```html
    <!-- 影響範囲を狭めるためにラッパーを作成する -->
    <el-input v-model="catalogCD" />

    <script setup>
    const catalogCD = computed({
      get: () => formData.juchuHeaderData.catalogCD,
      set: (val) => formData.juchuHeaderData.catalogCD = val,
    })
    </script>
    ```
    もしくは
    ```html
    <el-input v-model="catalogCD" />

    <script setup>
    const catalogCD = ref(formData.juchuHeaderData.catalogCD)
    watch(catalogCD, val => (formData.juchuHeaderData.catalogCD = val))
    </script>
    ```

- **[MUST]** `Store`を直接`v-model`にバインドしてはならない
  - `Store`はアプリケーション全体の単一ソース（Single Source of Truth）であり、双方向バインドを行うと状態の責任範囲が不明確になる
  - コンポーネント側で直接更新が走ると、他の監視ロジックや`computed`依存が破壊される危険性がある
  - `Store`の更新は必ず明示的なアクション（メソッド呼び出し・`emit`）経由で行う

    BAD:
    ```html
    <!-- 親・子どちらでもStoreの値を直接v-modelで更新している -->
    <el-input v-model="globalStore.userName" />

    <script setup lang="ts">
    import { useGlobalStore } from '@/store/globalStore'

    const globalStore = useGlobalStore()
    // これにより、Storeのstateが直接破壊される
    </script>
    ```

    GOOD:
    ```html
    <!-- 一時変数を経由し、emitやメソッド経由でStoreを更新する -->
    <el-input v-model="userName" @blur="globalStore.setUserName(userName)" />

    <script setup lang="ts">
    import { useGlobalStore } from '@/store/globalStore'

    const globalStore = useGlobalStore()
    const userName = ref(globalStore.userName)

    // Storeの値変更は明示的に行う
    function updateName() {
      globalStore.setUserName(userName.value)
    }
    </script>
    ```
    または(双方向バインドっぽくしたいなら)
    ```html
    <!-- computedを利用して明示的にgetter/setterを定義 -->
    <el-input v-model="userName" />

    <script setup lang="ts">
    import { useGlobalStore } from '@/store/globalStore'

    const globalStore = useGlobalStore()

    const userName = computed({
      get: () => globalStore.userName,
      set: (val) => globalStore.setUserName(val),
    })
    </script>
    ```

#### v-forの使い方
- **[MUST]** 必ず `key` と同時に使用する

  BAD:
  ```html
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
  ```

  GOOD:
  ```html
  <ul>
    <li
      v-for="todo in todos"
      v-bind:key="todo.id"
    >
      {{ todo.text }}
    </li>
  </ul>
  ```

  **[参考] ※なぜ `key` を一緒に使うべきか？**<br>

  まずは前提として
  > Vueは内部的に「仮想DOM」を使って画面をレンダリングする<br>
  > 仮想DOMでは「前回の状態」と「今回の状態」を比較してその"差分"のみを反映する動きをしている

  以下の例を見てみる
  ```html
  <template>
    <ul>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
  </template>
  ```

  このリストで `users` に以下の変更が起きたとする
  ```ts
  // 初期状態
  users = [
    { id: 1, name: '田中' },
    { id: 2, name: '鈴木' },
    { id: 3, name: '佐藤' },
  ]

  // 1番目を削除
  users = [
    { id: 2, name: '鈴木' },
    { id: 3, name: '佐藤' },
  ]
  ```

  `key` が無いとVueは「とりあえず上から順に再利用しよう」という挙動をする

  よって、上記リストは
  - \<li>1 → 「田中」→ 再利用して「鈴木」に上書き
  - \<li>2 → 「鈴木」→ 再利用して「佐藤」に上書き
  - \<li>3 → 「佐藤」→ 削除

  つまり中身が全部ズレて見えることになる

#### v-forとv-ifを同時使用しない
- **[MUST]** `v-for` と `v-if` は同じ要素で使ってはならない

  BAD:
  ```html
  <ul>
    <li
      v-for="user in users"
      v-if="user.isActive"
      v-bind:key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

  GOOD:<br>
  `users` に `computed` を適用して `user.isActive = true` でフィルタリングした `activeUsers` を返すようにして `v-for` で表示
  ```html
  <ul>
    <li
      v-for="user in activeUsers"
      v-bind:key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```
  または<br>
  非表示にすべきリストをレンダリングしないように、コンテナ要素に `v-if` を移動させる
  ```html
  <ul>
    <template
      v-for="user in users"
      v-bind:key="user.id"
    >
      <li v-if="user.isActive">
        {{ user.name }}
      </li>
    </template>
  </ul>
  ```
#### ロジックはcomposableへ
- **[MUST]** Vueファイル（`.vue`）内のロジックは、基本的にすべて `composable` に外出しする<br>
- **[SHOULD]** `.vue` ファイルには「UIの制御」（イベントハンドラーなど）のみが存在しているという状態にする

  ここでいうロジックは主に以下のような処理を指す
  - APIの呼び出し
  - 状態管理
  - バリデーション処理
  - 日付変換
  - etc...


  composablesを導入することで主に以下の恩恵がある
  1. ロジックに対する単体テストが容易になる
  2. 再利用が容易になる
  3. コンポーネントの肥大化を防止できる

#### 要素属性並び順
- **[SHOULD]** 要素属性の並び順は以下のとおりとする
  1. 定義
      - `is`
  2. リストレンダリング
      - `v-for`
  3. 条件分岐
      - `v-if`
      - `v-else-if`
      - `v-else`
      - `v-show`
      - `v-cloak`
  4. レンダリングモディファイア
      - `v-pre`
      - `v-once`
  5. グローバルアウェアネス
      - `id`
  6. ユニークな属性
      - `ref`
      - `key`
  7. 双方向バインディング
      - `v-model`
  8. その他属性
  9. イベント
      - `v-on`
  10. コンテンツ
      - `v-html`（非推奨）
      - `v-text`

#### ディレクティブの短縮記法
- **[SHOULD]** ディレクティブの短縮記法は常に使用する<br>

  短縮記法は以下に示す
  | ディレクティブ | 短縮記法 |
  | -------------- | -------- |
  | v-bind         | :        |
  | v-on           | @        |
  | v-slot         | #        |

  ```html
  <!-- v-bind 通常記法と短縮記法 -->
  <input
    v-bind:value="newTodoText"
    v-bind:placeholder="newTodoInstructions"
  >

  <input
    :value="newTodoText"
    :placeholder="newTodoInstructions"
  >

  <!-- v-on 通常記法と短縮記法 -->
  <input
    v-on:input="onInput"
    v-on:focus="onFocus"
  >

  <input
    @input="onInput"
    @focus="onFocus"
  >

  <!-- v-slot 通常記法と短縮記法 -->
  <template v-slot:header>
    <h1>受注入力画面</h1>
  </template>

  <template #header>
    <h1>受注入力画面</h1>
  </template>
  ```

#### 算出プロパティ（computed）
- **[SHOULD]** 複雑な `computed` は分割して単純な `computed` に分割する
  - 小さく分割した `computed` 再利用性が高い
  - 再利用を行わない場合においても、人間が理解しやすい + テストも書きやすくなるため、なるべく小さい単位に分ける

    BAD:
    ```ts
    const price = computed(() => {
      const basePrice = manufactureCost.value / (1 - profitMargin.value)
      return basePrice - basePrice * (discountPercent.value || 0)
    })
    ```

    GOOD:
    ```ts
    const basePrice = computed(
      () => manufactureCost.value / (1 - profitMargin.value)
    )

    const discount = computed(
      () => basePrice.value * (discountPercent.value || 0)
    )

    const finalPrice = computed(() => basePrice.value - discount.value)
    ```

## 2.3 Vueのcomposableのスタイル
### 2.3.1 命名規則
- **[MUST]** 命名規則は `use` + PascalCase

  | 種類                                                                 | 命名例                       | 備考                       |
  | -------------------------------------------------------------------- | ---------------------------- | -------------------------- |
  | 一般ロジック(共通コンポーネント用や、画面横断で使用するロジックなど) | useUser, useFetch, useDialog | 機能単位で命名             |
  | 特定画面専用                                                         | useP001                      | `use` + view名で明確化する |
  | 状態を返す                                                           | useXxxStore                  | Piniaを内包する場合        |
  | composable内から補助的に使うもの                                     | _useXxx                      | 内部専用（exportしない）   |

### 2.3.2 構成ディレクトリ
- **[SHOULD]** ディレクトリはレイヤー単位で整理する
  ```bash
  src/
  └─ composables/
    ├─ components/
    │   ├─ useInput.ts
    │   ├─ useSelect.ts
    ├─ logic/
    │   ├─ useValidation.ts
    │   ├─ useFormatter.ts
    ├─ views/
    │   ├─ P001/
    │   │   ├─ useP001.ts
    │   │   ├─ useP001Meisai.ts
    │   │   ├─ useP001TodokeTab.ts
    │   ├─ P002/
    │   │   ├─ useP002.ts
    └─ index.ts  ※必要であれば
  ```
| ディレクトリ  | 役割                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `components/` | 共通コンポーネント用のロジック                                                                          |
| `logic/`      | 各画面横断で使用する共通ロジック<br>(バリデーション、計算、入力値変換、Fキー制御など)                   |
| `views/`      | 特定画面のコンポーネント専用のロジック<br>(抽出・保存処理、ダイアログ、モーダル、URLパラメータ取得など) |

### 2.3.3 composableのコーディングスタイル
- **[MUST]** `ref`, `computed`, `watch`を内部完結させる
- **[MUST]** `export` は必ず `function use〇〇()`
  - `変数export` は行わない
- **[MUST]** 戻り値にUI要素は（ElMessageなど）決して含めない
  - 単体テストを行うことが難しくなるだけでなく、そもそも特定のUIを出す・出さないはテンプレート側の都合であってロジックとは本質的に無関係である
- **[SHOULD]** returnで返すオブジェクトの順番は以下の通りにする
  1. state
  2. computed
  3. methods

    ```ts
    import { ref, computed } from 'vue'
    import { getUserList } from '@/api/user'
    import type { UserDTO } from '@/types/user'

    export function useUser() {
      const users = ref<UserDTO[]>([])
      const loading = ref(false)

      const fetchUser = async() => {
        loading.value = true
        try {
          const res = await getUserList()
          users.value = res.data
        } finally {
          loading.value = false
        }
      }

      const userCount = computed(() => users.value.length)

      return {
        users,
        loading,
        userCount,
        fetchUser
      }
    }
    ```

- **[MUST]** composables内でUI操作をしてはならない
  - UIライブラリに依存すると、単体テストが行えなくなる

    BAD:
    ```ts
    import { ElMessage } from 'element-plus'

    export function useLogin() {
      const login = async () => {
        try {
          // ...
        } catch (e) {
          // これはUI層の責務
          ElMessage.error('ログイン失敗！')
        }
      }
    }
    ```

    GOOD:
    ```ts
    // useLogin.ts
    // "純粋な"ログイン処理のみを記載
    export function useLogin() {
      const error = ref<string | null>(null)
      const login = async () => { /* ... */ }
      return { login, error }
    }

    // Login.vue
    const { login, error } = useLogin()
    // メッセージ表示はUIで行う
    watch(error, msg => msg && ElMessage.error(msg))
    ```

- **[SHOULD]** composable間で依存する場合は"上位が下位を呼ぶ"構造とする
  ```bash
  UI層（.vueファイル）
  ↓
  views/
  ↓
  logic/

  つまり、viewsは常にlogic/配下のcomposableのみを呼び出す構造にする
  ```

- **[MUST]** `useXxx` の戻り値には必ず型をつける
  - 型を記載することで、IDE補完が効く・単体テストでMock化しやすい・自動ドキュメント化に使えるようになる
    ```ts
    export function useUser(): {
      users: Ref<UserDTO[]>
      loading: Ref<boolean>
      fetchUser: () => Promise<void>
    } {
    // ...
    }
    ```

- **[MUST]** 副作用（watchやイベント）はreturn前に完結させる
  - return後に副作用があるとライフサイクルの制御が難しくなる
    ```ts
    export function useScrollSync(target: Ref<HTMLElement | null>) {
      const position = ref(0)
      watch(target, (el) => {
        if (el) el.addEventListener('scroll', () => position.value = el.scrollTop)
      })
      return { position }
    }
    ```

## 2.4 Pinia Storeのスタイル
Piniaは、Vue公式の状態管理ライブラリ<br>
コンポーネント間で共有するデータや非同期処理の状態を一元管理するために使用する

- 主な利用目的
  - コンポーネント間で共有する状態を一元管理
  - アプリ全体の状態変化を追いやすくする（デバッグ・保守性）
  - TypeScriptで安全に型補完・推論を活用

- メリット
  - Composition APIとの親和性が高く、setup()から直接利用できる
  - Vue DevToolsで状態を追える（デバッグしやすい）
  - `state`, `getters`, `actions`で責務が明確に分離できる


### 2.4.1 Piniaを使うべき場面
- **[MUST]** 以下のような場面で、Piniaの使用を検討すること
  - 万能なものと思わずにあくまでも **「共有状態のキャッシュ置き場」** 程度の感覚で使用すると良い

    | 使用すべき場面                                     | 例                                                     |
    | -------------------------------------------------- | ------------------------------------------------------ |
    | 複数画面・複数コンポーネントで同じデータを扱う場合 | ユーザー認証、認証トークン、共通設定（権限など）       |
    | 状態をまたいでAPI呼び出しの結果を再利用したい場合  | 抽出条件・抽出結果の保持、モーダルの入力内容の保持など |
    | アプリ全体のグローバル状態管理が必要な場合         | ログイン状態、通知管理など                             |
    | 非同期処理+状態更新を一箇所に集約したい場合        | 共通エラーハンドリングなど                             |



- **[MUST]** 以下のような場面ではPiniaの使用は避けること

  | 避けるべき場面                                         | 理由                                                                                            |
  | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
  | 1画面・1コンポーネントで完結する状態                   | `composable`、または`ref/reactive`で十分なため                                                  |
  | 一時的なフォーム入力状態                               | 再利用が不要・スコープが過剰となるため                                                          |
  | UIの開閉・フラグ管理（モーダルやロード中アイコンなど） | コンポーネント内で管理するほうが自然なため、そもそもPiniaで複数画面で使えるようにする意義が薄い |
  | APIの単発呼び出し                                      | `composable`(`useFetchXxx`など)で充足するため                                                   |


### 2.4.2 Piniaのコーディングスタイル
#### ストアの基本構成
- **[MUST]** 各ストアは以下の3層構造で定義をする
  - `state`: 純粋データ（UI情報や副作用は含まない）
  - `getters`: 計算済み状態（`computed`に相当）
  - `actions`: 非同期処理・副作用・API呼び出しなど

    ```ts
    export const useUserStore = defineStore('user', {
      state: (): UserState => ({
        userInfo: null,
        token: '',
      }),

      getters: {
        isLoggedIn: (state) => !!state.token,
      },

      actions: {
        async fetchUserInfo() {
          this.userInfo = await userApi.getInfo()
        },
      },
    })
    ```

#### ストアの命名規約
- **[MUST]** 以下のルールに基づいて命名する

  | 種類     | 命名ルール                          | 例                               |
  | -------- | ----------------------------------- | -------------------------------- |
  | ストアID | camelCase                           | user, orderList                  |
  | state    | camelCase                           | userInfo, orderItems             |
  | getter   | camelCase(ただし`computed`的にする) | isLoggedIn, totalPrice           |
  | actions  | camelCase(動詞始まり)               | fetchUserInfo, updateOrderStatus |

#### ストアの責務
- **[MUST]** 1ストア = 1ドメイン単位とし、責務を1つだけに絞る
- **[MUST]** グローバル設定は`globalStore`に集約する
  - 例えばユーザーのセッション情報や認証情報など
- **[SHOULD]** UI状態は持たせない
  - 例えば、`isLoading`や`inputMode`といったUI状態の情報はコンポーネント側で管理する
- **[SHOULD]** API呼び出しなどを行う場合は`actions`で統一する

#### 一方向データフローの厳守
- **[MUST]** 一方向のデータフローを厳守する
  - コンポーネントではActionをよぶだけにする
  - 更新時はState → Getter経由で参照する

    BAD:
    Stateの直接更新はNG
    ```html
    <input v-model="store.someField" />
    ```

    GOOD:
    イベントに応じてActionを呼び出すことで更新を行う
    ```html
    <input
      :value="store.someField"
      @update="store.updateSomeField($event)"
    />
    ```

#### 永続化（`pinia-plugin-persistedstate`）使用時
- **[MUST]** 永続化対象は「セッション情報」「ユーザー設定」など最小限に限定する
- **[SHOULD]** パスワード・トークンなど機微情報は必ず`salt`付きで暗号化する、または永続化しないようにする
- **[SHOULD]** persist設定はストア内で完結する（外部ロジック混入禁止）

#### 共通処理はcomposableへ
- **[SHOULD]** 複数ストアから参照される処理は`composable`に分離する
  - 例えばAPIのリトライ処理、日付フォーマット関数など

#### その他禁止事項
- **[MUST]** コンポーネント内で`storeToRefs`せずに直参照をしない
- **[MUST]** `composable`内からStoreを直接importしない
  - 循環参照や、依存関係のねじれが発生しやすくなる
  - 必要なら`inject/provide`や`props`経由で受け渡しする
- **[MUST]** `Store`は無駄に増やさない
  - 小さなローカル状態をPiniaに入れると、逆にスコープが曖昧となり、管理が複雑になる
  - 原則は「アプリ全体」、必要に応じて「機能単位」とすれば良い
- **[MUST]** stateを直接操作しない
  - mutation的なロジックは必ず`actions`を経由する
  - 直接代入を行うとデータフローが不透明となる
- **[MUST]** `Store`内でのDOM操作は行わない
  - piniaの状態管理という責務から逸脱してる
- **[MUST]** 複数`Store`で同じデータを重複して持たない
  - ソースオブトゥルースが曖昧になる


**※[参考] 一般的に`Pinia Store`と`composable`の棲み分けは以下のような形となる**

  | 用途                         | 推奨手段      | 備考                     |
  | ---------------------------- | ------------- | ------------------------ |
  | 単一画面内での状態・ロジック | `composable`  | 再利用性・テスト性が高い |
  | 複数画面で共有する状態       | `Pinia Store` | グローバルストアで統一   |

# 3. テスト方針
## 3.1 概要
単体テストには`Vitest`を使用する<br>
テストコードは`src/tests/`以下にまとめて配置を行い、テストの分散を防止・管理を一元化する

```
src/tests
├── composables/
├── store/
├── utils/
```

## 3.2 テストの基本方針
### APIラッパー
- **[MUST]** APIラッパーは、**呼び出し側でmock化してテスト**を行う
  - **APIラッパー自身のテストは不要**（通信はaxiosで保証されているため）
  - composableやstoreの単体テストでmock化対象とする

### composables
- **[MUST]** composablesに対しては **原則テスト必須** とする
  - 業務ロジックが集中するので、必ず`src/tests/composables/`に対応ファイルを作成すること
  - 外部API・Store依存などがある場合はMock化してテストを実施する

    ```
    src/composables/views/P001/useP001.ts
    → src/tests/composables/views/P001/useP001.spec.ts
    ```
### vueコンポーネント（.vueファイル）
- **[MUST]** vueコンポーネントは **原則テスト不要** とする
  - UI描画やDOM挙動、イベントの発火、画面の遷移などを **打鍵テストで担保** する
    - `composable`に定義されているロジックは"正しく動くこと"自体はvitestで担保できているので、打鍵時は **操作の結果、期待されるタイミングでその処理が呼び出されること** を担保すればよい
  - vitestではテンプレートテストの作成・保守コストが高く、また十分な効果も得られないと判断した
    - `Cypress`による自動E2Eテストも検討したが、導入コストと作成・保守コストが高いと判断したため取り下げた

### store(Pinia)
- **[MUST]** storeは`getter`、`action`に**業務ロジックが含まれている場合のみテスト対象**とする
  - stateのみの単純なデータ保持については、そもそものテスト対象が存在しないので除外する

### utils（共通関数）
- **[MUST]** utilsは **重要関数のみをテスト対象** とし、それ以外の関数はテスト不要とする
  - 判定基準は「if/elseや分岐・副作用があるか」と「外部依存があるか」で決定する

    | 関数の性質                                  | テスト必要性            | 理由                                                                                                                            |
    | ------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
    | 単純なリテラル返却<br>(例: `isEmpty(str)`)  | 不要                    | コストに対して効果が見合わない                                                                                                  |
    | ヘルパー系<br>(例: `toUpperCase()`ラッパー) | 不要                    | コストに対して効果が見合わない                                                                                                  |
    | 分岐ロジックあり<br>(例: `getStatus(code)`) | 必須                    | 条件分岐ミスを防ぐ                                                                                                              |
    | 副作用あり<br>(例: `convertDateFormat()`)   | 必須                    | 入出力の安定性確保                                                                                                              |
    | 外部依存あり<br>(例: `callApi()`)           | 必須 (外部依存はMock化) | 依存先がエラーとなった場合の挙動の検出のため<br>正常系については他レイヤー(FW/外部ライブラリ)が保証している場合は省略してもよい |

#### 原則
- 「処理の結果がif文で変わる、または外部依存があるもの」はテスト必須
- そうでない単純変換関数は不要

## 3.3 composablesのテスト方針
- **[MUST]** 関数単位でテストケースを設計する
- **[MUST]** 副作用（API通信・store操作など）はすべてMockする
  - Mock対象例
    - API呼び出し関数（axiosラッパー）
    - Storeアクセス（Pinia）
    - routerなどアプリ依存の外部モジュール
- **[MUST]** リアクティブ変数は`ref`/`reactive`の動作を確認する

  例：
  ```ts
  import { useCounter } from '@/composables/useCounter'

  describe('useCounter', () => {
    it('カウンターがインクリメントすること', () => {
      const { count, increment } = useCounter()
      increment()
      expect(count.value).toBe(1)
    })
  })
  ```

## 3.4 store(Pinia)のテスト方針
- **[MUST]** `getters`/`actions`のロジックを単体で検証
- **[MUST]** stateの初期値確認・更新結果をassert
- **[MUST]** 外部API呼び出しはmock化する

  例:
  ```ts
  import { setActivePinia, createPinia } from 'pinia'
  import { useUserStore } from '@/store/user'

  describe('user store', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    it('トークンが正しく更新されていること', () => {
      const store = useUserStore()
      store.setToken('123')
      expect(store.token).toBe('123')
    })
  })
  ```

## 3.5 テスト命名規則
- **[MUST]** テストの命名は以下のとおりとする

  | 種類             | 命名規則                                         | 例                                                                          |
  | ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
  | テストファイル名 | `<対象名>`.spec.ts                               | useUser.spec.ts, dateUtils.spec.ts                                          |
  | describe句       | `<対象モジュール>`or`<対象関数>`or`<テスト条件>` | describe('useUser'), describe('getUser'), describe('APIがエラーを返す場合') |
  | it句             | 「～されること」「～すべき」                     | it('ユーザーデータが取得できること'), it('エラーを返すこと')                |

- **[SHOULD]** 複数条件をまとめてテストする場合は、describeを「関数単位」でまとめ、it句で条件を分ける

## 3.6 Mock化ガイドライン
### 基本方針
- **[MUST]** `composables`/`store`のテストでは外部依存（API、router、storeなど）を必ずMock化すること
- **[MUST]** `vi.fn()` または `vi.mock()` を用いてスタブ関数を生成し、依存関数の副作用を切り離すこと
- **[SHOULD]** Mockの戻り値・動作パターン（正常/異常）を切り替えて、ロジック分岐を網羅する

### Mock化の例
やり方はいくつかある（と思う）が、ここではやり方の一つを示す<br>
テスト対象のロジック分岐を網羅できれば、Mock化の手法自体は問わない

#### APIラッパーのMock例
```ts
// テスト対象のcomposable
import { fetchUser } from '@/api/userApi'

export const useUser = () => {
  const user = ref(null)
  const getUser = async () => {
    user.value = await fetchUser()
  }
  return { user, getUser }
}


// vitest側
import { useUser } from '@/composables/useUser'

// APIラッパーをmock化
vi.mock('@/api/userApi', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' })
}))

describe('useUser composable', () => {
  it('ユーザー情報が取得できること', async () => {
    const { user, getUser } = useUser()
    await getUser()
    expect(user.value.name).toBe('Alice')
  })
})
```

#### Store依存のMock例
```ts
// テスト対象のcomposable
import { useUserStore } from '@/store/user'

export const useAuth = () => {
  const store = useUserStore()
  const login = (token: string) => store.setToken(token)
  return { login }
}


// vitest側
vi.mock('@/store/user', () => ({
  useUserStore: vi.fn(() => ({
    setToken: vi.fn()
  }))
}))

describe('useAuth composable', () => {
  it('storeのsetTokenが呼ばれること', () => {
    const { login } = useAuth()
    const mockStore = useUserStore()
    login('abc123')
    expect(mockStore.setToken).toHaveBeenCalledWith('abc123')
  })
})
```

#### Router依存のMock例
```ts
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/dashboard')
expect(router.push).toHaveBeenCalledWith('/dashboard')
```

### テスト時のポイント
| 項目                                    | 内容                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `vi.fn()`                               | 単一関数のMock化（戻り値・呼び出し検証）                                   |
| `vi.mock()`                             | モジュール全体をMock化                                                     |
| `mockResolvedValue`/`mockRejectedValue` | Promiseの戻り値をエミュレート                                              |
| `beforeEach`での初期化                  | 各テスト前に実行される初期化処理<br>状態がテスト間で汚染されないようにする |
| `import`パスの指定                      | 絶対パス (@/api/...)を必ず正確に指定する                                   |

## 3.7 カバレッジ
- **[SHOULD]** カバレッジの基準（目安）は以下のとおりとする
  - ただし、あくまでも目安の位置づけ
  - この数値を必ず満たしていなくてはならないというわけでは無いことに留意

    | 種別        | 目標カバレッジ         |
    | ----------- | ---------------------- |
    | composables | 80%以上                |
    | store       | 70%以上 (必要部分のみ) |
    | utils       | 70%以上 (必要部分のみ) |

## 3.8 テストの意義
テストは「あるから安心」ではない<br>
何を、なぜ、どう保証したいかを考えた結果として存在する<br>
<br>
書くことが目的になったテストはノイズであり無駄なコストでしか無いが、<br>
意味を持つテストはシステムの信頼性そのものになる
