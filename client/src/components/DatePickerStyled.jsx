import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const StyledStaticDatePicker = styled(DatePicker)({
    '.MuiPickersToolbar-root': {
      color: '#1565c0',
      borderRadius: '2px',
      borderWidth: '1px',
      borderColor: '#2196f3',
      border: '1px solid',
      backgroundColor: '#90caf9',
    }
  })

export default function DatePickerStyled() {
  return (
    <StyledStaticDatePicker/>
  )
}
