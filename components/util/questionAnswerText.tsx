import { Box, Text } from "@chakra-ui/layout"
import i18n from '../../i18n';
// https://stackoverflow.com/questions/66527036/access-next-i18next-translations-outside-of-page-component
// https://react.i18next.com/latest/withtranslation-hoc
// import { withTranslation, WithTranslation } from 'i18n';
// type Props = WithTranslation;
// const Page: React.FC<Props> = (props) => {
  
// }

// export default withTranslation(['common'])(Page);


// const tr = (pr: string) => {
//   return i18n.t(pr);
// };
// calは計算系の質問
export const questionAnswerTexts = {

  'calA': {
    question: '各アミノ酸の比率はどうやって計算していますか？',
    answer: (
      <Box lineHeight="1.618">
        <Text mt="8px">{i18n.t("計算式は以下の通りです")}</Text>
        <Text mt="8px">{i18n.t("1gあたりの食材に含まれる各アミノ酸含有量 / アミノ酸評点パターンの各アミノ酸の数値 （単位：mg） = 各アミノ酸の比率")}</Text>
        <Text mt="8px">参照：<a href="https://apps.who.int/iris/handle/10665/43411">Protein and amino acid requirements in human nutrition : report of a joint FAO/WHO/UNU expert consultation</a></Text>
      </Box>
    )
  },
  'calB': {
    question: 'タンパク質はどうやって計算していますか？',
    answer: (
      <Box lineHeight="1.618">
        <Text mt="8px">計算式は以下の通りです。</Text>
        <Text mt="8px">食材に含まれるタンパク質 x アミノ酸スコア = アミノ酸に基づいた摂取可能なタンパク質</Text>
        <Text mt="8px">参照：<a href="https://apps.who.int/iris/handle/10665/43411">Protein and amino acid requirements in human nutrition : report of a joint FAO/WHO/UNU expert consultation</a></Text>
      </Box>
    )
  },
  'dataA': {
    question: 'アミノ酸組成のデータは何を参照していますか？',
    answer: (
      <Box lineHeight="1.618">
        <Text mt="8px">日本の文部科学省が公開しているアミノ酸組成表を参考にしています</Text>
        <Text mt="8px">参照：<a href="https://apps.who.int/iris/handle/10665/43411">リンク</a></Text>
      </Box>
    )
  },
  'dataB': {
    question: 'アミノ酸スコア以外のデータはありませんか？',
    answer: 'アミノ酸組成表および関連するオープンソースのデータを教えてくれる方を募集しています。お問い合わせからご連絡いただけると幸いです。当サイトの開発初期にPDCAASおよびDIAASを採用することを検討しましたがそれらの計算に必要なデータリストを見つけることができなかったために断念しました。USDCなどが公開してるパブリックデータの中からそうしたものはないのか探しました。開発者が日本人であり英語が堪能でないこともあり、各国のオープンソースデータを見つけることが困難です。提供者の方をお待ちしています。'
  },
  'otherA': {
    question: 'お問合せ先はありますか',
    answer: 'EメールかTwitter'
  },
  'otherB': {
    question: 'ご協力のお願い',
    answer: '一般の方から研究者の方まで改善案をお待ちしています。当サイトは個人的な好奇心からタンパク質に関する便利なサイトを作ろうという動機から個人で作成しました。地域によってはより効率の良いタンパク質の摂取が必要であることでしょう。他にも私が把握していない範囲で様々な問題があると思いますが利用者の方の用途へアプローチできているのか把握できておりません。ぜひ改善案をいただければありがたく参考いたします。データのご提供などあれば事前の相談の上でご協力者名として掲載させていただきたいと思います。'
  },

}