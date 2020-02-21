import React, { Component } from "react";
//reducer와 container를 연결
import { connect } from "react-redux";
//action을 containerdhk dusruf
import { selectBook } from "../actions/index";
import { bindActionCreators } from "redux";

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}
        >
          {book.title}
        </li>
      );
    });
  }

  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}

// 어플리케이션의 state를 가져와서 props의 형태로 보여줌
function mapStateToProps(state) {
  return {
    books: state.books
  };
}

// 이 함수로 받환받은 것이 BookList 컨테이너의 props로 연결
function mapDispatchToProps(dispatch) {
  // selectBook이 호출될 때마다 return이 reducer로 전달
  // this.props.selectBook을 호출하면 action creator가 호출
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// 컴포넌트에서 컨테이너로 변경
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
