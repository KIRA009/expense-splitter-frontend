import React, {useRef, useState} from 'react';
import {Dialog, makeStyles, Chip, Avatar, TextField, Button} from '@material-ui/core';

import {primColors, secColors} from '../colors';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 400,
        [theme.breakpoints.down('xs')]: {
            minWidth: 300
        },
        padding: 20
    },
    chips: {
        margin: 5
    },
    members: {
        margin: 20
    },
    createGroup: {
        backgroundColor: secColors.dark,
        color: primColors.light,
        transition: '0.3s',
        '&:hover': {
            backgroundColor: primColors.light,
            color: secColors.dark
        }
    }
}));

export const NewGroupCard = props => {
    const {open, setOpen, friends, createNewGroup} = props;
    const classes = useStyles();
    const group_name = useRef(null);
    const [members, setMembers] = useState([]);
    const [userFriends, setUserFriends] = useState(null);
    const addMember = friend => {
        setMembers([...members, friend]);
        setUserFriends(userFriends.filter(item => item.friend.contact !== friend.friend.contact));
    };
    const removeMember = friend => {
        setMembers(members.filter(item => item.friend.contact !== friend.friend.contact));
        setUserFriends([...userFriends, friend]);
    };
    const createGroup = () => {
        if (group_name.current.value === '') {
            props.enqueueSnackbar('Group name cannot be empty', {
                variant: 'error',
                persist: false,
                autoHideDuration: 3000
            });
            return;
        }
        if (members.length === 0) {
            props.enqueueSnackbar('Group should have atleast one member other than the admin', {
                variant: 'error',
                persist: false,
                autoHideDuration: 3000
            });
            return;
        }
        createNewGroup(
            members.map(member => member.friend.contact),
            group_name.current.value
        );
        setOpen(false);
    };
    if (!open) return null;
    if (userFriends === null) {
        setUserFriends(friends.data.user.user);
        return null;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <div className={classes.card}>
                <TextField required label="Group Name" defaultValue="" inputRef={group_name} />
            </div>
            <div className={classes.members}>
                <p>Members:</p>
                {members.length === 0 && `No members added`}
                {members.map((friend, index) => (
                    <Chip
                        key={index}
                        avatar={<Avatar>{friend.friend.firstName[0]}</Avatar>}
                        onDelete={() => removeMember(friend)}
                        label={friend.friend.firstName}
                        className={classes.chips}
                    />
                ))}
            </div>
            <hr width="50%" />
            <div className={classes.members}>
                {userFriends.map((friend, index) => (
                    <Chip
                        key={index}
                        onClick={() => addMember(friend)}
                        avatar={<Avatar>{friend.friend.firstName[0]}</Avatar>}
                        label={friend.friend.firstName}
                        className={classes.chips}
                    />
                ))}
            </div>
            <Button onClick={createGroup} className={classes.createGroup}>
                Create
            </Button>
        </Dialog>
    );
};
