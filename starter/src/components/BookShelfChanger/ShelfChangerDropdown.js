import PropTypes from "prop-types";

const ShelfChangerDropdown = ({ cuurentDropdownValue, onShelfChange }) => {
  const options = [
    { name: "Currently Reading", value: "currentlyReading" },
    { name: "Want to Read", value: "wantToRead" },
    { name: "Read", value: "read" },
    { name: "None", value: "none" },
  ];

  const changeBookShelf = (event) => {
    let newShelf = event.target.value;
    onShelfChange(newShelf);
  };

  return (
    <div>
      <div className="book-shelf-changer">
        <select value={cuurentDropdownValue} onChange={changeBookShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          {options.map((opt) => {
            return (
              <option value={opt.value} key={opt.value}>
                {opt.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ShelfChangerDropdown;

ShelfChangerDropdown.propTypes = {
  cuurentDropdownValue: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
