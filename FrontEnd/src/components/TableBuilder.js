import React  from 'react';
import matchSorter from 'match-sorter';

export default class TableBuilder{

    static createFilterableColumn(header, id){
        let result = {
            Header: header,
            id: id,
            accessor: id,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: [id] }),
            filterAll: true
        };
        return result;
    }
    static createFilterableBySelectionColumn(header, id, options){
        let optionsContent = options.map(function(option){
            return (<option key={option.id} value={option.id}>{option.value}</option>);
        });
        const ShowAll = 'All';
        let result = { 
            Header: header, 
            id: id,
            accessor: id,
            Cell: ({ value }) => {
                for(var iOption in options){
                    if(options[iOption].id === value){
                        return options[iOption].value;
                    }
                }
            },
            filterMethod: (filter, row) => {
              if (filter.value === ShowAll) return true;
              return row[filter.id] === filter.value;
            },
            Filter: ({ filter, onChange }) =>
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : ShowAll}
              >
                <option value={ShowAll}>Show All</option>
                {optionsContent}
              </select>
        };
        return result;
    }
}