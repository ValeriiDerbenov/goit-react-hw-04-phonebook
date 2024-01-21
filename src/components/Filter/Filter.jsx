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
