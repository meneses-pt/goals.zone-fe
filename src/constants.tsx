import {CSSProperties} from "react";

const badgePlaceholder = "/images/badge_placeholder.png";

const getVar = (name: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const selectStylesForSelect = {
    menu: (base: any) => ({
        ...base,
        zIndex: 100,
        border: `1px solid ${getVar("--gz-border") || "#2a2d3a"}`,
        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.25)`,
    }),
    control: (base: any) => ({
        ...base,
        backgroundColor: getVar("--gz-bg-surface") || "#1a1d26",
        borderColor: getVar("--gz-border") || "#2a2d3a",
    }),
};

const themeForSelect = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        neutral0: getVar("--gz-bg-surface") || "#1a1d26",
        neutral5: getVar("--gz-bg-elevated") || "#222530",
        neutral10: getVar("--gz-bg-surface-hover") || "#242833",
        neutral20: getVar("--gz-border") || "#2a2d3a",
        neutral30: getVar("--gz-border-light") || "#353849",
        neutral40: getVar("--gz-text-muted") || "#6b6f82",
        neutral50: getVar("--gz-text-secondary") || "#8b8fa3",
        neutral60: getVar("--gz-text-secondary") || "#8b8fa3",
        neutral70: getVar("--gz-text-secondary") || "#8b8fa3",
        neutral80: getVar("--gz-text-primary") || "#e8e8ed",
        neutral90: getVar("--gz-text-primary") || "#e8e8ed",
        primary: getVar("--gz-text-primary") || "#e8e8ed",
        primary75: getVar("--gz-text-secondary") || "#8b8fa3",
        primary50: getVar("--gz-text-muted") || "#6b6f82",
        primary25: getVar("--gz-bg-surface") || "#1a1d26",
        danger: getVar("--gz-accent") || "#00bc8c",
        dangerLight: getVar("--gz-accent-hover") || "#00d9a0",
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
