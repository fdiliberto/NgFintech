import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fd-no-data-found',
  template: `
    <p class="mt-5 text-danger fw-bold text-center fst-italic">
      Nessun dato disponibile...
    </p>
  `,
  styles: [
  ]
})
export class NoDataFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
