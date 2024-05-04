import { useState } from "react";
import "./App.css";
import { Form } from "./component/form/form.js";
import "./component/form/form.css";
import { BookBlock } from "./component/book_block/book_block.js";
import "./component/book_block/book_block.css";



function App() {
  const [booksInfo, setbooksInfo] = useState([]);

  return (
    <div className="App">
      <Form
        setbooksInfo={setbooksInfo}
      />
      <div className="booksMoreBlock">
        {booksInfo.map(({ volumeInfo, _id }) => (
          <BookBlock
            setbooksInfo={setbooksInfo}
            key={_id}
            bookId={_id}
            bookName={volumeInfo?.title}
            categorie={volumeInfo?.categories}
            authorName={volumeInfo?.publishers}
            imageLink={volumeInfo?.imageLinks}
            currentNote={volumeInfo?.note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

