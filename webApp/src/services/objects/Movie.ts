import { Theater } from './Theater';
import { IParam } from './sortParameters/IParam';
export class Movie {

  private theaters: Theater[];
  private title: String;
  private synopsis: String;
  private posterLink: String;
  private actors: String[];
  private directors: String[];
  private genres: String[];
  private id: Number;
  private rate: Number;
  private releaseDate: Date;
  async init(movieJSON) {
    await this.fillData(movieJSON);
  }
  getTitle(): String {
    return null;
  }
  getTheaters(): Theater[] {
    return null;
  }
  async toString() {
    let res = '';
    res += this.id + ': ' + this.title + ' ; ' + this.releaseDate + ' ; ' + this.synopsis + ' ; ' + this.posterLink + ' ; ';
    res += ' actors: ';
    await this.actors.forEach(x => res += x + ' , ');
    res += ' directors: ';
    await this.directors.forEach(x => res += x + ' , ');
    res += ' genres: ';
    await this.genres.forEach(x => res += x + ' , ');
    res += ' rate: ' + this.rate;
    res += ' theaters: ';
    for (let i = 0; i < this.theaters.length; ++i) {
      res += await this.theaters[i].toString() + ' , ';
    }
    return res;
  }
  async contains(param: IParam): Promise<boolean> {
    const valueParam = await param.getValue();
    const compareFunction = (x => x === valueParam);
    if (await param.getKey() === 'directors') {
      return await (await this.directors.find(compareFunction)) !== undefined;
    } else if (await param.getKey() === 'genres') {
      return await (await this.genres.find(compareFunction)) !== undefined;
    }
    return false;
  }
  private async fillData(jsonResult) {
    await console.log(jsonResult);
    const theaters = [];
    await jsonResult.infoshowtime.theaters.forEach(async x => {
      const tempoTheater = await new Theater();
      await tempoTheater.init(x);
      await theaters.push(tempoTheater);
    });
    this.theaters = theaters;

    this.actors = await this.forEachFillData(jsonResult.infomovie.actors);
    this.directors = await this.forEachFillData(jsonResult.infomovie.directors);
    this.genres = await this.forEachFillData(jsonResult.infomovie.genres);
    this.id = jsonResult.infomovie.id;
    this.posterLink = jsonResult.infomovie.poster;
    this.synopsis = jsonResult.infomovie.synopsis;
    this.title = jsonResult.infomovie.title;
    this.rate = jsonResult.infomovie.rate;

    const tempoDate = await jsonResult.infomovie.releasedate.split('-');
    this.releaseDate = await new Date(tempoDate[0], tempoDate[1], tempoDate[2]);
  }
  private async forEachFillData(array) {
    const tempo = [];
    await array.forEach(async x => await tempo.push(x));
    return tempo;
  }
}
