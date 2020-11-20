import React from "react";
import styles from "./FormsControl.module.css";

export const Element = Element => ({input, meta, ...props}) => {
    // debugger
    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? styles.error : undefined}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}