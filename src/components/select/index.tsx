import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Select from "react-select";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from 'react-select';
// import styled from "styled-components";

// import { useController } from "react-hook-form";

const colourStyles = {
  option: (styles:any , { isDisabled = false, isFocused = false, isSelected = false }) => ({
    ...styles,
    backgroundColor: "none",
    // color: isSelected ? "#333333" : "#999999",
    color: isDisabled ? "#999999" : "#333333",
    cursor: isDisabled ? "no-drop" : "pointer",
    "&:hover": {
      // color: isDisabled ? "#999999" : "#333333",
      backgroundColor: "#f1f1f1"
    },
  
    "&:active": {
      backgroundColor: "#ffffff",
    },
    position: "relative",
  

    "&::before": {
      position: "absolute",
      content: "'✓'",
      top: "10px",
      right: "25px",
      width: "10px",
      height: "auto",
      color: "#03bb03",
      fontWeight: "600",
      display: isSelected ? "block" : "none"  
    }

  }),
  control: (base:any, { selectProps: { typeFlexSelect = false, height = "50px", width = "" } }) => ({
    ...base,
    cursor: "pointer",
    fontSize: "16px",
    height: height || "",
    width: width || "",
    "&:hover": {
      // boxShadow: "0px 4px 8px rgba(51, 51, 51, 0.25)",
      borderColor: "#333333 !important",
    },
    // borderColor: '#dce0ea !important',
    border: typeFlexSelect ? "none" : "1px solid #333333",
    borderRadius: "10px",
    // boxShadow: !state.hasValue ? 'none' : '0 0 0 1px #333333',
    boxShadow: "none",
  }),
  indicatorSeparator: () => ({}),
  menu: () => ({
    border: "1px solid #333333",
    borderRadius: "5px",
    marginTop:"5px",
    padding:"0px 5px",
    // maxHeight: "250px",
    // overflowY: "auto"
  }),

  // menuList: () => ({
  //   // padding: "5px 0",
  //   // marginTop: "45px"
  // }),

  dropdownIndicator: (provided:any, state:any) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen && "rotate(180deg)",
    svg: {
      fill: "#333333",
    },
  }),
  singleValue: (base:any, { selectProps: { fontSize = "14px" } }) => ({
    ...base,
    paddingLeft: "8px",
    fontSize: fontSize,
    overflow: "visible",
  }),
  placeholder: (base:any, { selectProps: { fontSize = "14px" } }) => ({
    ...base,
    fontSize: fontSize,
    color: "#868A96",
    padding: '8px',
  }),
};

// const ControlComponent = (props: ControlProps<false>) => (
//   <div className='claAbc' style={{marginTop: "10px"}}>
//     <p>hello</p>
//     <components.Control {...props} />
//   </div>
// );

const SelectInput : React.FC<any> = (props: any) => {
  const refInput  = useRef<any>(null);
  const [focus, setFocus] = useState(false)

  const {
    data,
    label,
    typeFlexSelect,
    errorMessage,
    fontWeightOfLabel,
    control,
    name,
    asyncSelect = false,
    promiseOptions,
    marginTop = "2px",
    handleSingleSelect,
    isSearchable = false,
    ...rest
  } = props
 
  // const {
  //   field: { ...selectProps },
  // } = useController({
  //   name,
  //   control,
  // });

  // const Control = ({ children, ...props }: ControlProps<false>) => {
  //   // @ts-ignore
  //   // const { emoji, onEmojiClick } = props.selectProps;
  //   const style = { cursor: 'pointer' };
  
  //   return (
  //     <components.Control {...props}>
  //       {children}
  //     </components.Control>
  //   );
  // };

  // const Menu = ({ children, ...rest }: ControlProps<false>) => {
  //   return(
  //     <components.Menu {...rest}>
  //     {children}
  //   </components.Menu>
  //   )
  // }}

  // useEffect(() => {
  //   // refInput.current.focus()
  //   if(focus) {
  //     setTimeout(() =>{
  //       console.log('chay vao day')
  //       document.getElementById("input-123")?.focus()
  //     }, 500)
  //   }
    
  // }, [focus])

  const handleClick = () =>{
    // refInput.current.focus()
    // setTimeout(() =>{
      // document.getElementById("input-123")?.focus()
    // }, 1000)
  }

  const handleFocus = () =>{
    console.log('setFocus', refInput)
    setFocus(true)
    // document.getElementById("input-123")?.focus()
    // setFocus(true)
    if(refInput && refInput.current) refInput.current.focus()
  }

  return (
    <div style={{position:"relative"}}>
      <Select
        options={data}
        onFocus={handleFocus}
        typeFlexSelect={typeFlexSelect}
        styles={colourStyles}
        isSearchable={isSearchable}
        // isSearchable
        onChange={handleSingleSelect}
        // isOptionDisabled={(option) => option.disabled}
        // {...selectProps}
        {...rest}
        components={{   
          Menu: ({ children, ...rest}) => {
            // console.log(children)
            return(
              <>
                      {/* <input 
                        ref={refInput} 
                        // autoFocus
                        id="input-123" 
                        className='search-input-ex' 
                        type="text" 
                        placeholder='Search...' /> */}
                  <components.Menu {...rest}>
                      <div className='select-menu'>
                      {
                        children
                      }
                      </div>
                  </components.Menu>
              </>
            )
          }
        }}
      />
      {
        focus && (
          <input 
        // ref={refInput} 
        // autoFocus
        id="input-123" 
        className='search-input-ex' type="text" placeholder='Search...' />
        )
      }
    </div>
  );
};
// const LabelSelect = styled.label`
//   font-family: 'Roboto';
//   font-size: 12px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 16px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #303841;
// `;
// export const ErrorMessage = styled.div`
//   display: flex;
//   gap: 4px;
//   height: max-content;
//   margin-top: 10px;
//   align-items: center;

//   & > p {
//     color:#F44336;
//     font-style: italic;
//     font-size: 14px;
//   }

//   & > span {
//     width: 25px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
// `;

export default SelectInput;

SelectInput.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  fontWeightOfLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeFlexSelect: PropTypes.bool,
  control: PropTypes.object,
  name: PropTypes.string,
  promiseOptions: PropTypes.func,
  marginTop: PropTypes.string,
};
