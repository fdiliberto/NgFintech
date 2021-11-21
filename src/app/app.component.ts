import {Component} from '@angular/core';

@Component({
    selector: 'fd-root',
    template: `
        <div class="container-fluid" class="bg-light">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
}
