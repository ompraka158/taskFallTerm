import { Component, OnInit } from '@angular/core';
import { Cash } from '../../models/cash';
import { Denomination } from '../../constants/denominations';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cash: Cash = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    totalAmount: 0
  };
  amount = 0;
  depositCashValues: Cash = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    totalAmount: 0
  };
  dispenseCash: boolean = false;
  denomination = Denomination;
  deposit: boolean = false;
  withDraw: boolean = false;

  keys = Object.keys(this.denomination);
  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  activateDeposit() {
    if(this.deposit) {
      this.deposit = false;
    } else{
      this.deposit = true;
    }
    this.withDraw = false;
  }

  activateWithdraw() {
    if(this.withDraw) {
      this.withDraw = false;
    } else {
      this.withDraw = true;
    }
    this.deposit = false;
  }

  depositCash() {
    this.keys.forEach(key => {
      this.cash[key] += this.depositCashValues[key];
      this.cash.totalAmount += this.depositCashValues[key]*this.denomination[key];
      this.depositCashValues[key] = 0;
    })
    this.deposit = false;
  }

  withdraw() {
    if(this.cash.totalAmount === 0) {
      this._modalService.openModal('No money in the ATM');
      return;
    }
    if (this.amount > this.cash.totalAmount) {
      this._modalService.openModal('Amount indispensable');
    } else if (this.amount % 100 !== 0) {
      this._modalService.openModal('Please enter amount in multiple of 100');
    } else {
      let dispensableCash: Cash = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        totalAmount: 0
      };
      let amount = this.amount;
      this.keys.forEach(key => {
        let modValue = Math.floor(amount / this.denomination[key]);
        if (amount >= this.denomination[key]) {
          if (modValue > this.cash[key]) {
            modValue = this.cash[key];
          }
          dispensableCash[key] = modValue;
          amount -= (modValue * this.denomination[key]);
          this.dispenseCash = true;
        }
      })
      dispensableCash.totalAmount = this.amount;
      if (amount === 0) {
        let message = `Amount dispensed: ₹${dispensableCash.totalAmount} with denominations `;
        this.keys.forEach(key => {
          this.cash[key] -= dispensableCash[key];
          if(dispensableCash[key]>0) {
            message+= `${this.denomination[key]}=${dispensableCash[key]}, `
          }
        })
        this.cash.totalAmount -= this.amount;
        this.amount = 0;
        this._modalService.openModal(message);
      } else {
        this._modalService.openModal("Unable to dispense");
      }
    }
    this.withDraw = false;
  }
}
