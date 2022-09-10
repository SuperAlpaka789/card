import { Component, h, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'pmt-card',
  styleUrl: 'pmt-card.scss',
  shadow: true,
})
export class PmtCard {
  @State() cardInput: string;
  @State() wrongCardFormat: boolean = false;
  @State() expDateInput: string;
  @State() wrongExpDateFormat: boolean = false;
  @State() cvvInput: string;
  @State() wrongCvvFormat: boolean = false;
  @State() isTimerToShow: boolean = false;
  @State() isReadyToSubmit: {
    cardInp: boolean;
    dateInp: boolean;
    cvvInp: boolean;
  } = {
    cardInp: false,
    dateInp: false,
    cvvInp: false,
  };

  onCheckHandler() {
    console.log('onCheckHandler');
    const numRegExp = /^[0-9]*$/;
    const expDateRegExp = /^[0-9]+(\/[0-9]+)*$/;
    //ready to be sent
    // if (!this.wrongCardFormat && !this.wrongCvvFormat && !this.wrongExpDateFormat) {
    //   this.isReadyToSubmit = true;
    // }
    //CardInput
    if (this.cardInput && !!this.cardInput.match(numRegExp) && !(this.cardInput.length < 12)) {
      this.wrongCardFormat = false;
      this.isReadyToSubmit.cardInp = true;
    }
    if (!this.cardInput || !this.cardInput.match(numRegExp) || this.cardInput.length < 12) {
      this.wrongCardFormat = true;
      this.isReadyToSubmit.cardInp = false;
    }
    //DateInput;
    if (this.expDateInput && this.expDateInput.length === 5 && this.expDateInput.charAt(2) === '/') {
      this.wrongExpDateFormat = false;
      this.isReadyToSubmit.dateInp = true;
    }
    if (!this.expDateInput || this.expDateInput.length !== 5 || this.expDateInput.charAt(2) !== '/' || !this.expDateInput.match(expDateRegExp)) {
      this.wrongExpDateFormat = true;
      this.isReadyToSubmit.dateInp = false;
    }
    // // //CvvInput
    if (this.cvvInput && this.cvvInput.length === 3 && !!this.cvvInput.match(numRegExp)) {
      this.wrongCvvFormat = false;
      this.isReadyToSubmit.cvvInp = true;
    }
    if (!this.cvvInput || this.cvvInput.length !== 3 || !this.cvvInput.match(numRegExp)) {
      this.wrongCvvFormat = true;
      this.isReadyToSubmit.cvvInp = false;
    }
  }

  onSubmitHandler() {
    if (this.isReadyToSubmit.cardInp && this.isReadyToSubmit.cvvInp && this.isReadyToSubmit.dateInp) {
      this.isTimerToShow = true;
      axios.post('https://631cbb941b470e0e12094434.mockapi.io/cards', {
        cardNumber: this.cardInput,
        expDate: this.expDateInput,
        cvv: this.cvvInput,
      });
    }
  }

  onCardInputHandler(e: Event) {
    const eTarget = e.target as HTMLTextAreaElement;
    this.cardInput = eTarget.value;
  }
  onDateInputHandler(e: Event) {
    const eTarget = e.target as HTMLTextAreaElement;
    this.expDateInput = eTarget.value;
  }
  onCvvInputHandler(e: Event) {
    const eTarget = e.target as HTMLTextAreaElement;
    this.cvvInput = eTarget.value;
  }
  render() {
    return (
      <div class={'main-block'}>
        <div class={'left-card'}>
          <div class={'left-card__upper-part'}>
            <div class={'left-card__inside-block'}>
              <div class={'left-card__icons-block'}>
                <img src="../../assets/icon/visa.png" alt="visa logo" />
                <img src="../../assets/icon/mir.png" alt="mir logo" />
                <img class={'master-img'} src="../../assets/icon/master.png" alt="master logo" />
              </div>
              <div class={'left-card__small-text'}>
                <span>Банковская</span>
                <span>карта</span>
              </div>
            </div>
          </div>
          <div class="sc-jnlKLf jwJHFq">
            <form class="container-0-19">
              <div class="sc-gGBfsJ jTeXAR">
                <div class="sc-fYxtnH gGiOcX">
                  <div class="sc-jbKcbu jxlXpL">
                    <div class="sc-jqCOkK cdipJj"></div>
                    <div class="sc-uJMKN bncftF"></div>
                    <div class="sc-bbmXgH hyhyWl"></div>
                  </div>
                </div>
                <div class="sc-tilXH gsMUpZ">
                  <div class="sc-ksYbfQ flqfmq">
                    <div class={this.wrongCardFormat ? 'sc-hmzhuo bWRGcf incorrectCardInput' : 'sc-hmzhuo bWRGcf'}>
                      <span>&nbsp;</span>
                    </div>
                    <div class="sc-frDJqD eFPljO">Номер карты</div>
                    <input
                      class="   borderedInput inputPAN sc-kvZOFW gMRvDD "
                      placeholder="Номер карты"
                      type="text"
                      id="CardForm-PanInput"
                      name="cardNumber"
                      inputmode="numeric"
                      pattern="[0-9]"
                      onInput={e => this.onCardInputHandler(e)}
                      value={this.cardInput}
                      maxlength="17"
                    />
                    <div class="sc-cJSrbW gaPXay"></div>
                  </div>
                </div>
                <div class="sc-ktHwxA knZFEx ">
                  <div class={this.wrongExpDateFormat ? 'sc-ksYbfQ flqfmq incorrectDateInput' : 'sc-ksYbfQ flqfmq'}>
                    <div class="sc-hmzhuo bWRGcf ">Месяц и год</div>
                    <div class="sc-frDJqD eFPljO ">Срок действия</div>
                    <input
                      class="   borderedInput sc-kvZOFW gMRvDD "
                      placeholder="00  /  00"
                      type="text"
                      id="CardForm-ValidThruInput"
                      onInput={e => this.onDateInputHandler(e)}
                      // autocomplete="cc-exp"
                      name="exp-date"
                      inputmode="decimal"
                      maxlength="5"
                      value={this.expDateInput}
                    />
                    <div class="sc-cJSrbW gaPXay"></div>
                  </div>
                </div>
                <div class="sc-cIShpX bhjUjS ">
                  <div class={this.wrongCvvFormat ? 'sc-ksYbfQ flqfmq incorrectCvvInput' : 'sc-ksYbfQ flqfmq'}>
                    <div class="sc-hmzhuo bWRGcf">Три цифры</div>
                    <div class="sc-frDJqD eFPljO">CVV</div>
                    <input
                      class="  input--hidden borderedInput inputCVV sc-kvZOFW gBKxqn"
                      placeholder="CVV"
                      type="text"
                      id="CardForm-CvvInput"
                      onInput={e => this.onCvvInputHandler(e)}
                      // autocomplete="cc-csc"
                      inputmode="numeric"
                      pattern="[0-9]"
                      value={this.cvvInput}
                      maxlength="3"
                    />
                    <div class="sc-cJSrbW gaPXay"></div>
                  </div>
                </div>
              </div>
            </form>
            <div class="sc-kafWEX cFjbRF">
              <button
                type="submit"
                class="sc-gisBJw jvlMTM sc-caSCKo flXVgX"
                id="CardForm-Submit"
                onClick={() => {
                  this.onCheckHandler();
                  this.onSubmitHandler();
                }}
              >
                <span>Оплатить</span>
              </button>
            </div>
          </div>
          {this.isTimerToShow ? <pmt-timer cardNumber={this.cardInput} expDate={this.expDateInput} cvv={this.cvvInput}></pmt-timer> : ''}
        </div>
        <div class={'right-card'}>
          <div class="box-0-18 box-0-17">
            <header class="sc-jKJlTe ijFKbn">
              <div>
                <div class="sc-ckVGcZ gRvDEN"></div>
                <div class="sc-kgoBCf kmrOKx">
                  <div class="sc-kGXeez fJWbau">
                    <div class="sc-kpOJdX kXEdGh" id="InvoiceInfoView-MerchantTitle">
                      Оплата услуг
                    </div>
                  </div>
                  <div class="sc-dxgOiQ hZcWTU" id="InvoiceInfoView-Amount">
                    6,091.05 ₽
                  </div>
                  <div class="sc-gqjmRU eEUcXg">
                    <div class="sc-VigVT bJZLvQ" id="CommissionInfo-Card">
                      Комиссия будет рассчитана после ввода реквизитов карты и оплаты
                    </div>
                    <div class="sc-VigVT cERtjU" id="CommissionInfo-Bank">
                      Совершая платеж, Вы оплачивате услуги компании ТОВ "Труд вместе".&nbsp;Банк, выпустивший карту, может взимать дополнительную комиссию.
                    </div>
                  </div>
                  <div class="sc-jzJRlG erwnQD"></div>
                </div>
              </div>
            </header>
            <div>
              <div>
                <div class="sc-cSHVUG iOHcEs"></div>
                <div class="sc-kAzzGY hdXjpI" id="ExpirationTime">
                  Счет действителен месяц
                </div>
                <div class="sc-kkGfuU UQvzg" id="LegalInfo">
                  Совершая перевод, вы соглашаетесь с{' '}
                  <a
                    class="sc-kEYyzF ljePvx sc-hMqMXs jUSXFA"
                    href="https://qiwi.com/ru/company/oferta.action"
                    // type="content"
                    target="_blank"
                    id="LegalLink"
                    rel="noopener noreferrer"
                  >
                    офертой
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
