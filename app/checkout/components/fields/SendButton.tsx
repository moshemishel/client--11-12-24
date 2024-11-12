import { forwardRef } from 'react';
import styles from '../paymentForm.module.css';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import {SendButtonFieldProps} from '@/types/form/formSchema'

const SendButtonField = forwardRef<HTMLInputElement, SendButtonFieldProps>(({ isSubmitting }, ref) => {
  return (
    <LoadingButton
      size="small"
      type="submit"
      endIcon={<SendIcon />}
      loading={isSubmitting}  
      loadingPosition="end"
      variant="contained"
      className={styles.submitButton}
    >
      Pay
    </LoadingButton>
  );
});

export default SendButtonField;