# 市区町村ハザードマップテンプレート

## 開発について

このプロジェクトは [Create React App](https://github.com/facebook/create-react-app) で作成されています。

以下のコマンドが使用可能です。

### `npm start`

開発モードでアプリを起動します。\
ブラウザで見るには [http://localhost:3000](http://localhost:3000) を開いてください。

コードを変更するたび、ページも更新されます。\
また、コンソールで lint エラーも確認できます。

### `npm run build`

本番向けのアプリをビルドし、`build` フォルダに配置します。

デプロイについて詳しくは [Create React App の Deployment](https://facebook.github.io/create-react-app/docs/deployment) ページを参照してください。

### `npm run prebuild`

`hazardmap-config.jsonc` や `csv` ディレクトリの内容をもとに、`src/generated` 以下のファイルを更新します。\
これらに変更を加えた場合は、`npm start` の前に一度実行してください。

### `npm run format`

`src` 以下のコードを整形します。\
フォーマッタには [Prettier](https://prettier.io/) を使用しています。
