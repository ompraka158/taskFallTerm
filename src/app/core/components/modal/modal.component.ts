import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() data;
  @Output() emitAfterModalIsClosed: EventEmitter<boolean> = new EventEmitter()
  constructor(
    private modalService: NgbModal
  ) { 
  }

  ngOnInit() {
  }

  close() {
    this.modalService.dismissAll();
    this.emitAfterModalIsClosed.emit(true);
  }

}
