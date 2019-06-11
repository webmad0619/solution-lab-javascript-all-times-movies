/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
function turnHoursToMinutes (movies){
  var dataToReturn =  movies.map((movie)=>{
    var newDuration =  movie.duration.split(" ");
    if(newDuration.length === 2){
      newDuration = parseInt(newDuration[0])*60 + parseInt(newDuration[1])
    }else{
      if(newDuration[0].includes('h')){
        newDuration = parseInt(newDuration[0])*60
      }else{
        newDuration = parseInt(newDuration[0])
      }
    }
    return {...movie, duration: newDuration}
  })
  return dataToReturn;
}
// 2h
// 30min
// 2h 30min


// Get the average of all rates with 2 decimals 
function ratesAverage(movies){
  var averageToReturn = movies.reduce((acc, movie)=>{
    if(movie.rate.length==0){
      return acc
    }
    return acc += parseFloat(movie.rate)
  },0)
  averageToReturn /= movies.length;
  averageToReturn = parseFloat(averageToReturn.toFixed(2))
  return averageToReturn;
}


// Get the average of Drama Movies
function dramaMoviesRate(movies){
  var dataToReturn = movies.filter((movie)=>{
    return movie.genre.includes("Drama")
  })
  if(dataToReturn.length === 0){
    return undefined
  }
  dataToReturn = ratesAverage(dataToReturn)
  return dataToReturn;
}


// Order by time duration, in growing order
function orderByDuration(movies){
  var dataToReturn = movies.sort((a,b)=>{
    if(a.duration > b.duration){
      return 1
    }
    if(a.duration < b.duration){
      return -1
    }
    if(a.title > b.title){
      return 1
    }
    if(a.title < b.title){
      return -1
    }
    return 0
  })
  return dataToReturn;
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(movies){
  if(movies.length===0){
    return undefined;
  }
  var dataToReturn = movies.filter((movie)=>{
    return movie.director == "Steven Spielberg"
  })
  dataToReturn = dataToReturn.filter((movie)=>{
    return movie.genre.includes("Drama")
  })
  dataToReturn = dataToReturn.length;
  return `Steven Spielberg directed ${dataToReturn} drama movies!`

}

// Order by title and print the first 20 titles
function orderAlphabetically(movies){
  var dataToReturn = movies.map((movie)=>{
    return movie.title
  })
  dataToReturn.sort()
  return dataToReturn.splice(0, 20)
}

// Best yearly rate average
function bestYearAvg(movies){
 if(movies.length === 0){return;}

 var bestYear = 0, bestRate = 0;
  let moviesByYear = {};
  movies.forEach(movie => {
    if(!moviesByYear[movie.year]){
      moviesByYear[movie.year] =  [];
    }
    moviesByYear[movie.year].push(movie);
  });
  for(let year in moviesByYear){
    let rate = ratesAverage(moviesByYear[year]);
    if(rate > bestRate){
      bestRate = rate;
      bestYear = year;
    }
  }
  return (`The best year was ${bestYear} with an average rate of ${bestRate}`);

  // if (movies.length===0){
  //   return undefined
  // }else{
    
  //   var bestYear = '';
  //   var bestRate = 0
  //   movies.forEach(function(movie){
  //     var someYearMovies = movies.filter(function(movieFilter){
  //       return movieFilter.year == movie.year;
  //     });
  //     var rate = ratesAverage(someYearMovies);
  
  //     if(rate >= bestRate){
  //       bestRate = rate;
  //       bestYear = movie.year;
  //     }
  //   });
  //   return (`The best year was ${bestYear} with an average rate of ${bestRate}`);
  // }
  
}