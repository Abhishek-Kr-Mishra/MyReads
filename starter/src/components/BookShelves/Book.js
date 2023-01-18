import ShelfChangerDropdown from "../BookShelfChanger/ShelfChangerDropdown";
import * as BookApi from "../../BooksAPI";
import PropTypes from "prop-types";

const Book = ({ bookDetail, updateBookShelf }) => {
  const updateBookShelfDetails = (newShelf) => {
    const updateBook = async () => {
      await BookApi.update(bookDetail, newShelf);
      updateBookShelf(bookDetail, newShelf);
    };
    updateBook();
  };

  return (
    <div>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${
                  bookDetail &&
                  bookDetail.imageLinks &&
                  bookDetail.imageLinks.thumbnail
                }")`,
              }}
            ></div>
            <ShelfChangerDropdown
              cuurentDropdownValue={
                bookDetail.shelf === undefined ? "none" : bookDetail.shelf
              }
              onShelfChange={(newShelf) => updateBookShelfDetails(newShelf)}
            />
          </div>
          <div className="book-title">{bookDetail.title}</div>
          <div className="book-authors">
            {bookDetail && bookDetail.authors && bookDetail.authors.join(",")}
          </div>
        </div>
      </li>
    </div>
  );
};

export default Book;

Book.propTypes = {
  bookDetail: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
