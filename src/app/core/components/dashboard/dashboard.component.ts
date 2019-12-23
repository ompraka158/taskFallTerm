import { Component, OnInit } from '@angular/core';
import { Cash } from '../../models/cash';
import { Denomination } from '../../constants/denominations';

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
  constructor() { }

  ngOnInit() {
  }

  activateDeposit() {
    this.deposit = true;
    this.withDraw = false;
  }

  activateWithdraw() {
    this.withDraw = true;
    this.deposit = false;
  }

  depositCash() {
    this.cash.first += Number(this.depositCashValues.first);
    this.cash.second += this.depositCashValues.second;
    this.cash.third += this.depositCashValues.third;
    this.cash.fourth += this.depositCashValues.fourth;
    this.cash.totalAmount += ((this.depositCashValues.first * this.denomination.first) + (this.depositCashValues.second * this.denomination.second) + (this.depositCashValues.third * this.denomination.third) + (this.depositCashValues.fourth * this.denomination.fourth));
    this.deposit = false;
    let keys = Object.keys(this.denomination);
    keys.forEach(key => {
      this.depositCashValues[key] = 0;
    });
  }

  withdraw() {
    if (this.amount > this.cash.totalAmount) {
      alert('Amount indispensable');
    } else if (this.amount % 100 !== 0) {
      alert('Please enter amount in multiple of 100');
    } else {
      let dispensableCash: Cash = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        totalAmount: 0
      };
      let amount = this.amount;
      let keys = Object.keys(this.denomination);
      keys.forEach(key => {
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
        keys.forEach(key => {
          this.cash[key] -= dispensableCash[key];
        })
        this.cash.totalAmount -= this.amount;
        this.amount = 0;
        alert(`Amount dispensed: ₹${dispensableCash.totalAmount} with denominations ${this.denomination.first}=${dispensableCash.first}, ${this.denomination.second}=${dispensableCash.second}, ${this.denomination.third}=${dispensableCash.third}, and ${this.denomination.fourth}=${dispensableCash.fourth}`);
      } else {
        alert("Unable to dispense");
      }
    }
    this.withDraw = false;
  }
}
