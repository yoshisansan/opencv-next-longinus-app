import { createContext, useState, FC } from "react"
// import AddedFoodComponent from 'components/organism/AddedFoodComponent'
import { AminoTableContextT, ProteinValT } from "types/TableComponentType";
import { SourceTableDataT } from 'types/SourceTableData';
import { AminoRatioT } from "types/ItemNoTypes";
import { AminoScoreCompositionT } from "types/AminoScoringPatternType";

export const AminoTableContext = createContext<AminoTableContextT>({
    limitingAminoAcids: [],
    afterAddedFoodLimitingAminoAcids: [],
    baseFoodFactors: [],
    addFood: [],
    handleAddFood: () => 0,
    handleLimitingAminoAcids: () => null,
    handleDeleteAddFood: () => null,
});

export const AminoTableContextProvider: FC<{children: (false | JSX.Element[] | JSX.Element)[] | JSX.Element, limitingAminoAcids: AminoRatioT[], baseFoodFactors: AminoRatioT[], proteinPerAminoScore: number}> = ({children, limitingAminoAcids, baseFoodFactors, proteinPerAminoScore}) => {
    const [addFood, setAddFood] = useState<SourceTableDataT[]>([])
    const [afterAddedFoodLimitingAminoAcids, setAfterAddedFoodLimitingAminoAcids] = useState<AminoRatioT[]>(limitingAminoAcids)

    const handleAddFood = (oneFoodData: SourceTableDataT) => {
        setAddFood((props) => ([...props, oneFoodData]))
    }

    const handleDeleteAddFood = (index: number) => {
        setAddFood((props) => ([...props.slice(0,index), ...props.slice(index + 1, props.length)]))
    }

    const handleLimitingAminoAcids = (averageAminoRatios: AminoScoreCompositionT) => {
        const [[firstAminoKey, firstAminoVal], [secondAminoKey, secondAminoVal]] = Object.entries(averageAminoRatios).sort(([,aVal],[,bVal]) => aVal > bVal ? 1 : -1).slice(0,2);

        // 同じ内容の場合はState更新しない処理
        const oldObj = Object.assign({}, ...afterAddedFoodLimitingAminoAcids);
        const oldJSON = JSON.stringify(oldObj);
        const newJSON = JSON.stringify({
            [firstAminoKey] : firstAminoVal,
            [secondAminoKey] : secondAminoVal
        });
        if(oldJSON === newJSON) return


        setAfterAddedFoodLimitingAminoAcids([
                { [firstAminoKey] : firstAminoVal},
                { [secondAminoKey] : secondAminoVal }
            ]);
    }

    return (
        <AminoTableContext.Provider value={{
            limitingAminoAcids,
            afterAddedFoodLimitingAminoAcids,
            baseFoodFactors,
            addFood: addFood,
            handleAddFood,
            handleLimitingAminoAcids,
            handleDeleteAddFood
        }}>
            {children}
        </AminoTableContext.Provider>
    )
}