import React from "react";

/**
 * 
 * @param {children,onClick} 
 * @description 统一给icon封装
 */
const Icon: React.FC<any> = React.memo((props) => {
  return React.Children.map(props.children, child => {
    // return <Tooltip title="prompt text " arrowPointAtCenter destroyTooltipOnHide={true}>

    return React.cloneElement(child, {
      style: {
        margin: "0 10px",
        fontSize: "30px"
      }
    })

    // </Tooltip>
  })
})
export default Icon;