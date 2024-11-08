import { z } from 'zod';

const isValidCreditCardNumber = (number: string) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = Number(number[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export const nameSchema = z.string();

export const cardNumberSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "The card number should contain only numbers")
    .min(13, "Number is too short")
    .max(18, "Number is too long")
    .regex(/^\d+$/, "Only numbers are allowed")
    .refine((val) => isValidCreditCardNumber(val), {
        message: "Invalid credit card number",
    })
    

    

export const cvvSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "CVV should contain only digits")
    .regex(/^\d{3,4}$/, "CVV should be 3 or 4 digits long")
   


const expirationDateSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "The expiration date should contain only numbers")
    .regex(/^\d{2}\/\d{2}$/, "Expiration date must be in the format MM/YY")
    .refine((val) => {
        
    const [month, year] = val.split("/").map(Number);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;     

   
    if (month < 1 || month > 12) return false;

    if (year < currentYear) return false;

    if (year === currentYear && month < currentMonth) return false;

    return true;
}, {
    message: "Invalid expiration date",
});

export const schema = z.object({
    name: nameSchema,
    cardNumber: cardNumberSchema,
    cvv: cvvSchema,
    expiryDate: expirationDateSchema
});

export type Schema = z.infer<typeof schema>;


export const defaultValues: Schema = {
    name: "",
    cardNumber: "",
    cvv: "",
    expiryDate: 'MM/YY',
};