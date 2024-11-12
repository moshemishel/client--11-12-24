'use client';
import {useForm} from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import {Schema, schema} from '@/types/form/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import CreditCardIcon from '@mui/icons-material/CreditCard'; 
import LockIcon from '@mui/icons-material/Lock'; 
import DateRangeIcon from '@mui/icons-material/DateRange';
import Tooltip from '@mui/material/Tooltip';
import styles from './paymentForm.module.css';


export default function paymentForm({submitControl}) {
    const {register, handleSubmit, setError, clearErrors, setValue, formState: {errors, isSubmitting}} = useForm<Schema>({
        mode: 'all',
        resolver: zodResolver(schema),
    });

    const [date, setDate] = useState('');

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


    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>){
        const { inputType , data: inputKey }= e.nativeEvent as InputEvent;
      
        setDate((prev: string)=>{
            let newDate = prev;
            if (inputType.startsWith("deleteContent")) {
                newDate =  prev.length == 3 ?  prev.slice(0, -2) :  prev.slice(0,-1);
            } else if (prev.length === 5){
                setError('expiryDate', {type: 'manual',message: 'Format MM/YY only'});
                  setTimeout(() => clearErrors('expiryDate'), 2000);
                    return prev
            }else if (/^[0-9]$/.test(inputKey||'')) {
                newDate =  prev.length == 1 ? prev + inputKey + '/' : prev + inputKey
            } else {
              setError('expiryDate', {type: 'manual', message: 'Digits only'});
              setTimeout(() => clearErrors('expiryDate'), 2000);
                return prev
            }

            setValue('expiryDate', newDate);

            return newDate;

        });  
    }


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
 


    async function onSubmit(data: Schema) {
        console.log('Sending data...');
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        console.log(data);
        submitControl({approvalNumber: 123456789})
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

        <Tooltip title= "Name as it appears on the CreditCard" placement='bottom-start' arrow enterDelay={500}>
        <span>
        <TextField
        {...register("name")}
        inputRef={refs.name}
        variant="outlined"
        name='name'
        label= 'Name' 
        className={styles.textField}
        error={!!errors.name}  
        helperText={errors.name?.message}
        onFocus={() => setCurrentField('name')}
        onKeyDown={handleKeyDown}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <AccountCircleIcon /> 
                </InputAdornment>)}}  
         />
        </span>
         </Tooltip>
        <TextField 
        {...register('cardNumber')}
        inputRef={refs.cardNumber}
        variant="outlined"
        name='cardNumber'
        label= 'cardNumber' 
        className={styles.textField}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
        onFocus={()=>setCurrentField('cardNumber')}
        onKeyDown={handleKeyDown}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <CreditCardIcon />
                </InputAdornment>
            ),
        }}  
        />

        <TextField 
        {...register('cvv')}
        inputRef={refs.cvv}
        variant="outlined"
        name='cvv'
        label= 'CVV'
        className={styles.textField}
        error={!!errors.cvv}  
        helperText={errors.cvv?.message}
        onFocus={()=>setCurrentField('cvv')}
        onKeyDown={handleKeyDown}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <LockIcon /> 
                </InputAdornment>
            ),
        }}
        />
        <TextField 
        {...register('expiryDate')}
        inputRef={refs.expiryDate}
        variant="outlined"
        name='expiryDate'
        label= 'expiryDate'
        className={styles.textField} 
        placeholder='MM/YY'
        onChange={handleDateChange}
        value={date}
        error={!!errors.expiryDate}  
        helperText={errors.expiryDate?.message}
        onFocus={()=>setCurrentField('expiryDate')}
        onKeyDown={handleKeyDown}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <DateRangeIcon /> 
                </InputAdornment>
            ),
        }}
        />
  
        <LoadingButton
          size="small"
          type='submit'
          endIcon={<SendIcon />}
          loading={isSubmitting}
          loadingPosition="end"
          variant="contained"
          className={styles.submitButton}
        >
          Pay
        </LoadingButton>
        </Box>
        
    )
};
