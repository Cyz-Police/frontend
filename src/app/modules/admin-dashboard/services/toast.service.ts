import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

  constructor() { }

  showToast(toast: string, message: string) {
    toast = message;
    setTimeout(() => { 
      toast = undefined;
    }, 2800);
  }
}
