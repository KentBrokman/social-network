import React from "react";
import styles from './Posts.module.css';
import buttonStyle from "../../../assets/button.module.css"
import {Field, reduxForm, reset} from "redux-form";
import {Element} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/Validators/Validators";


// const Textarea = Element('textarea');
const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}
              className={styles.form}>
            <div className={styles.formInner}>
                <Field component='textarea'
                       name={'newPost'}
                       validate={[required]} />
                <button className={buttonStyle.button}
                     type='submit'>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm({form: 'myPosts'})(PostsForm);