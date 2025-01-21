import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly baseUrl = 'http://localhost:8080/server'

  constructor(private httpClient: HttpClient) { }

  getServers():Observable<CustomResponse>{
    return this.httpClient.get<CustomResponse>(`${this.baseUrl}/list`);
  }

  servers$ = <Observable<CustomResponse>>
  this.httpClient.get<CustomResponse>(`${this.baseUrl}/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  save$ = (server: Server) => <Observable<CustomResponse>>
  this.httpClient.post<CustomResponse>(`${this.baseUrl}/save`, server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
  this.httpClient.get<CustomResponse>(`${this.baseUrl}/ping/${ipAddress}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(
    suscriber => {
      console.log(response);
      suscriber.next(
        status === Status.ALL ? {...response, message: `Servers filtered by ${status} status`} :
        {
          ...response,
          message: response.data.servers
          .filter(server => server.status === status).length > 0 ?  `Servers filtered by
          ${status === Status.SERVER_UP ? 'SERVER UP'
            : 'SERVER DOWN'} status` : `No server of ${status} found`,
            data: { servers: response.data.servers.filter(server => server.status === status) }
        }
      );
      suscriber.complete();
    }
  )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );


  delete$ = (serverId: number) => <Observable<CustomResponse>>
  this.httpClient.delete<CustomResponse>(`${this.baseUrl}/ping/${serverId}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError (`An error occurred - Erroro code: ${error.status}`);
  }
}

/*   import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  import { CustomResponse } from '../interface/custom-response';

  @Injectable({
    providedIn: 'root'
  })
  export class ServerService {

    private readonly baseUrl = 'http://localhost:8080/server';
    servers$: Observable<CustomResponse>;

    constructor(private httpClient: HttpClient) {
      this.servers$ = this.httpClient.get<CustomResponse>(`${this.baseUrl}/list`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
    }

    getServers(): Observable<CustomResponse> {
      return this.httpClient.get<CustomResponse>(`${this.baseUrl}/list`);
    }

    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      return throwError('Something went wrong; please try again later.');
    }
  } */
