interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

const FormInput = ({ label, type, inputRef,  ...props }: FormInputProps) => (
  <div>
    <p className="font-poppins text-lg mt-4">{label}</p>
    <input
      ref={inputRef}
      type={type}
      className={`border border-gray-300 outline-none rounded-md px-4 py-2 mt-1 w-3/4 min-w-56`}
      {...props}
    />
  </div>
);


export default FormInput;
