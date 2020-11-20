import React from "react";
import Posts from "./Posts";
import {connect} from "react-redux";
import {addPost} from "../../../Redux/profile-reducer";

const PostsContainer = (props) => {
    return (
        <Posts posts={props.posts}
               smallPhoto={props.smallPhoto}
               addPost={props.addPost}/>
    )
}

const mapStateToProps = (state) => {
    return ({
        posts: state.profilePage.posts,
        smallPhoto: state.profilePage.profile.photos.small
    })
}

export default connect(mapStateToProps, {addPost})(PostsContainer);