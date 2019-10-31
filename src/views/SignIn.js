import React, {
	useRef,
	useState
} from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	makeStyles,
	Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useMutation} from '@apollo/react-hooks'
import { withSnackbar } from 'notistack';

import {loginUserMutation} from '../schema'
import Loader from '../components/Loader'

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
		backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = props => {
	const classes = useStyles();
	const contact = useRef();
	const password = useRef();
	const [loginUser, { loading: mutationLoading,  data}] = useMutation(loginUserMutation);
	const [creating, setcreating] = useState(false);
	if (data) {
		if (!data.loginUser.loggedIn)
			props.enqueueSnackbar('Phone or password is incorrect', { 
				variant: 'error',
				persist: false,
				autoHideDuration: 3000
			});
		else
			window.localStorage.setItem('Token', data.loginUser.token)
	}
	const login = e => {
		e.preventDefault()
		loginUser({ variables: {
			contact: contact.current.value,
			password: password.current.value,
		}});
		setcreating(mutationLoading)
	}
	return (
	<Container component="main" maxWidth="xs">
		<CssBaseline />
		  	<div className={classes.paper}>
			  	<Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
			<Typography component="h1" variant="h5"> Sign in </Typography>
			<form className={classes.form} onSubmit={login} method="POST">
		  		<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
						variant="outlined"
						required
						fullWidth
						label="Phone number"
						id="contact"
						name="contact"
						autoComplete="phone"
						inputRef={contact}
					/>
					</Grid>
					<Grid item xs={12}>
			  			<TextField
						variant="outlined"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						inputRef={password}
					/>
					</Grid>
		  		</Grid>
		  		<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				disabled={creating}
		  		> Sign Up
				  {creating && <Loader style={{position: 'absolute', marginTop: 0, color: 'white'}}/> }
		  		</Button>
		  		<Grid container justify="flex-end">
					<Grid item>
			  			<Link href="/signup" variant="body2"> Don't have an account? Sign up </Link>
					</Grid>
		  		</Grid>
			</form>
	  	</div>
	</Container>
  	);
}

export default withSnackbar(SignIn);