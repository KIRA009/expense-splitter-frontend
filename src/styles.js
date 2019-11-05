import {makeStyles} from '@material-ui/core'
import {primColors, secColors} from './colors'

export const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
        label: {
            '&[data-shrink="true"]': {
                color: `${secColors.dark}!important`
            }
        },
        '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${primColors.dark}!important`
        }
    },
}))