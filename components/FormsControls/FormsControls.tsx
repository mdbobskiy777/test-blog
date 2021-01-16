import React from "react"
import S from "./formsControl.module.css"

type PropsType = {
    input:any,
    placeholder:string,
    meta:any
}
// eslint-disable-next-line react/display-name
const FormControlsCreator = (Element:string)=> (props:PropsType):JSX.Element  => {
    const hasError = props.meta.touched && props.meta.error;
    return (
        <div className={S.formControl + " " + (hasError ? S.error : " ")}>
            <div>
                <Element  {...props.input} placeholder={props.placeholder}/>
            </div>
            {hasError && <span>{props.meta.error}</span>}
        </div>
    )
}
export default FormControlsCreator