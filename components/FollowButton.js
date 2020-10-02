import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';

function Followbutton({post}) {
    const dispatch = useDispatch();
    const {me, followLoading, unFollowLoading} = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find(v => v.id === post.User.id);
    
    const onClickButton = useCallback(()=> {
        if(isFollowing){
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id
            });
        } else{
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id
            });
        }
    },[isFollowing]);
    return (
        <Button loading={followLoading || unFollowLoading} 
        onClick={onClickButton}
        type={isFollowing ? 'danger' : 'primary'}
        >
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );
}

Followbutton.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        Images: PropTypes.arrayOf(PropTypes.object),
        Comments: PropTypes.arrayOf(PropTypes.object),
        id: PropTypes.number
    }),
};

export default Followbutton;
