import CommonBox from 'components/atom/CommonBox'
import { useTranslation } from 'next-i18next';
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel} from '@chakra-ui/react';
import { questionAnswerTexts } from 'components/util/questionAnswerText';
import { QuestionAnswerTextType } from 'types/UtilTypes';

const QuestionAnswers = ({questionAnswerKeys}: {questionAnswerKeys: string[]}) => {
  const { t } = useTranslation('common');

  const ListComponents = questionAnswerKeys.map((keyName: string, index: number) => {
    const keyAssertion = keyName as keyof QuestionAnswerTextType;
    const {question, answer} = questionAnswerTexts[keyAssertion];
    return (
      <AccordionItem key={index}>
        <h3>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text>{question}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h3>
        <AccordionPanel pb={4}>
          {answer}
        </AccordionPanel>
      </AccordionItem>
    )
  })

  return(
  <CommonBox lead={t("Q & A")}>
    <Accordion allowMultiple>
      {ListComponents}
    </Accordion>
  </CommonBox>
)};

export default QuestionAnswers