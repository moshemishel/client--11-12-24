import { forwardRef } from 'react';
import styles from '../paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import { CommonFieldProps as  CvvFieldProps } from '@/types/form/formSchema';


const CvvField = forwardRef<HTMLInputElement, CvvFieldProps>(
  ({ register, errors, handleKeyDown, setCurrentField }, ref) => {
    return (
      <TextField
        {...register('cvv')}
        inputRef={ref} 
        variant="outlined"
        name="cvv"
        label="CVV"
        className={styles.textField}
        error={!!errors.cvv}
        helperText={errors.cvv?.message}
        onFocus={() => setCurrentField('cvv')}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default CvvField;