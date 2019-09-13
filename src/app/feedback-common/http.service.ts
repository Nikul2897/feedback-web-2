import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * For Post service url with data
   * @param url
   * @param data
   */
  header = new HttpHeaders();
  post(url: string, data: any, ignoreLoader?) {
    if (ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader);
      return this.http.post(url, data, { headers: this.header });
    } else {
      return this.http.post(url, data);
    }
  }


  /**
   * for get method call
   * @param url
   * @param responseType
   */
  get(url: any, responseType: any, ignoreLoader?) {
    if (responseType === true) {
      if (ignoreLoader) {
        this.header = this.header.append('ignoreLoader', ignoreLoader);
        return this.http.get(url, { responseType: 'arraybuffer', headers: this.header });
      } else {
        return this.http.get(url, { responseType: 'arraybuffer' });
      }
    } else {
      if (ignoreLoader) {
        this.header = this.header.append('ignoreLoader', ignoreLoader);
        return this.http.get(url, {headers : this.header});
      } else {
        return this.http.get(url);
      }
    }
  }

  /**
   * for delete method call
   * @param url
   */
  delete(url: any, ignoreLoader?) {
    if (ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader);
      return this.http.delete(url, { headers: this.header });
    } else {
      return this.http.delete(url);
    }
  }

  /**
   * 
   * @param url For put method call
   * @param data
   */
  put(url: string, data: any, ignoreLoader?) {
    if (ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader);
      return this.http.put(url, data, { headers: this.header });
    } else {
      return this.http.put(url, data);
    }
  }

}
