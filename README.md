# 市区町村ハザードマップテンプレート

市区町村の Web ハザードマップを作成するためのテンプレート。

[Tokyo OSS Party!!](https://tokyo-oss-party.com/) 2021 の成果物です。\
発表資料は https://speakerdeck.com/sankichi92/shikuchoson-hazardmap-template

## 利用例

- [八王子市](https://sankichi.net/hachioji-hazardmap/) ([sankichi92/hachioji-hazardmap](https://github.com/sankichi92/hachioji-hazardmap))

## 背景と課題

日本のハザードマップは、国土交通省の管理する[ハザードマップポータルサイト](https://disaportal.gsi.go.jp/)にまとめられており、そこでは以下の2つのサービスが提供されています。

- 重ねるハザードマップ: 災害リスク情報や防災に役立つ情報を、全国どこでも重ねて閲覧できるWeb地図サイト
- わがまちハザードマップ: 市町村が作成したハザードマップを見つけやすくまとめたリンク集

「重ねるハザードマップ」は Web 地図として多機能で非常によく作りこまれていますが、その[使い方](https://disaportal.gsi.go.jp/hazardmap/pamphlet/pamphlet.html)でも

> 詳細を確認する場合は市町村が作成したハザードマップをご覧ください。

とあるとおり、あくまで国の作成した地図であり、市区町村ごとの詳細は確認できません。

ハザードマップに求められるのは、多くの場合、国全体の広く浅い情報ではなく、自身の住む場所ピンポイントの狭く深い情報です。
そうした情報を確認するには、「わがまちハザードマップ」から市区町村のハザードマップを確認する必要があります。

しかし、市区町村の作成するハザードマップの多くが紙での配布を前提としており、重ねるハザードマップとちがって Web に最適化されていません。
そしておそらく、独自の Web ハザードマップを開発・運用できるほど、予算やリソースに余裕のある市区町村は少ないでしょう。

この課題に対し、本プロジェクトは、市区町村の単位で Web ハザードマップを容易に作成・カスタマイズできるテンプレートを提供します。

## 使い方

動画で見る: https://youtu.be/oc1CfaVSlno

### ハザードマップの作成・公開

#### 1. テンプレートを使用して GitHub リポジトリを作成する

1. 上部（あるいはこちら）の「[Use this template](https://github.com/sankichi92/shikuchoson-hazardmap-template/generate)」ボタンを押す
2. Repository name を入力（例: `hachioji-hazardmap`）し、「Create repository from template」ボタンを押す
   - Repository name が次の手順で公開する Web ページの URL の一部になります

詳細: https://docs.github.com/ja/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template

#### 2. `hazardmap-config.jsonc` を対象の市区町村向けに更新する

1. 作成したリポジトリの [`hazardmap-config.jsonc`](./hazardmap-config.jsonc) をクリックして開く
2. ファイル右上の鉛筆✏️ボタンをクリックして編集画面を開く
3. `prefecture` と `city` の値をハザードマップを作成する都道府県・市区町村に変更して「Commit changes」ボタンを押す
   - 合わせて、不要な `tiles` の要素（`{}` で囲まれる単位）も消してください。たとえば、内陸であれば「高潮浸水想定区域」は不要でしょう

詳細: https://docs.github.com/ja/repositories/working-with-files/managing-files/editing-files#editing-files-in-your-repository

#### 3. 作成したリポジトリの設定で GitHub Pages を有効化して Web ページを公開する

1. 上部タブ「Settings」→サイドバー「Pages」から GitHub Pages の設定画面へ移動する
2. Source に「`gh-pages`」を選択して「Save」ボタンを押す
3. しばらくすると、GitHub Pages の設定画面に URL が表示され、ハザードマップがその URL で公開される

詳細: https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### ハザードマップのカスタマイズ

#### CSV ファイルをアップロードしてカスタムレイヤを追加する

1. 作成したリポジトリの [`csv`](./csv) をクリックして内容を表示する
2. 「Add files」→「Upload files」から CSV ファイルをアップロード、「Commit changes」ボタンを押す
3. [`01-サンプル.csv`](./csv/01-サンプル.csv) を表示し、右上のゴミ箱🗑ボタンからファイルを削除する

詳細: https://docs.github.com/ja/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

##### CSV のフォーマットについて

CSV ファイルは必ず `name`（名前）、`lat`（緯度）、`lon`（経度）のカラム（列）を持つ必要があります。
さらに、これらのカラム以外も追加でき、地図上のアイコンをクリックしたときに合わせて表示されます。
また、ファイル名先頭の `01-` は地図上での表示順を決めるために使われ、数字自体は地図上に表示されません。

[`01-サンプル.csv`](./csv/01-サンプル.csv) を参考にしてください。

#### 画像をアップロードして地図の左下に表示する

CSV 同様、[`images`](./images) 以下に画像をアップロードすれば、地図の左下に表示されるようになります。

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

### `npm run prebuild`

`hazardmap-config.jsonc` や `csv`, `images` ディレクトリの内容をもとに、`src/generated` 以下のファイルを更新します。\
当該ファイル、ディレクトリの変更を反映するには、`npm start` の前に一度このコマンドを実行してください。

### `npm run format`

`src` 以下のコードを整形します。\
フォーマッタには [Prettier](https://prettier.io/) を使用しています。
