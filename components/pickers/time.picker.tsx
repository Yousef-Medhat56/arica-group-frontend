import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    forwardRef,
    Input,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { setMinutes, setHours, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

interface TimePickerCompProps {
    fieldName: string;
    register: Function;
    control: any;
    label: string;
    error?: string;
}

const CustomTimePicker = forwardRef(({ value, onClick, ...rest }, ref) => {
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
export default function TimePickerComp({
    fieldName,
    register,
    control,
    label,
    error,
}: TimePickerCompProps) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
                <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                        field.onChange(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    includeTimes={[
                        setHours(setMinutes(new Date(), 0), 7),
                        setHours(setMinutes(new Date(), 0), 8),
                        setHours(setMinutes(new Date(), 0), 9),
                        setHours(setMinutes(new Date(), 0), 10),
                        setHours(setMinutes(new Date(), 0), 11),
                        setHours(setMinutes(new Date(), 0), 12),
                        setHours(setMinutes(new Date(), 0), 13),
                        setHours(setMinutes(new Date(), 0), 14),
                        setHours(setMinutes(new Date(), 0), 15),
                        setHours(setMinutes(new Date(), 0), 16),
                        setHours(setMinutes(new Date(), 0), 17),
                    ]}
                    customInput={
                        <CustomTimePicker
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
