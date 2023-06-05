import dayjs from 'dayjs';



function Film(id = 0, title = "", isFavorite = false, watchDate = dayjs(), score = 0, user=-1) {
  this.id = id;                                           // id è unico
  this.title = title;
  this.isFavorite = isFavorite === undefined ? false : isFavorite;
  this.watchDate = watchDate === undefined ? dayjs() : dayjs(watchDate);
  this.score = score;
  this.user = user;

  this.toString = function () {
    return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${isNaN(this.watchDate) ? undefined : dayjs(this.watchDate).format('MMMM DD, YYYY')}, Score: ${this.score}, User: ${this.id}`;
  }
}


export default Film;