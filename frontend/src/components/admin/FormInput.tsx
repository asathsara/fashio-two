import React from "react";

type InputProps = {
  as?: "input";
  inputRef?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = {
  as: "textarea";
  inputRef?: React.Ref<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormInputProps = {
  label: string;
} & (InputProps | TextareaProps);

const FormInput = ({ label, as = "input", inputRef, ...props }: FormInputProps) => {
  return (
    <div>
      <p className="font-poppins text-lg mt-4">{label}</p>

      {as === "textarea" ? (
        <textarea
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          className="border border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-56"
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          className="border border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-56"
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
};

export default FormInput;
