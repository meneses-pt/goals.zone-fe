import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import {getMatchesWeekSearch} from "./services/goalsZone.service";
import Match from "./Match";

interface State {
    readonly inputValue: string;
}

const selectStyles = {
    menu: (base: any) => ({
        ...base,
        zIndex: 100
    })
};

const theme = (theme: any) => ({
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

const formatMatchResults = (data: any) => {
    return data.map((match: any) => {
        return {
            value: match.id,
            data: match
        };
    });
};

const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    getMatchesWeekSearch(inputValue)
        .then(data => {
            if (inputValue.length < 3) {
                callback([]);
            } else {
                callback(formatMatchResults(data.results));
            }
        })
        .catch(() => {
            callback([]);
        });
};

class WeekSearch extends Component<{}, State> {
    state: State = {inputValue: ""};

    handleInputChange = (inputValue: string) => {
        this.setState({inputValue});
        return inputValue;
    };

    noOptionsMessage = (input: any) => {
        if (input.inputValue.length === 0) {
            return "Type to search";
        } else if (input.inputValue.length < 3) {
            return "Search input must be at least 3 characters";
        } else {
            return "No results";
        }
    };

    formatOptionLabel = ({value, label, data}: any) => (
        <Match key={`search-${data.id}`} match={data} fromSearch={true}/>
    );

    render() {
        return (
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                theme={theme}
                styles={selectStyles}
                onInputChange={this.handleInputChange}
                placeholder="Search a match from the last 7 days"
                noOptionsMessage={this.noOptionsMessage}
                formatOptionLabel={this.formatOptionLabel}
                isOptionDisabled={() => true}
            />);
    }
}

export default WeekSearch;