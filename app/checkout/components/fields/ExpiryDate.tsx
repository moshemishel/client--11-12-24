import { forwardRef } from 'react';
import { useState } from 'react';
import styles  from '../paymentForm.module.css';
import TextField  from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {ExpiryDateFieldProps } from '@/types/form/formSchema';


  
  const ExpiryDateField = forwardRef<HTMLInputElement, ExpiryDateFieldProps>(({
    register, 
    errors, 
    handleKeyDown, 
    setCurrentField, 
    setError, 
    clearErrors, 
    setValue
  }, ref) => {
    
    const [date, setDate] = useState('');
  
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { inputType, data: inputKey } = e.nativeEvent as InputEvent;
  
      setDate((prev: string) => {
        let newDate = prev;
  
      
        if (inputType.startsWith("deleteContent")) {
          newDate = prev.length === 3 ? prev.slice(0, -2) : prev.slice(0, -1);
        } 
       
        else if (prev.length === 5) {
          setError('expiryDate', { type: 'manual', message: 'Format MM/YY only' });
          setTimeout(() => clearErrors('expiryDate'), 2000);
          return prev;
        } 
    
        else if (/^[0-9]$/.test(inputKey || '')) {
          newDate = prev.length === 1 ? prev + inputKey + '/' : prev + inputKey;
        } else {
          setError('expiryDate', { type: 'manual', message: 'Digits only' });
          setTimeout(() => clearErrors('expiryDate'), 2000);
          return prev;
        }
  
        setValue('expiryDate', newDate);
        return newDate;
      });
    }
  
    return (
      <TextField
        {...register('expiryDate')}
        inputRef={ref}
        variant="outlined"
        name="expiryDate"
        label="Expiry Date"
        className={styles.textField}
        placeholder="MM/YY"
        onChange={handleDateChange}
        value={date}
        error={!!errors.expiryDate}
        helperText={errors.expiryDate?.message}
        onFocus={() => setCurrentField('expiryDate')}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <DateRangeIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  });
  
  export default ExpiryDateField;