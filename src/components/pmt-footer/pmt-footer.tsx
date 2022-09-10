import { Component, h } from '@stencil/core';

@Component({
  tag: 'pmt-footer',
  styleUrl: 'pmt-footer.scss',
  shadow: true,
})
export class PmtFooter {
  render() {
    return (
      <div>
        <div class="sc-ipZHIp bgsapH">
          {/* <span class="sc-iGrrsa gWPtBs"></span>
          <span class="sc-dEoRIm itjQVW"></span>
          <span class="sc-bmyXtO ghjoyP"></span>
          <span class="sc-jtggT kWiCjP"></span> */}
          <img class="itjQVW" src="../../assets/icon/bottomIcons.png" alt="logo icons" />
          <span class="sc-ebFjAB cuwDJR">
            <a class="sc-hMqMXs kQNicB" href="https://qiwi.com/support.action" target="_blank" id="SupportBlock-Link" rel="noopener noreferrer">
              Помощь
            </a>
          </span>
        </div>
        <div class="sc-jKVCRD dNfkQt">
          <div class="sc-kaNhvL ialZuW">Ваши данные под защитой</div>
          <div class="sc-LKuAh bGdikk">
            Реквизиты банковской карты и регистрационные данные передаются по защищенным протоколам и не попадут в интернет-магазин и третьим лицам. Платежи обрабатываются на
            защищенной странице процессинга по стандарту PCI DSS – Payment Card Industry Data Security Standard.
          </div>
        </div>
      </div>
    );
  }
}
