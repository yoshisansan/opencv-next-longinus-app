import { VFC } from 'react'
import { Box, useRadio, useRadioGroup, HStack, RadioProps } from '@chakra-ui/react';
import CommonBox from 'components/atom/CommonBox'
import { HandleOrderFilterT } from 'types/TableComponentType';
import { useTranslation } from 'next-i18next'

// ソースコードはChakraUI公式の書き方を参照 https://chakra-ui.com/docs/form/radio
const RadioCard: VFC<RadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    // marginStart="0 !important" marginInlineStart="0 !important"は勝手に２つ目以降のラジオボタンにmarginが効いてしまう仕様を回避
    <Box as="label" w="100%" m="0" pb="8px" textAlign="center" marginStart="0 !important" marginInlineStart="0 !important" >
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        boxShadow="md"
        h="32px"
        lineHeight="6px"
        fontSize="base"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}


const FilterCategory: VFC<{lead: string, handleOrderFilter: HandleOrderFilterT}> = ({lead, handleOrderFilter}) => {
  const { t } = useTranslation('common');
  const absolutedVol = t("In order of absolute amount");
  const balancedVol = t("in order of balance");

  const options: string[] = [absolutedVol, balancedVol];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: lead,
    defaultValue: absolutedVol,
    onChange: (value: string) => {  
      type dictionaryKey = { [key: string]: string }
      const key = value as keyof dictionaryKey;
      const dictionary = {
        [absolutedVol]: "absolute",
        [balancedVol] : "balance",
      }
      handleOrderFilter(dictionary[key])
    },
  })

  const group = getRootProps()

    return(
      <CommonBox lead={lead}>
        <HStack {...group} flexWrap="wrap">
          {options.map((value: string) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </CommonBox>
      );
  }
export default FilterCategory