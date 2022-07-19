import { createContext, useState, FC } from "react"
import { AminoCalAgeContextT } from "types/AminoCalAge";
import AminoCalClass from "components/calculation/aminoCalClass";

export const AminoCalAgeContext = createContext<AminoCalAgeContextT>({
    aminoCalInstance: new AminoCalClass(20),
    handleAminoInstance: () => null,
});

export const AminoCalAgeContextProvider: FC<{children: JSX.Element[] | JSX.Element, optionAge: number}> = ({children, optionAge}) => {
    const defaultInstance = new AminoCalClass(optionAge);
    const [aminoCalInstance, setAminoCalInstance] = useState<AminoCalClass>(defaultInstance);

    const handleAminoInstance = (age: number) => {
        const updatedInstance = new AminoCalClass(age);
        setAminoCalInstance(updatedInstance);
    };

    return (
        <AminoCalAgeContext.Provider value={{
            aminoCalInstance,
            handleAminoInstance
        }}>
            {children}
        </AminoCalAgeContext.Provider>
    )
}