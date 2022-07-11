
export const Input = ({hidden = false, label, register, name, errorMessage, ...rest}) => {    
    return (
        <div hidden={hidden}>{label}{ !!errorMessage && <span> - { errorMessage }</span> }
            <input {...register(name)} {...rest}/>
        </div>
    )
}