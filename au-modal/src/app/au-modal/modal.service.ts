import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ModalService {

    private closeSubject = new Subject();

    $close = this.closeSubject.asObservable();

    close() {
        this.closeSubject.next();
    }
}