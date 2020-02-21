//action creator
export function selectBook(book){
  // console.log('A book has been selectd:', book.title);
  
  // selectBook은 ActionCreator이고, action을 리턴해야 함
  // return object에는 type 프로퍼티가 있음
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}