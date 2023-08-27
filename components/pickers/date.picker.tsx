import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    forwardRef,
    Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

interface DatePickerCompProps {
    fieldName: string;
    register: Function;
    control: any;
    label: string;
    error?: string;
}

const CustomDatePicker = forwardRef(({ value, onClick, ...rest }, ref) => {
    const { fieldName, register, label, error } = rest;

    return (
        <FormControl
            id={fieldName}
            isInvalid={!!error}
            onClick={onClick}
            ref={ref}
        >
            <FormLabel>{label}</FormLabel>
            <Input value={value} {...register(fieldName)} autoComplete="off" />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
});
export default function DatePickerComp({
    fieldName,
    register,
    label,
    error,
    control,
}: DatePickerCompProps) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
                <DatePicker
                    selected={field.value}
                    onChange={(date: Date) => {
                        field.onChange(date);
                    }}
                    minDate={new Date()}
                    //date after 1 month
                    maxDate={
                        new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                    customInput={
                        <CustomDatePicker
                            fieldName={fieldName}
                            register={register}
                            label={label}
                            error={error}
                        />
                    }
                />
            )}
        />
    );
}
