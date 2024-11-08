import React,{useId } from "react";

const Input=React.forwardRef( function Input({
        type="text",
        label,
        className="",
        ...props
    },ref)     //  ref is IMP here // 
    {
        const id=useId()
        return(
            <div className='w-full'>
                {
                    label && 
                    <label
                    htmlFor={id} 
                    className='inline-block mb-1 pl-1' >
                        {label}
                    </label>
                }
                {
                    <input 
                    type={type}
                    ref={ref}
                    id={id}
                    {...props}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                    />
                }
            </div>
        )
    }
)
export default Input
