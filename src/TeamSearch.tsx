import React, {useState} from "react";
import AsyncSelect from "react-select/async";
import {noOptionsMessageForSelect, selectStylesForSelect, themeForSelect} from "./constants";
import {getTeamsSearch} from "./services/goalsZone.service";
import Team from "./Team";
import {useTheme} from "./ThemeContext";

const formatTeamResults = (data: any) => {
    return data.map((team: any) => {
        return {
            value: team.id,
            data: team
        };
    });
};

const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    if(inputValue.length < 3) {
        callback([]);
        return;
    }
    getTeamsSearch(inputValue)
        .then(data => {
            callback(formatTeamResults(data));
        })
        .catch(() => {
            callback([]);
        });
};

const formatOptionLabel = ({value, label, data}: any) => (
    <Team key={`search-${data.id}`} team={data}/>
);

const TeamSearch = () => {
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
            placeholder="Search a team"
            noOptionsMessage={noOptionsMessageForSelect}
            formatOptionLabel={formatOptionLabel}
            isOptionDisabled={() => true}
        />
    );
};

export default TeamSearch;
