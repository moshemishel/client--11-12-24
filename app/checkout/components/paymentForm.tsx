'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import {Schema, schema} from '@/types/form/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitControl} from '@/types/form/formSchema';
import ExpiryDateField from './fields/ExpiryDate';
import NameField from './fields/Name';
import CardNumberField from './fields/CardNumber';
import SendButtonField from './fields/SendButton';
import CvvField from './fields/CVV';
import styles from './paymentForm.module.css';



export default function paymentForm({submitControl}: SubmitControl) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
 
    const { saleAmount, storeName, currency, token } = Object.fromEntries(searchParams);


    const {register, handleSubmit, setError, clearErrors, setValue, formState: {errors, isSubmitting}} = useForm<Schema>({
        mode: 'all',
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: Schema) {
        console.log('Sending data...');
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        console.log(data);
        submitControl({approvalNumber: 123456789})
    };
   
    
    const refs: { [key: string]: React.RefObject<HTMLElement> }={
        name:useRef<HTMLInputElement>(null),
        cardNumber:useRef<HTMLInputElement>(null),
        cvv:useRef<HTMLInputElement>(null),
        expiryDate:useRef<HTMLInputElement>(null),
    };

    const [currentField, setCurrentField] = useState('name');

    useEffect(() => {
        refs[currentField]?.current?.focus();
    }, [currentField]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === 'Enter') {
            e.preventDefault();
            const fieldOrder = ['name', 'cardNumber', 'cvv', 'expiryDate'];
            const currentIndex = fieldOrder.indexOf(currentField);
            const nextField = fieldOrder[currentIndex + 1] || "submit";

            if (nextField === 'submit') {
                handleSubmit(onSubmit)();
            } else {
                setCurrentField(nextField);
            }
        }
    };
 
        
    return (
    <Box
        component="form"
        className={styles.formContainer}
        sx={{display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-start',
            width: { xs: '100%', sm: '80%', md: '60%' },
            '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className={styles.amountContainer}>
            <span className={styles.amountLabel}>Amount to Pay: </span>
            <span className={styles.amountValue}>{`${currency} ${saleAmount}`}</span>
        </div>
        

        <NameField
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}  
            setCurrentField={setCurrentField}      
        />

        <CardNumberField
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}  
            setCurrentField={setCurrentField}  
        />

        <CvvField 
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}  
            setCurrentField={setCurrentField}  
        />

        <ExpiryDateField 
            register={register} 
            errors={errors}
            handleKeyDown={handleKeyDown}
            setCurrentField={setCurrentField}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
        />

        <SendButtonField isSubmitting={isSubmitting}/>
    </Box>
        
    )
};
