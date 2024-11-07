import { useState, useEffect, ChangeEvent } from "react";

export default function InstallmentsScrollMenu({maxInstallments, amountToCharge} : {maxInstallments: number, amountToCharge: number}) {
    // if (maxInstallments == 1){ return <></>}
    const [chosenInstallments, setChosenInstallment] = useState<number>(1);
   
    const [monthlyChargeAmount, setMonthlyChargeAmount] = useState<number>(Math.round(amountToCharge/chosenInstallments));

    useEffect(()=>{
        setMonthlyChargeAmount(Math.round(amountToCharge/chosenInstallments))
    }, [chosenInstallments])


    return (
        <div>
            <select value={chosenInstallments} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setChosenInstallment(Number(e.target.value))}>
                {Array.from({ length: maxInstallments }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>
            {chosenInstallments != 1 && <p>Each payment is around {monthlyChargeAmount}</p>}
        </div>
    );
};