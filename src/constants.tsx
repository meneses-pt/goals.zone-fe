import {CSSProperties} from "react";

const badgePlaceholder = "/images/badge_placeholder.png";

const selectStylesForSelect = {
    menu: (base: any) => ({
        ...base,
        zIndex: 100
    })
};

const themeForSelect = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        neutral0: "#222222",
        neutral5: "#333",
        neutral10: "#404040",
        neutral20: "#444",
        neutral30: "#555",
        neutral40: "#666",
        neutral50: "#777",
        neutral60: "#888",
        neutral70: "#999",
        neutral80: "#aaa",
        neutral90: "#bbb",
        primary: "#bbb",
        primary75: "#999",
        primary50: "#777",
        primary25: "#222222",
        danger: "#00bc8c",
        dangerLight: "#00a077",
    }

});

const overrideSpinner: CSSProperties = {
    display: "block",
    margin: "40px auto",
};

const noOptionsMessageForSelect = (input: any) => {
    if (input.inputValue.length === 0) {
        return "Type to search";
    } else if (input.inputValue.length < 3) {
        return "Search input must be at least 3 characters";
    } else {
        return "No results";
    }
};

export {badgePlaceholder, selectStylesForSelect, themeForSelect, noOptionsMessageForSelect, overrideSpinner};