import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import {noOptionsMessageForSelect, selectStylesForSelect, themeForSelect} from "./constants";
import {getTeamsSearch} from "./services/goalsZone.service";
import Team from "./Team";

interface State {
    readonly inputValue: string;
}

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

class TeamSearch extends Component<{}, State> {
    state: State = {inputValue: ""};

    handleInputChange = (inputValue: string) => {
        this.setState({inputValue});
        return inputValue;
    };

    noOptionsMessage = noOptionsMessageForSelect;

    formatOptionLabel = ({value, label, data}: any) => (
        <Team key={`search-${data.id}`} team={data}/>
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
                placeholder="Search a team"
                noOptionsMessage={this.noOptionsMessage}
                formatOptionLabel={this.formatOptionLabel}
                isOptionDisabled={() => true}
            />);
    }
}

export default TeamSearch;