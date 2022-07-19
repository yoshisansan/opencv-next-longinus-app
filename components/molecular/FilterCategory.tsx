import { VFC } from 'react'
import { Box, useRadio, useRadioGroup, HStack, RadioProps } from '@chakra-ui/react'
import CommonBox from 'components/atom/CommonBox'
import { HandleCategoryFilterT } from 'types/TableComponentType'
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

const FilterCategory: VFC<{lead: string, handleCategoryFilter: HandleCategoryFilterT }> = ({lead, handleCategoryFilter}) => {
  const options = ["All", "🥩", "🌊🐟", "🥬", "🧀🥛🥚", "🧂"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "All",
    onChange: (value: string) => {
      type dictionaryKey = { All: string, "\uD83E\uDD69": string, "\uD83C\uDF0A\uD83D\uDC1F": string, "\uD83E\uDD6C": string}
      const key = value as keyof dictionaryKey;
      const dictionary = {
        "All": "all",
        "🥩" : "meat",
        "🌊🐟": "fish",
        "🥬": "vegetable",
        "🧀🥛🥚": "daily",
        "🧂": "seasoning"
      }
      handleCategoryFilter(dictionary[key])
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
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </CommonBox>
      );
  }
export default FilterCategory