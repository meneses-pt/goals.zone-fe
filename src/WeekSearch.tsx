import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import {selectStylesForSelect, themeForSelect} from "./constants";
import Match from "./Match";
import {getMatchesWeekSearch} from "./services/goalsZone.service";

interface State {
    readonly inputValue: string;
}

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
        <Match key={`search-${data.id}`} match={data} showDate={true}/>
    );

    render() {
        return (
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                theme={themeForSelect}
                styles={selectStylesForSelect}
                onInputChange={this.handleInputChange}
                placeholder="Search a match from the last 7 days"
                noOptionsMessage={this.noOptionsMessage}
                formatOptionLabel={this.formatOptionLabel}
                isOptionDisabled={() => true}
                className=""
            />);
    }
}

export default WeekSearch;