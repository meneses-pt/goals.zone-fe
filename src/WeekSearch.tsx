import React from "react";
import Select from "react-select";

// const customStyles = {
//     option: (provided: any, state: any) => ({
//         ...provided,
//         color: "--bs-list-group-color",
//         padding: 20,
//     }),
//     control: (provided: any, state: any) => ({
//         ...provided,
//         backgroundColor: "--bs-list-group-bg",
//         borderColor: "--bs-list-group-border-color",
//         color: "--bs-list-group-color"
//     }),
// };

const selectStyles = {
    menu: (base: any) => ({
        ...base,
        zIndex: 100
    })
};

const theme = (theme:any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        neutral0: '#222222',
        neutral5: '#333',
        neutral10: '#404040',
        neutral20: '#444',
        neutral30: '#555',
        neutral40: '#666',
        neutral50: '#777',
        neutral60: '#888',
        neutral70: '#999',
        neutral80: '#aaa',
        neutral90: '#bbb',
        primary: '#bbb',
        primary75: '#999',
        primary50: '#777',
        primary25: '#555',
        danger: '#00bc8c',
        dangerLight: '#00a077',
    }

})

const options = [
    {value: "chocolate", label: "Chocolate"},
    {value: "strawberry", label: "Strawberry"},
    {value: "vanilla", label: "Vanilla"}
];

const WeekSearch = () => (
    <Select theme={theme} styles={selectStyles} options={options}/>
);

export default WeekSearch;