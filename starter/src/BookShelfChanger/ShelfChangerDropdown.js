
const ShelfChangerDropdown = () => {

    const options = [
        {name: "Currently Reading", value: "currentlyReading"},
        {name: "Want to Read", value: "wantToRead"},
        {name: "Read", value: "read"},
        {name: "None", value: "none"},
    ]

    return(
        <div>
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>
                    Move to...
                    </option>
                    {
                        options.map(opt => {
                            return(
                                <option value={opt.value} key={opt.value}>{opt.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default ShelfChangerDropdown