'use client';
import {useForm} from 'react-hook-form';
import { useState } from 'react';
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
import DatePicker from '@mui/x-date-pickers/DatePicker';
import Tooltip from '@mui/material/Tooltip';
import styles from './paymentForm.module.css';


export default function formProvider() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<Schema>({
        mode: 'all',
        resolver: zodResolver(schema),
    });

    const [expiryDate, setExpiryDate] = useState<Date | null>(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);


    async function onSubmit(data: any) {
        console.log('Sending data...');
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        console.log(data);
    }
        
    return (
        <Box
        component="form"
        className={styles.formContainer}
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        >
        <TextField
        {...register("name")}
        variant="outlined"
        label= 'Name' 
        className={styles.textField}
        error={!!errors.name}  
        helperText={errors.name?.message}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <AccountCircleIcon /> 
                </InputAdornment>)}}  
         />

        <TextField 
        {...register('cardNumber')}
        variant="outlined"
        label= 'cardNumber' 
        className={styles.textField}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
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
        variant="outlined"
        label= 'CVV'
        className={styles.textField}
        error={!!errors.cvv}  
        helperText={errors.cvv?.message}
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
        variant="outlined"
        label= 'expiryDate'
        className={styles.textField} 
        error={!!errors.expiryDate}  
        helperText={errors.expiryDate?.message}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start" style={{ pointerEvents: "none" }}>
                    <DateRangeIcon /> 
                </InputAdornment>
            ),
        }}
        />
        <Tooltip
            title={
            <DatePicker
                value={expiryDate}
                onChange={(newValue) => {
                    setExpiryDate(newValue);
                    setOpenDatePicker(false);
                }}
                open={openDatePicker}
                onOpen={() => setOpenDatePicker(true)}
                onClose={() => setOpenDatePicker(false)}
                renderInput={(params) => <TextField {...params} />}
            />
            }
            open={openDatePicker}
            onMouseEnter={() => setOpenDatePicker(true)}
            onMouseLeave={() => setOpenDatePicker(false)}
            placement="top"
        >
            
        </Tooltip>
        <LoadingButton
          size="small"
          type='submit'
          endIcon={<SendIcon />}
          loading={isSubmitting}
          loadingPosition="end"
          variant="contained"
          className={styles.submitButton}
        >
          Send
        </LoadingButton>
        </Box>
        
    )
}