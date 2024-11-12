import { forwardRef } from 'react';
import styles from '../paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { CommonFieldProps as  CardNumberFieldProps } from '@/types/form/formSchema';



const CardNumberField = forwardRef<HTMLInputElement, CardNumberFieldProps>(
  ({ register, errors, handleKeyDown, setCurrentField }, ref) => {
    return (
      <TextField
        {...register('cardNumber')}
        inputRef={ref} 
        variant="outlined"
        name="cardNumber"
        label="Card Number"
        className={styles.textField}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
        onFocus={() => setCurrentField('cardNumber')}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
              <CreditCardIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default CardNumberField;