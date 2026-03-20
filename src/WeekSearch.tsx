import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import {selectStylesForSelect, themeForSelect} from "./constants";
import Match from "./Match";
import {getMatchesWeekSearch} from "./services/goalsZone.service";
import {useTheme} from "./ThemeContext";

const formatMatchResults = (data: any) => {
    return data.map((match: any) => {
        return {
            value: match.id,
            data: match
        };
    });
};

const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    if(inputValue.length < 3) {
        callback([]);
        return;
    }
    getMatchesWeekSearch(inputValue)
        .then(data => {
            callback(formatMatchResults(data));
        })
        .catch(() => {
            callback([]);
        });
};

const noOptionsMessage = (input: any) => {
    if (input.inputValue.length === 0) {
        return "Type to search";
    } else if (input.inputValue.length < 3) {
        return "Search input must be at least 3 characters";
    } else {
        return "No results";
    }
};

const formatOptionLabel = ({value, label, data}: any) => (
    <Match key={`search-${data.id}`} match={data} showDate={true}/>
);

const WeekSearch = () => {
    const {theme} = useTheme();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value: string) => {
        setInputValue(value);
        return value;
    };

    return (
        <AsyncSelect
            key={theme}
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            theme={themeForSelect}
            styles={selectStylesForSelect}
            onInputChange={handleInputChange}
            placeholder="Search a match from the last 7 days"
            noOptionsMessage={noOptionsMessage}
            formatOptionLabel={formatOptionLabel}
            isOptionDisabled={() => true}
            className=""
        />
    );
};

export default WeekSearch;
