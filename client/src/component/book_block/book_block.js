
export function BookBlock({ bookId, categorie, bookName, authorName, imageLink, currentNote }) {

  function handleEdit(event) {
    event.preventDefault();
    const newCategorie = prompt('новая категория', categorie)
    const newName = prompt('новое название', bookName)
    const newAuthor = prompt('новый автор', authorName)
    const newImage = prompt('ссылка на изображение', imageLink)
    const userNote = prompt('заметка', currentNote)


    const bookEdit = fetch
      ('http://localhost:8080/books_edit'
        + '?id=' + bookId
        + '&newCategorie=' + newCategorie
        + '&newName=' + newName
        + '&newImg=' + newImage
        + '&newAuthor=' + newAuthor
        + '&newNote=' + userNote
      );
    bookEdit
      .then((response) => response.json())
      .then((data) => {
      });
  }

  function handleDelete(event) {
    event.preventDefault();
    const bookDelete = fetch("http://localhost:8080/books_delete?id=" + bookId);
    bookDelete
      .then((response) => response.json())
      .then((data) => {
      });
  }

  function handleInfo(event) {
    event.preventDefault();
    alert(currentNote);
  }

  return (
    <div className="bookblock">
      <div className="bookblockImg">
        <img src={imageLink}></img>
      </div>
      <div className="bookblockInfo">
        <p>{categorie}</p>
        <h4>{bookName}</h4>
        <span>{authorName}</span>
      </div>
      <button onClick={handleEdit}>edit</button>
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleInfo}>note</button>
    </div>
  );
}
