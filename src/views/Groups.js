import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {makeStyles, Typography, Grid, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {GroupCard, Loader, GroupDetailCard, NewGroupCard} from '../components';
import {
    getGroupsQuery,
    addMembersMutation,
    removeMembersMutation,
    getFriendsQuery,
    createGroupMutation
} from '../schema';
import {secColors, primColors} from '../colors';

const useStyles = makeStyles(theme => ({
    emptyList: {
        textAlign: 'center'
    },
    section: {
        margin: 10
    },
    addGroupBtn: {
        position: 'fixed',
        bottom: 40,
        right: 40,
        [theme.breakpoints.down('sm')]: {
            bottom: 20,
            right: 20
        },
        backgroundColor: secColors.dark,
        color: primColors.light,
        '&:hover': {
            backgroundColor: primColors.light,
            color: secColors.dark
        }
    }
}));

export const Groups = props => {
    const [openGroupDetailCard, setOpenGroupDetailCard] = useState(false);
    const [openNewGroupCard, setOpenNewGroupCard] = useState(false);
    const [group, setGroup] = useState(null);
    const [notAddedMembers, setNotAddedMembers] = useState([]);
    const groups = useQuery(getGroupsQuery);
    const addMembers = useMutation(addMembersMutation, {
        refetchQueries: [
            {
                query: getGroupsQuery
            }
        ]
    });
    const removeMembers = useMutation(removeMembersMutation, {
        refetchQueries: [
            {
                query: getGroupsQuery
            }
        ]
    });
    const createGroup = useMutation(createGroupMutation, {
        refetchQueries: [
            {
                query: getGroupsQuery
            }
        ]
    });
    const friends = useQuery(getFriendsQuery);
    if (addMembers[1].called && !addMembers[1].loading) {
        setGroup(() => ({...addMembers[1].data.addMembers.group, admin: true}));
        addMembers[1].loading = true;
    }
    if (removeMembers[1].called && !removeMembers[1].loading) {
        setGroup(() => ({...removeMembers[1].data.removeMembers.group, admin: true}));
        removeMembers[1].loading = true;
    }
    const addMembersToGroup = members => {
        if (members.length === 0) return;
        addMembers[0]({
            variables: {
                contacts: members.map(member => member.contact),
                group_name: group.groupName
            }
        });
        setNotAddedMembers(prev => prev.filter(friend => !members.some(member => member.contact === friend.contact)));
    };
    const removeMembersFromGroup = member => {
        if (group.groupMember.length === 1) {
            props.enqueueSnackbar("You can't have a group without any members", {
                variant: 'error',
                persist: false,
                autoHideDuration: 3000
            });
            return;
        }
        removeMembers[0]({
            variables: {
                contacts: [member.contact],
                group_name: group.groupName
            }
        });
        setNotAddedMembers(prev => [...prev, member]);
    };
    const createNewGroup = (contacts, group_name) => {
        createGroup[0]({
            variables: {
                contacts,
                group_name
            }
        });
    };
    if (createGroup[1].called && !createGroup[1].loading) {
        if (!createGroup[1].data.createGroup.ok) {
            props.enqueueSnackbar(createGroup[1].data.createGroup.message, {
                variant: 'error',
                persist: false,
                autoHideDuration: 3000
            });
        }
        createGroup[1].loading = true;
    }
    const classes = useStyles();
    return (
        <div>
            <section className={classes.section}>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                    Groups
                </Typography>
                {groups.loading || groups.data.user === null ? (
                    <Loader />
                ) : groups.data.user.groupAdmin.length + groups.data.user.groupMember.length === 0 ? (
                    <p className={classes.emptyList}>You are not involved in any groups</p>
                ) : (
                    <Grid container spacing={2}>
                        {groups.data.user.groupAdmin.map((item, index) => (
                            <GroupCard
                                key={index}
                                group={item}
                                admin
                                setGroup={setGroup}
                                setOpen={setOpenGroupDetailCard}
                                setNotAddedMembers={setNotAddedMembers}
                            />
                        ))}
                        {groups.data.user.groupMember.map((item, index) => (
                            <GroupCard key={index} group={item} setGroup={setGroup} setOpen={setOpenGroupDetailCard} />
                        ))}
                    </Grid>
                )}
            </section>
            <GroupDetailCard
                group={group}
                open={openGroupDetailCard}
                setOpen={setOpenGroupDetailCard}
                notAddedMembers={notAddedMembers}
                setNotAddedMembers={setNotAddedMembers}
                addMembersToGroup={addMembersToGroup}
                removeMembersFromGroup={removeMembersFromGroup}
            />
            <NewGroupCard
                open={openNewGroupCard}
                setOpen={setOpenNewGroupCard}
                friends={friends}
                enqueueSnackbar={props.enqueueSnackbar}
                createNewGroup={createNewGroup}
            />
            <Fab aria-label="add" className={classes.addGroupBtn} onClick={() => setOpenNewGroupCard(prev => !prev)}>
                <AddIcon />
            </Fab>
        </div>
    );
};
