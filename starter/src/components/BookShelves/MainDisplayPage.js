import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

const MainDisplayPage = ({ allBooks, updateBookShelf }) => {
  const shelvesType = [
    { name: "Currently Reading", value: "currentlyReading" },
    { name: "Want to Read", value: "wantToRead" },
    { name: "Read", value: "read" },
  ];

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelvesType.map((shelf) => {
              return (
                <BookShelf
                  key={shelf.value}
                  shelf={shelf}
                  allBooks={allBooks}
                  updateBookShelf={updateBookShelf}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="open-search">
        {/* <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a> */}
        <Link to="/Search">Add a book</Link>
      </div>
    </div>
  );
};

export default MainDisplayPage;

MainDisplayPage.propTypes = {
  allBooks: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
