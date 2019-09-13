import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from './SnackbarService';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  data: any;
  constructor(private modalService: NgbModal, private snackbar: SnackbarService) { }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  /**
   * For check null,empty and undefined
   */
  isObjectNullOrEmpty(data: any) {
    return (data == null || data == undefined || data == '' || data == 'null' || data == 'undefined'
      || data == '' || data == [] || data == {});
  }

  isObjectIsEmpty(data: any) {
    return data && Object.keys(data).length <= 0;
  }

  /**
   * for convert value(encrypt)
   * @param value
   */
  toBTOA(value: string) {
    try {
      return btoa(value);
    } catch (err) {
      console.log('error while btoa convert');
    }
  }

  /**
   * Decrypt value
   * @param value
   */
  toATOB(value: string) {
    try {
      return atob(value);
    } catch (err) {
      console.log('error while atob convert');
    }
  }

  /**
   * Get value from storage 
   * @param key 
   * @param decrypt 
   */
  getStorage(key: string, decrypt: boolean) {
    let data = localStorage.getItem(key);
    if (this.isObjectNullOrEmpty(data) && !decrypt) {
      return data;
    }
    if (decrypt) {
      return this.toATOB(data);
    }
    return data;
  }

  /**
   * set value in storage
   * @param key
   * @param value
   */
  setStorage(key: any, value: string) {
    localStorage.setItem(key, this.toBTOA(value));
  }

  /**
   * Remove value from storage
   * @param key
   */
  removeStorage(key: any) {
    localStorage.removeItem(key);
  }

  /**
   * for set Header for cookies
   * @param email 
   * @param response 
   * @param loginToken 
   */
  setSessionAndHttpAttr(email, response, loginToken) {
    this.removeStorage(Constants.httpAndCookies.COOKIES_OBJ);
    // set cookies object
    const cookies = {};
    const config = { secure: true };
    cookies[Constants.httpAndCookies.USNM] = email;
    cookies[Constants.httpAndCookies.ACTK] = response.access_token;
    cookies[Constants.httpAndCookies.RFTK] = response.refresh_token;
    cookies[Constants.httpAndCookies.LGTK] = loginToken;
    this.setStorage(Constants.httpAndCookies.COOKIES_OBJ, JSON.stringify(cookies));
  }

  /**
   * Open PopUp
   * @param content
   * @param title
   * @param okBtnName
   * @param cancelBtnName
   */
  openPopUp(obj: any, popUpName, isYesNo) {
    // and use the reference from the component itself
    const modalRef = this.modalService.open(popUpName);
    modalRef.componentInstance.popUpObj = obj;
    modalRef.componentInstance.isYesNo = isYesNo; // if isYesNo true than display both buttons
    return modalRef;
  }

  /**
   * For handle error and display error msg
   * @param error
   * @param popUpName
   */
  errorHandle(error, popUpName) {
    if (error.status === 401) {
      localStorage.clear();
      this.errorSnackBar('You are not authorised');
    } else if (error.status === 404) {
      this.errorSnackBar('Method Not found');
    } else {
      this.errorSnackBar('Something went wrong');
      // this.errorSnackBar(error.message);
    }
  }

  /**
   * For display Toaster msg in right side
   * @param message 
   * @param action 
   */
  successSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'success');
  }
  errorSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'error');
  }
  warningSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'warning');
  }
  infoSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'info');
  }
  defaultSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, '');
  }

}
