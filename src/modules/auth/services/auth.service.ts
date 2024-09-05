import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
    headers:any
    baseUrl:any
    constructor(private http:HttpClient) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          //  'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            // 'Content-Security-Policy': "frame-ancestors 'self'",
            // 'X-Frame-Options': 'DENY',
            // 'X-Content-Type-Options': 'nosniff',
            // 'X-XSS-Protection': '1; mode=block',
            // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            // 'Referrer-Policy': 'no-referrer',
            
            // 'Authorization': 'Bearer key'
            'x-powered-by': 'Express',
 'x-render-origin-server': 'Render' ,
          });
          this.baseUrl = environment?.baseUrl;
    }

    getAuth$(): Observable<{}> {
        return of({});
    }


    secureGet(url: string, params?: object) {
       // this.generateHeaders();
        const apiUrl = `${this.baseUrl}${url}`;
        return this.http.get(apiUrl, {
          headers: this.headers,
        });
      }


    securePost(url: string, data?: any, params?: object) {
      //  this.options = new HttpHeaders(this.headers);
      //  const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
        ////console.log("@@@@ apiUrl", apiUrl);
        const apiUrl = `${this.baseUrl}${url}`
        return this.http.post(apiUrl, data, {
          headers: this.headers,
        });
      }

      securePut(url: string, data?: any, params?: object) {
        //  this.options = new HttpHeaders(this.headers);
        //  const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
          ////console.log("@@@@ apiUrl", apiUrl);
          const apiUrl = `${this.baseUrl}${url}`
          return this.http.put(apiUrl, data, {
            headers: this.headers,
          });
        }
}
