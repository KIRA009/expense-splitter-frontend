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
import {NavLink} from 'react-router-dom'

import {createUserMutation} from '../schema'
import Loader from '../components/Loader'
import {secColors, primColors} from '../colors'

const useStyles = makeStyles(theme => ({
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

const SignUp = props => {
	const classes = useStyles();
	const firstName = useRef();
	const lastName = useRef();
	const contact = useRef();
	const password = useRef();
	const [addUser, { loading: mutationLoading,  data}] = useMutation(createUserMutation);
	const [creating, setcreating] = useState(false)
	if (data)
		if (!data.createUser.ok)
			props.enqueueSnackbar('This phone number is already registered', { 
				variant: 'error',
				persist: false,
				autoHideDuration: 3000
			});
	const register = e => {
		e.preventDefault()
		addUser({ variables: {
			contact: contact.current.value,
			password: password.current.value,
			first_name: firstName.current.value,
			last_name: lastName.current.value
		}});
		setcreating(mutationLoading)
	}
	return (
	<Container component="main" maxWidth="xs">
		<CssBaseline />
		  	<div className={classes.paper}>
			  	<Avatar className={classes.avatar}> <LockOutlinedIcon/> </Avatar>
			<Typography component="h1" variant="h5"> Sign up </Typography>
			<form className={classes.form} onSubmit={register} method="POST">
		  		<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
			  			<TextField
						autoComplete="fname"
						name="firstName"
						variant="outlined"
						required
						fullWidth
						id="firstName"
						label="First Name"
						autoFocus
						inputRef={firstName}
					/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						variant="outlined"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						autoComplete="lname"
						inputRef={lastName}
					/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						variant="outlined"
						required
						fullWidth
						id="contact"
						label="Phone number"
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
			  			<NavLink to="/signin" variant="body2"> Already have an account? Sign in </NavLink>
					</Grid>
		  		</Grid>
			</form>
	  	</div>
	</Container>
  	);
}

export default SignUp;