// import { Component } from "react";
import PropTypes from 'prop-types';
import { FilterInput, FilterLabel } from "./Filter.styled";

function Filter({ value, onChangeFilter }) {
  return (
    <>
      <FilterLabel>
        Find contacts by name
        <FilterInput type="text" value={value} onChange={onChangeFilter} />
      </FilterLabel>
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;

// export default class Filter extends Component {
// 	static propTypes = {
// 		onFilter: PropTypes.func.isRequired,
// 		filter: PropTypes.string,
// 	};

// 	render() {
// 		const { filter, onFilter } = this.props;
// 		return (
// 			<FilterLabel>
// 				Find contacts by name
// 				<FilterInput 
// 				placeholder="Search"
// 				type="text" 
// 				onChange={onFilter} value={filter}  />
// 			</FilterLabel>
// 		)
// 	}

// }