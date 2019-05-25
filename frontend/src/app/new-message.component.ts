import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'new-message',
    template: `
        <md-card class="card">
            <md-card-content>
                <md-input-container>
                    <textarea [(ngModel)]="message.text" mdInput placeholder="Message"></textarea>
                </md-input-container>
                <md-card-actions>
                    <button (click)="post()" md-button color="primary">POST</button>
                </md-card-actions>
            </md-card-content>
        </md-card>
    `
})
export class NewMessageComponent {

    constructor(
			private webService : WebService,
			private auth: AuthService,
			private sb: MdSnackBar
		) {}

    message = {
        owner: this.auth.name,
        text: ""
    }

		post() {
			if ((this.message.owner != null) && (this.auth.isAuthenticated)) {
			  this.webService.postMessage(this.message);
			} else {
				this.sb.open('Must be logged in to post a message.', 'close', { duration: 4000 });
			}
    }
}
