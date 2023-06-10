const Input = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        className="
              block
              px-6
              pt-6
              pb-1
              w-full
              text-md
              text-black
              border-b-2
              transition
              border-gray-400
              appearance-none
              focus:outline-none
              focus:ring-0
              focus:border-blue-500
              bg-blue-100
              peer
              "
        placeholder=" "
      />
      <label
        className="
          absolute
          text-md
          text-blue-
          duration-150
          transform
          text-gray-500
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
          hover:cursor-text
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
