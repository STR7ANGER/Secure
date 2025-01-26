// import React from 'react';

// const MyComponent = () => {
//   return (
//     <div>
//       <h1>Hello world!</h1>
//       <p>This is a test component.</p>
//       <button>Click me</button>
//     </div>
//   );
// };

// export default MyComponent;

// import { useState } from 'react';

// const STATUS = {
//   HOVERED: 'hovered',
//   NORMAL: 'normal',
// };

// export default function Link({ page, children }) {
//   const [status, setStatus] = useState(STATUS.NORMAL);

//   const onMouseEnter = () => {
//     setStatus(STATUS.HOVERED);
//   };

//   const onMouseLeave = () => {
//     setStatus(STATUS.NORMAL);
//   };

//   return (
//     <a
//       className={status}
//       href={page || '#'}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {children}
//     </a>
//   );
// }


import { useState } from 'react';

export default function CheckboxWithLabel({ labelOn, labelOff }) {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? labelOn : labelOff}
    </label>
  );
}