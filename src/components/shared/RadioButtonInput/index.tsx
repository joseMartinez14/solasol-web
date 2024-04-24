import { Controller } from 'react-hook-form';
import { RadioGroup, FormLabel, Box, FormHelperText } from '@mui/material';
import { Data, Props } from './types';
import { COLORS } from '../../../utils/Contants';
import RadioButtonRow from './RadioButtonRow';

const RadioButtonInput = (props: Props) => {
  const { control, title, formValue, error, isRequired = false, data } = props;
  return (
    <Controller
      name={formValue}
      control={control}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value } }) => (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            textAlign: 'left',
          }}>
          {title && (
            <FormLabel
              id="radio-button-input"
              sx={{
                color: COLORS.secondary,
                fontSize: '18px',
                fontWeight: '500',
                textAlign: 'left',
              }}>
              {title}
            </FormLabel>
          )}
          <RadioGroup
            sx={{
              pl: '10px',
              mt: 2,
              gap: '7px',
            }}
            onChange={onChange}
            value={value}
            aria-labelledby="radio-button-input"
            name="radio-button-input">
            {data?.map((item: Data, index: number) => (
              <RadioButtonRow
                key={index}
                description={item.description}
                detail={item.details}
                value={item.value}
                selectedValue={value}
              />
            ))}
          </RadioGroup>
          <FormHelperText
            sx={{
              color: COLORS.error,
            }}>
            {error}
          </FormHelperText>
        </Box>
      )}></Controller>
  );
};

export default RadioButtonInput;
