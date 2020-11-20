import React from "react";
import styles from './Posts.module.css'
import {reset} from "redux-form";
import PostsForm from "./PostsForm";
import randomUser from '../../../imgs/randomUser1.png'

const Posts = ({posts, smallPhoto, addPost}) => {
    console.log('render')
    const onSubmit = (formData, dispatch) => {
        addPost(formData.newPost);
        dispatch(reset('myPosts'))
    }
    return (
        <div className={styles.posts}>
            <div className={styles.postsForm}>
                <PostsForm onSubmit={onSubmit} />
            </div>
            <div className={styles.listOfPosts}>
                {posts.map(post => {
                    return (
                        <Post postText={post}
                              smallPhoto={smallPhoto}
                              key={post}/>
                    )
                }).reverse()}
            </div>
        </div>
    )
}

const Post = ({postText, smallPhoto}) => {
    return (
        <div className={styles.post}>
            <img src={smallPhoto || randomUser}
                 alt='postImg'/>
            <div className={styles.postBody}>
                <div>{postText}</div>
            </div>
        </div>
    )
}

export default Posts;