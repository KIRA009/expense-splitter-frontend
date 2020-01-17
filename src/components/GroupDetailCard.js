import React, {useState} from 'react';
import {Dialog, makeStyles, Chip, Avatar} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {secColors, primColors} from '../colors';
import {FriendCard} from '.';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 400,
        [theme.breakpoints.down('xs')]: {
            minWidth: 300
        }
    },
    innerCard: {
        minWidth: 300,
        [theme.breakpoints.down('xs')]: {
            minWidth: 'auto'
        }
    },
    header: {
        backgroundColor: secColors.main,
        padding: 10,
        color: '#ffffff',
        fontWeight: 800
    },
    numMembers: {
        float: 'right'
    },
    members: {
        margin: 20
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tabs: {
        color: secColors.dark,
        fontSize: 36,
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            transform: 'rotateZ(270deg)',
            color: primColors.dark
        }
    },
    addFriends: {
        backgroundColor: secColors.dark,
        color: primColors.light,
        cursor: 'pointer',
        borderRadius: '50%',
        transition: '0.3s',
        '&:hover': {
            backgroundColor: primColors.light,
            color: secColors.dark
        }
    },
    chips: {
        margin: 5
    }
}));

export const GroupDetailCard = props => {
    const {group, open, setOpen, ...others} = props;
    const [addFriendsDialog, setAddFriendsDialog] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    const classes = useStyles();
    const addMember = friend => {
        setNewMembers([...newMembers, friend]);
        others.setNotAddedMembers(prev => prev.filter(item => item.contact !== friend.contact));
    };
    const removeMember = friend => {
        setNewMembers(prev => prev.filter(item => item.contact !== friend.contact));
        others.setNotAddedMembers([...others.notAddedMembers, friend]);
    };
    if (!open) return null;
    const del = vars => {
        others.removeMembersFromGroup(vars.variables);
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <div className={classes.card}>
                <header className={classes.header}>
                    {group.groupName}
                    <span className={classes.numMembers}>Members: {group.groupMember.length + 1}</span>
                </header>
                <section className={classes.members}>
                    <div className={classes.heading}>
                        <p>Admin</p>
                        {group.admin && (
                            <AddCircleIcon
                                className={classes.tabs}
                                type="submit"
                                onClick={() => setAddFriendsDialog(true)}
                                variant="contained"
                            />
                        )}
                    </div>
                    <FriendCard name={group.groupAdmin.firstName} contact={group.groupAdmin.contact} />
                    <p>Members</p>
                    {group.groupMember.map((item, index) => (
                        <FriendCard
                            name={item.firstName}
                            contact={item.contact}
                            actions={group.admin ? ['delete'] : null}
                            delete={del}
                            key={index}
                        />
                    ))}
                </section>
            </div>
            {group.admin && (
                <Dialog open={addFriendsDialog} onClose={() => setAddFriendsDialog(false)}>
                    <div className={classes.innerCard}>
                        <header className={classes.header}>
                            Add friends
                            <DoneIcon
                                className={`${classes.numMembers} ${classes.addFriends}`}
                                onClick={() => {
                                    others.addMembersToGroup(newMembers);
                                    setAddFriendsDialog(false);
                                    setNewMembers([]);
                                }}
                            />
                        </header>
                        <div className={classes.members}>
                            {others.notAddedMembers.map((friend, index) => (
                                <Chip
                                    key={index}
                                    onClick={() => addMember(friend)}
                                    avatar={<Avatar>{friend.firstName[0]}</Avatar>}
                                    label={friend.firstName}
                                    className={classes.chips}
                                />
                            ))}
                        </div>
                        <hr width="50%" />
                        <div className={classes.members}>
                            {newMembers.map((friend, index) => (
                                <Chip
                                    key={index}
                                    avatar={<Avatar>{friend.firstName[0]}</Avatar>}
                                    onDelete={() => removeMember(friend)}
                                    label={friend.firstName}
                                    className={classes.chips}
                                />
                            ))}
                        </div>
                    </div>
                </Dialog>
            )}
        </Dialog>
    );
};
