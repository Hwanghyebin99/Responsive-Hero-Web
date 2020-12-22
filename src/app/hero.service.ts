import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //RxJS라이브러리가 제공하는 클래스(Observable)
import { img } from './img';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { IMGS } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //httpClient와 httpHeader 심볼 로드
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES); //Observable<Hero[]>타입으로 한번에 반환
  // }
  getImgs(): Observable<img[]> {
    return of(IMGS); //Observable<Hero[]>타입으로 한번에 반환
  }
  private heroesUrl = 'api/heroes'; 
  constructor( private http: HttpClient, //httpClient instance 받아옴
    private messageService: MessageService) { }

  // getHeroes(): Observable<Hero[]> {
  //   // TODO: 메시지는 히어로 데이터를 가져온 _후에_ 보내야 합니다.
  //   //this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }
  httpOptions = { //웹 api헤더를 프로퍼티로 저장
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //get을 이용해 Observable<hero[]>를 반환, 데이터를 한번만 반환하고 종료
      .pipe( //catchEror()연산자를 연결
       // tap(_ => this.log('fetched heroes')), //Observable 데이터를 log 함수로 출력
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> { //get을 이용해 Observable<hero> 반환
    const url = `${this.heroesUrl}/${id}`;//literal
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  /** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
  updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe( //URL, 수정할 데이터, 옵션을 인자로 받음.
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero(hero:Hero): Observable<any>{
      return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero:Hero|number):Observable<any>{
    const id = typeof hero === 'number' ? hero : hero.id; //id(number)
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe( //url을 http instance에서 지움?
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // 입력된 내용이 없으면 빈 배열을 반환합니다.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  // getHero(id: number): Observable<Hero|undefined> {
  //   // TODO: 이 메시지는 서버에서 히어로 정보를 가져온 _후에_ 보내야 합니다.
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
    
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  // updateHero(hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

    /**
    * HTTP 요청이 실패한 경우를 처리
    * @param operation - 실패한 동작의 이름
    * @param result - 기본값으로 반환할 객체
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: 리모트 서버로 에러 메시지 보내기
    console.error(error); // 지금은 콘솔에 로그를 출력합니다.

    // TODO: 사용자가 이해할 수 있는 형태로 변환하기
    this.log(`${operation} failed: ${error.message}`);

    // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    return of(result as T);
  };
}
  
     /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
    private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
}
  
 
}
