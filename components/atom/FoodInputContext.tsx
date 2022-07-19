import { createContext, useState, useContext, VFC} from "react"
import { FoodInputValueContextT, FoodInputStateT, FoodProteinStateT } from "types/TableComponentType"
import AminoCalClass from "components/calculation/aminoCalClass";
import { AminoCalAgeContext } from "./AminoCalAgeContext";

export const FoodInputValueContext = createContext<FoodInputValueContextT>({
    baseFoodInputValue: 100,
    addFoodInputValue: { addFood1: 100 },
    baseFoodProteinVal: 0,
    addFoodProteinVal: {},
    handleBaseFoodValue: () => null,
    handleAddFoodValue: () => null,
    handleBaseFoodProteinVal: () => null,
    handleAddFoodProteinVal: () => null,
    handleDeleteAddFoodProteinVal: () => null,
});

export const FoodInputValueContextProvider: VFC<{children: JSX.Element[] | JSX.Element}> = ({children}) => {
    // useContextの変数をuseStateで状態管理
    const [foodInputValue, setFoodInputValue] = useState<FoodInputStateT>({
        baseFoodInputValue: 100,
        addFoodInputValue: { addFood1: 100 },
    });
    const [proteinVal, setProteinVal] = useState<FoodProteinStateT>({
        baseFoodProteinVal: 0,
        addFoodProteinVal: {}
    });

    const { aminoCalInstance } = useContext(AminoCalAgeContext);

    const handleBaseFoodProteinVal = (protein: number) => (
        setProteinVal((props) => ({
            ...props,
            baseFoodProteinVal: protein
        }))
    )
    const handleAddFoodProteinVal = (protein: number, keyName: string) => {
        setProteinVal((props) => ({
            ...props,
            addFoodProteinVal: Object.assign(props.addFoodProteinVal, { [keyName]: protein })
        }))
    }

    const handleDeleteAddFoodProteinVal = (index: number) => {
        const copyObj = proteinVal.addFoodProteinVal
        delete copyObj[`addFood${index + 1}`]
        setProteinVal((props) => ({
            ...props,
            addFoodProteinVal: copyObj
        }))
        // console.log(copyObj);
    }

    const handleBaseFoodValue = (value: number, oneFoodProtein: number) => {
        const inputValue = value === null || value === undefined || isNaN(value) ? 0 : value;
        const protein = aminoCalInstance.proteinCal(oneFoodProtein, inputValue);
        // console.log(inputValue, protein);

        setFoodInputValue((props) => ({
            ...props,
            baseFoodInputValue: inputValue
        }));
        setProteinVal((props) => ({
            ...props,
            baseFoodProteinVal: protein
        }));
    }

    const handleAddFoodValue = (value: number, oneFoodProtein: number, foodElement: string) => {
        const indexOfNewProperty = Object.keys(foodInputValue.addFoodInputValue).findIndex(oneAddFoodKey => oneAddFoodKey === foodElement);
        const addFoodVal = indexOfNewProperty === -1 ? 100 : value;
        type AddFoodInputValueT = {[key: string]: number}
        const updateAddFoodObject = (addFoodInputValue: AddFoodInputValueT, foodElement: string, addFoodVal: number) => {
            const newObj = Object.assign({}, addFoodInputValue);
            newObj[foodElement] = addFoodVal;

            return newObj;
        };
        const protein = aminoCalInstance.proteinCal(oneFoodProtein, addFoodVal);
        setProteinVal((props) => ({
            ...props,
            addFoodProteinVal: { ...props.addFoodProteinVal, [foodElement]: protein }
        }))
        setFoodInputValue((props) => ({
            ...props,
            addFoodInputValue: updateAddFoodObject(props.addFoodInputValue, foodElement, addFoodVal)
        }));
    }

    return (
        <FoodInputValueContext.Provider value={{
            baseFoodInputValue: foodInputValue.baseFoodInputValue,
            addFoodInputValue: foodInputValue.addFoodInputValue,
            baseFoodProteinVal: proteinVal.baseFoodProteinVal,
            addFoodProteinVal: proteinVal.addFoodProteinVal,
            handleBaseFoodValue,
            handleAddFoodValue,
            handleBaseFoodProteinVal,
            handleAddFoodProteinVal,
            handleDeleteAddFoodProteinVal
        }}>{children}</FoodInputValueContext.Provider>
    )
}