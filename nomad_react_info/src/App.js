import React from 'react';
import axios from 'axios';
import Movie from './Movies';
import './App.css';
// import PropTypes from 'prop-types';

// function Food({name, rating}){
//   return (
//     <div>
//       <h1>{name}</h1>
//       <h2>{rating}/5.0</h2>
//     </div>    
//   )
// }

// // props type check
// // isRequired는 필수, 없으면 undefined도 포함
// Food.propTypes = {
//   name: PropTypes.string.isRequired,
//   rating: PropTypes.number
// };

// const foodILike = [
//   {
//     id: 1,
//     name: "Kimchi",
//     rating: 5
//   }, 
//   {
//     id: 2,
//     name: "ramen",
//     rating: 4
//   },
//   {
//     id: 3,
//     name: "bab",
//     rating: 3
//   }
// ]

// function renderFood(dish){
//   return (
//     <Food key={dish.id} name={dish.name} rating={dish.rating}/>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       {/* {foodILike.map(item => (
//         <Food name={item.name}/>
//       ))} */}
//       {foodILike.map(renderFood)}
//     </div>
//   );
// }

class App extends React.Component{
  // state = {
  //   count: 0
  // };

  // add = () => {
  //   this.setState(current => ({
  //     count: current.count + 1
  //   }))
  // };

  // minus = () => {
  //   this.setState(current => ({
  //     count: current.count - 1
  //   }))
  // };

  // render(){
  //   return (
  //     <div>
  //       <h1>The number is {this.state.count}</h1>
  //       <button onClick={this.add}>Add</button>
  //       <button onClick={this.minus}>Minus</button>
  //     </div>
  //   );
  // }

  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({movies, isLoading: false})
  }

  componentDidMount(){
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false
    //   })
    // }, 6000);
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_test">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
