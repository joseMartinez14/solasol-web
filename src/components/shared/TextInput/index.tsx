import { Controller } from 'react-hook-form';
import { Box, TextField, Typography } from '@mui/material';
import { COLORS } from '../../../utils/Contants';

interface TextInputProps {
    control: any;
    title?: string;
    value: string;
    error?: string;
    placeholder?: string;
    styles?: any;
    isRequired: boolean;
    multiline?: boolean;
    type?: string;
    justNumber?: boolean;
    rows?: number;
}

const TextInput = (props: TextInputProps) => {
    const { control, title, value, error, isRequired, placeholder, styles, multiline, rows, justNumber, type } = props;

    return (
        <Box sx={styles}>
            <Controller
                name={value}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { onChange, value } }) => (
                    <>
                        {title && (
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{
                                    color: COLORS.black,
                                    fontSize: '18px',
                                    margin: 0,
                                    padding: 0,
                                    fontWeight: 500,
                                }}>
                                {title}
                            </Typography>
                        )}
                        <TextField
                            error={Boolean(error)}
                            multiline={multiline}
                            rows={rows}
                            helperText={error}
                            sx={{
                                width: '100%',
                                color: COLORS.secondary,
                                borderColor: COLORS.neutral400,
                            }}
                            inputProps={{
                                style: {
                                    height: '16px',
                                    backgroundColor: COLORS.neutral100,
                                },
                            }}
                            onChange={(event) => {
                                if (justNumber) {
                                    const inputValue: string = event.target.value;
                                    const newValue: string = inputValue.replace(/\D/g, '');
                                    onChange(newValue)
                                } else {
                                    onChange(event)
                                }
                            }}
                            value={value}
                            id={value}
                            placeholder={placeholder}
                            type={type}
                            variant="outlined"
                        />
                    </>
                )}
            />
        </Box>
    );
};

export default TextInput;
