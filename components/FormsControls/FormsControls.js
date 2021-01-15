import React from "react"
import S from "./formsControl.module.css"

const FormControlsCreator = Element => ({input, placeholder, meta}) => {
    const hasError = meta.touched && meta.error;
    return <div className={S.formControl + " " + (hasError ? S.error : " ")}>
        <div>
            <Element  {...input} placeholder={placeholder}/>
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>
}
export default FormControlsCreator