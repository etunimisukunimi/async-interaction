
export function Form({ setbooksInfo }) {

  function handleBook(event) {
    event.preventDefault();
    const setCategorie = prompt('категория')
    const setName = prompt('название')
    const setAuthor = prompt('автор')
    const setImage = prompt('ссылка на изображение')
    const userNote = prompt('заметка')


    const bookAdd = fetch
      ('http://localhost:8080/books_add'
        + '?setCategorie=' + setCategorie
        + '&setName=' + setName
        + '&setImg=' + setImage
        + '&setAuthor=' + setAuthor
        + '&newNote=' + userNote
      );
    bookAdd
      .then((response) => response.json())
      .then((data) => {
      });

      function bookTimeout () {
      const bookSearchResult = fetch("http://localhost:8080/books");
    bookSearchResult
      .then((response) => response.json())
      .then((data) => {
        setbooksInfo(data);
        console.log(data);
      });
    }

    setTimeout(bookTimeout, 2000);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const bookSearchResult = fetch("http://localhost:8080/books");
    bookSearchResult
      .then((response) => response.json())
      .then((data) => {
        setbooksInfo(data);
        console.log(data);
      });
    const button = document.getElementById('send_button');
    button.style.visibility = 'hidden';
  }

  return (
    <div className="nav_block">
      <h1>ajax</h1>
      <div className='add_button'>
      <button id='add_button' onClick={handleBook}>добавить запись</button>
      </div>
      <form onSubmit={handleSubmit}>
        <button id='send_button'>отправить запрос</button>
      </form>
    </div>
  );
}
