import { Component, input } from '@angular/core';

@Component({
  selector: 'load-spinner',
  template: `
  <div class="spinner-wrapper">
    <div class="gaming-loader">
      <div class="inner-circle"></div>
    </div>
  </div>
  `,
  styles: `
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 100px 0;
  }

  .spinner-wrapper {
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .inner-circle {
    width: 100px;
    height: 100px;
    border: 4px solid rgba(88, 70, 249, 0.1);
    border-top: 4px solid #5846f9; 
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes scan {
    0%, 100% { top: 0%; }
    50% { top: 80%; }
  }
`
})
export class LoadSpinnerComponent {
}