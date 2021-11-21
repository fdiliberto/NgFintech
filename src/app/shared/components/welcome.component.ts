import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fd-welcome',
    template: `
        <figure class="text-center fst-italic shadow bg-light p-2 bg-opacity-50 p-2 pb-3 border rounded w-25">
            <blockquote class="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
        </figure>
    `,
    styles: []
})
export class WelcomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
