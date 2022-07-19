import { VFC, useContext } from 'react'
import { Box, useRadio, useRadioGroup, HStack, RadioProps } from '@chakra-ui/react'
import CommonBox from 'components/atom/CommonBox'
import { useTranslation } from 'next-i18next'
import { HandleCategoryFilterT } from 'types/TableComponentType'
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext'
import { AminoTableContext } from 'components/atom/AminoTableContext'
import { FoodInputValueContext } from 'components/atom/FoodInputContext'
import { AminoTableContextT } from 'types/TableComponentType'

// ソースコードはChakraUI公式を参照 https://chakra-ui.com/docs/form/radio
const RadioCard: VFC<RadioProps> = (props) => {

  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
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

const FilterAge: VFC<{lead: string}> = ({lead}) => {
  const { t } = useTranslation('common');
  const options = ["0.5~2", "3~10", "11~14", "15~17"];
  const aminoTableContext = useContext(AminoTableContext);
  const foodInputValueContext = useContext(FoodInputValueContext);
  const { handleAminoInstance } = useContext(AminoCalAgeContext);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "15~17",
    onChange: (value: string) => {
      type dictionaryKey = { "0.5~2": number, "3~10": number, "11~14": number, "15~17": number }
      const key = value as keyof dictionaryKey;
      const dictionary = {
        "0.5~2": 1,
        "3~10" : 5,
        "11~14": 12,
        "15~17": 16
      }
      handleAminoInstance(dictionary[key]);
      aminoTableContext.addFood.map((_)=> {
        // ループでデリートした瞬間にindexが変わるため0を引数として渡している
        foodInputValueContext.handleDeleteAddFoodProteinVal(0);
        aminoTableContext.handleDeleteAddFood(0);
      })
    }
  })

  const group = getRootProps()


    return(
      <CommonBox lead={lead}>
        <HStack {...group} flexWrap="wrap" h="80px">
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}{t("ages")}
              </RadioCard>
            )
          })}
        </HStack>
      </CommonBox>
      );
  }
export default FilterAge
