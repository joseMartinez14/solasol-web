import { Typography, FormControlLabel, Radio, Box } from '@mui/material';
import { COLORS } from '../../../../utils/Contants';
import { Props } from './types';

const RadioButtonRow = (props: Props) => {
  const { description, detail, value, selectedValue } = props;
  const is_selected = value.toString() === selectedValue;

  return (
    <Box
      sx={{
        backgroundColor: is_selected ? COLORS.primary100 : '',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: '5px 11px',
      }}>
      <FormControlLabel
        sx={{
          flexGrow: 1,
          margin: 0,
          color: COLORS.neutral500,
        }}
        value={value}
        control={
          <Radio
            sx={{
              padding: 0,
              mr: 1,
              color: COLORS.neutral600,
              '&.Mui-checked': {
                color: COLORS.primary,
              },
            }}
          />
        }
        label={description}
      />
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          color: COLORS.secondary,
          fontSize: '16px',
          fontWeight: '700',
          m: 0,
          p: 0,
          pt: '5px',
        }}>
        {detail}
      </Typography>
    </Box>
  );
};

export default RadioButtonRow;
