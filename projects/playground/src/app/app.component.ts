import { Component } from '@angular/core';
import { Dove } from 'angular-dove';

export type MyData = {props: string};

@Component({
  selector: 'app-root',
  template: `
    <button (click)="modelChange()">Model Event</button>
    <button (click)="dove.dispatch('user')">User Event</button>
  `,
  providers: [Dove]
})

export class AppComponent {

  constructor(
    private dove: Dove
  ){}

  ngOnInit(){

    this.dove.listen('user').subscribe(() => {
      console.log('User Event');
    });

    this.dove.listen('model').subscribe((val: string) => {
      console.log(val);
    });
    
  }

  private modelChange(): void {
    this.dove.dispatch<MyData>('model', {props: 'test'});
  }

  ngOnDesotry(){
    this.dove.kill();
  }

}
