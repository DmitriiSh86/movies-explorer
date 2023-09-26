import { useState, useCallback } from 'react';
import { regexEmail } from './regex';


export default function Validation(formValue, setFormValue) {
    
    const [formErrors, setFormErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);

    const handleChange = (evt) => {
        const input = evt.target;
        const value = input.value;
        const name = input.name;

        setFormValue({ ...formValue, [name]: value });

        if (input.name === 'email') {
            if ((regexEmail.test((value)) !== true)) {
              setFormErrors({ ...formErrors, [name]: 'Проверьте адрес почты' });
              setIsValidForm(false);
            } else {
                setFormErrors({ ...formErrors, [name]: input.validationMessage });
                setIsValidForm(input.closest('form').checkValidity());
            }
      
        } else {
            setFormErrors({ ...formErrors   , [name]: input.validationMessage });
            setIsValidForm(input.closest('form').checkValidity());
        }
        
    };

    const resetForm = useCallback(
        (newValue = {}, newErrors = {}, newIsValid = false) => {
            setFormValue(newValue);
            setFormErrors(newErrors);
            setIsValidForm(newIsValid);
        },
        [setFormValue, setFormErrors, setIsValidForm]
    );

    return { formErrors, isValidForm, handleChange, resetForm };
}