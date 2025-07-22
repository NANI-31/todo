const AnimatedCheckbox = ({ taskId, atask, onClick, className }) => {
  const checkboxId = `checkbox-${taskId}`;
  return (
    <div
      className={`rounded bg-green-600 checkbox-wrapper-11 relative p-[5px] grid grid-cols-[30px_auto] items-center ${className}`}
    >
      <input
        onClick={onClick}
        checked={atask}
        id={checkboxId}
        type="checkbox"
        name={`task-${taskId}`}
        value="2"
        readOnly
        className="relative w-[15px] h-[15px] outline:none mr-[15px] cursor-pointer grid items-center"
      />
      <label
        htmlFor={checkboxId}
        className="relative cursor-pointer grid items-center w-fit transition-colors duration-300 ease-in-out peer-checked:text-gray-400"
      >
        To-do
      </label>
    </div>
  );
};

export default AnimatedCheckbox;

// <div className="flex items-center space-x-3 relative group">
//   <input
//     id={`task-${label}`}
//     type="checkbox"
//     className="peer hidden"
//     checked={isCompleted}
//     onChange={onToggle}
//   />

//   <label
//     htmlFor={`task-${label}`}
//     className="relative cursor-pointer pl-8 text-gray-800 dark:text-gray-200 transition-colors peer-checked:text-gray-400 checkbox-label"
//   >
//     {label}
//     <span className="check-icon peer-checked:animate-check-01 peer-checked:after:animate-check-02"></span>
//     <span className="firework peer-checked:animate-firework"></span>
//   </label>
// </div>
