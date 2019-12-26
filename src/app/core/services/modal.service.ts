import { Injectable, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRef: NgbModalRef;
  modalOption: NgbModalOptions = {};
  public emitAfterModalIsClosed = new EventEmitter;
  constructor(
    private modalService: NgbModal,
  ) { }

  openModal(message) {
    console.log(message);
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.size = 'sm';
    
    this.modalRef =this.modalService.open(ModalComponent, this.modalOption);
    this.modalRef.componentInstance.data = message;
    this.modalRef.componentInstance.emitAfterModalIsClosed.subscribe(res => {
      this.emitAfterModalIsClosed.emit(true);
    });
  }
}
