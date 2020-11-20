import React, {useEffect, useState} from "react";
import styles from './ProfileData.module.css'
import {Field, reduxForm} from "redux-form";
import {Element} from "../../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../../utils/Validators/Validators";
import buttonStyle from "../../../../assets/button.module.css";

const maxLength50 = maxLengthCreator(50);
const maxLength20 = maxLengthCreator(20);
const Input = Element('input');
const Textarea = Element('textarea');
const Form = ({handleSubmit, profile}) => {
    return (
        <form onSubmit={handleSubmit}
              className={styles.profileData}>
            <div className={styles.aboutInfo}>
                <div><b>Name:</b> <Field component={Input} placeholder='name'
                                         name='fullName'
                                         validate={[required, maxLength20]} />
                </div>
                <div><b>About me:</b> <Field component={Textarea}
                                             name={'aboutMe'}
                                             validate={[required, maxLength50]}/>
                </div>
                <div className={styles.checkbox}><b>Looking for a job:</b> <Field component={Input}
                                                      name={'lookingForAJob'}
                                                      type={'checkbox'} />
                </div>
                <div><b>Description:</b> <Field component={Textarea}
                                                name={'lookingForAJobDescription'}
                                                validate={[required, maxLength50]}/>
                </div>

                <button className={buttonStyle.button + ' ' + buttonStyle.editButton}>Save</button>
            </div>
            <div className={styles.contacts}>
                {Object.keys(profile.contacts).map(contact => {
                    return (
                        <div key={contact}>
                            <div>
                                <b>{contact}:</b>
                            </div>
                            <Field component={Input}
                                   name={`contacts.${contact}`}/>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const ProfileDataForm = reduxForm({form: 'profile'})(Form);

export default ProfileDataForm;