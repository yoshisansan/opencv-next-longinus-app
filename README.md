# aminosanの概要  
 aminosanはアミノ酸バランスの良い食材の組み合わせが見つかるサイトです。  
 アミノ酸組成表に基づき良い食材同士をマッチングさせる機能のあるサイトになります。  
<br><br><br>
## 始め方  
yarn install  
yarn dev  
<br><br><br>
## 進行状況
現在はpages/essential/ItemNo.tsxを実装中。（70%程度）  
<br>
翻訳は環境の準備と少しだけ手をつけてあとは未着手  
<br><br><br>
## アーキテクチャ  
  components → atom < molecular < organism < template の順で大きなコンポーネント。calとutilは大きさとは別の区分け。  
  <br>
  components/calculation は "計算式" を中心に数値の算出をメインとした処理はcalに格納しています（componentやcontainerの中で見た目部分とは関係のない計算式が混じると可読性が下がるため切り分けてみた）。  
  <br>
  components/utilはSEOやライブラリの設定、オブジェクトとして使い回すデータなどが入ります。  
  <br><br>
  data → create はデータを加工して生成するスクリプト、generate は create のスクリプトによって生成されたソース。 handmade は手動で作成したファイル。  
  <br><br>
  pages → 各ページ。  
  <br><br>
  public/locales → 翻訳ファイル置き場。  
  <br><br>
  types → 型置き場。  
  <br><br>
  containersディレクトリとcomponentディレクトリのファイル名と位置関係はほとんど同じになっていますがcontainersのファイル名の末尾は異なります。  
  <br>
  コンポーネント名 + Container.tsx という名前で構成。全てコンポーネント名にの計算処理と切り分けしています。  
  （状態管理、関数による計算、HTTP通信を要する処理など。useTranslation、コード量の少なく簡易的なスタイルの変更処理はcontainersから除く）  
  <br>
  componentディレクトリにありcontainersディレクトリにないファイルは計算処理がないことになります。（ただ計算処理の関数やクラスを呼び出しているだけのものはcomponentに含む）  
  <br>
  containersは常にcomponentの親となって値を渡しています。
  <br><br>
<br><br><br>

## データ  
データの入れ替えや拡張性をふまえてデータにレイヤーの概念（n次ソース）をあてはめました。  
データ遷移ごとに次元を決めてデータを加工する範囲を規定しています。
<br><br>
1次ソース：文部科学省などの政府・組織データからダウンロードした状態（加工なし）
<br><br>
2次ソース：スプレッドシートのデータを開いた状態（英語や日本語を問わず列数とキーを揃える。数値の加工はしない。  
参考：https://docs.google.com/spreadsheets/d/1edseMUqeLs-lmG1ZEbyPfsiOxVCE1xlShNIUCSYX2Gg/edit?usp=sharing）  
エクセルのデータは可能な限り編集しない方針です。
<br><br>
3次ソース：SSSAPIにスプレッドシートのデータをimportした状態（スプレッドシートをJSON化）
<br><br>
4次ソース：3次ソースからサーバーサイドからデータを引っ張ってきた状態（不要なカッコなどを取り除いて数値をType化する ※Firebaseなどを使用する予定。現在はローカルフォルダで加工）
<br><br>
5次ソース：クライアントがデータを表示している状態（State管理でデータを加工）
<br><br><br>

## スタイルの方針  
chakraUIを中心にスタイリングしています。複雑、もしくは注釈が必要な特殊なスタイルを要するものはemotionを使用します。  
<br><br>
グローバル設定→ChakraUI
<br><br>
簡易的なスタイル→ChakraUI（余白、色付け、静的など）
<br><br>
UIライブラリ→ChakraUI
<br><br>
複雑なスタイル→emotion（繰り返しの回避、CSSの特殊なテクニックを使用するスタイル、アニメーション関連など）
<br><br><br>


# opencv-next-longinus-app
