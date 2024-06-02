const OptionInterface = ({
    options,
    onSelectOption,
    ...props
}) => {
    return (
        <div {...props}>
            <select
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => onSelectOption(event.target.value)}
            >
                <option
                    value=""
                >
                    None
                </option>
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default OptionInterface;
