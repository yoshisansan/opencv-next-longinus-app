# ロンギヌスの槍を飛ばし放題サイトの概要

AR FUKUOKA のハンズオンにて覚えた JS からの MediaPipe と OpenCV を利用した AR ウェブカメラの実装（index.html ベタ書き）を NextJS へ落とし込み元ネタのライトセーバーからエヴァンゲリヲンのネタであるロンギヌスの槍へ変えて飛ばしたい放題にしたサイトです。

複数言語対応にして世界中の人が誰でもロングヌスの槍を飛ばせる世界を目指します（使命感）

## 準備

DeepL 使用時：.env.development.local フォルダを使用

以下を追加
DEEPL_AUTH_KEY=hogehoge

### DeepL API の準備

API を叩く前に

1. yarn extract-translations にて i18n を使用しているパートをディレクトリから抽出します。
2. public/locales/en/manualTranslation.json にて抽出したパートに英語訳を入れておきます
3. DeepL API で翻訳しておきたくない言語のパートがある場合は任意の言語の manualTranslation.json の key に好きな訳を入れておきます
4. yarn translate で翻訳開始

### DeepL API で翻訳したい言語を増やす場合

1. DeepL のドキュメント https://www.deepl.com/ja/docs-api/translating-text/multiple-sentences/ で対応可能の言語を参照
2. i18next-parser.config.js の locales キーの配列に任意の言語を設定
3. next-i18next.config.js の i18n キー と domains キー にも任意の言語で同様の設定を行う
