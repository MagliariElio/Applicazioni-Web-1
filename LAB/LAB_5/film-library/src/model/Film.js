import dayjs from 'dayjs';



function Film(id=0, title="", isFavorite=false, watchDate=dayjs(), score=0) {
  this.id = id;                                           // id è unico
  this.title = title;
  this.isFavorite = isFavorite === undefined ? false : isFavorite;
  this.watchDate = watchDate;
  this.score = score;

  this.toString = function () {
    return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('MMMM DD, YYYY')}, Score: ${this.score}`;
  }
}


export default Film;