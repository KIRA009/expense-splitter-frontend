import React, {
	useRef,
	useState
} from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	makeStyles,
	Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useMutation} from '@apollo/react-hooks'
import {NavLink, useHistory} from 'react-router-dom'

import {loginUserMutation} from '../schema'
import Loader from '../components/Loader'
import {primColors, secColors} from '../colors'
import {loggedInUrls} from '../urls'

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
		backgroundColor: secColors.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: primColors.main,
		color: secColors.dark,
		transition: '0.3s',
		'&:hover': {
			backgroundColor: secColors.main,
			color: primColors.light,
		}
	},
}));

const SignIn = props => {
	const classes = useStyles();
	const contact = useRef();
	const password = useRef();
	const [loginUser, { loading: mutationLoading,  data}] = useMutation(loginUserMutation);
	const [creating, setcreating] = useState(false);
	const history = useHistory();

	if (data) {
		if (!data.loginUser.loggedIn)
			props.enqueueSnackbar('Phone or password is incorrect', { 
				variant: 'error',
				persist: false,
				autoHideDuration: 3000
			});
		else {
			window.localStorage.setItem('Token', data.loginUser.token);
			history.push(loggedInUrls[0].url);
		}
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
				className={classes.submit}
				disabled={creating}
		  		> Sign In
				  {creating && <Loader style={{position: 'absolute', marginTop: 0, color: 'white'}}/> }
		  		</Button>
		  		<Grid container justify="flex-end">
					<Grid item>
						<NavLink to="/signup" variant="body2"> Don't have an account? Sign up </NavLink>
					</Grid>
		  		</Grid>
			</form>
	  	</div>
	</Container>
  	);
}

export default SignIn;