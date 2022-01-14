import React, { useRef, useEffect } from 'react';
import Loading from '../loading'

const Style = {
  backgroundColor: "#eee",
  cursor: "no-drop",
}

const Dropdown: React.FC<any> = (props: any) => {
  const { searchPlaceholder, search, searchChangeHandler, options, selectedValue, changeSelectedHandler, name, selectedIndex, data, onBlur } = props
  const searchInputEl = useRef<any>();
  const itemsEl = useRef<any>();

  useEffect(() => {
    searchInputEl.current.focus();
    if (selectedValue) {
      itemsEl.current.scrollTop = itemsEl.current.querySelector(`.item-${selectedIndex}`).offsetTop - 60;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dropdown__menu">
      <input
        type="text"
        placeholder={searchPlaceholder ? searchPlaceholder : 'Search...'}
        className="dropdown__menu_search"
        value={search}
        onChange={searchChangeHandler}
        ref={searchInputEl}
        onBlur={onBlur}
      />
      <div className="dropdown__menu_items" ref={itemsEl}>
        {
          options.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>no country</div>
          ) : 
          (
            options.map((item: any, index: number) => (
              <div
                className={selectedValue === item.label ? `dropdown__menu_item item-${item.value} selected` : `dropdown__menu_item item-${item.value}`}
                key={item.value || index}
                onClick={() => {
                  if (!item?.isDisabled) {
                    changeSelectedHandler(item.label, name, item.value)
                  }
                }}
                style={item?.isDisabled && Style}
              >
                {item.label}
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default Dropdown;