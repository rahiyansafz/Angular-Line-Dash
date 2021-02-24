import { Component } from '@angular/core';
import { fromEvent } from 'rxjs'

declare var LeaderLine: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //throwaway
  mapping = [];
  mapping2 = []
  /////////

  //////////////////////////////
  /*  UI State Variables     */
  ////////////////////////////
  /* These variables are used to manage the state of the DOM
    'SM' = Standard Metric, 'FMM' = Financial Model Metric*/
  mappedStandardMetrics = {};
  mappedFinancialModelMetrics = {};
  currentClickSM: string; //the element id
  currentClickFMM: string;
  selectedSM: string;
  selectedFMM: string;
  mapped: boolean = false;
  mappedIndex: number;
  wasRedraw = false;
  globalLine = null;

  //////////////////////////////
  /*          Store          */
  ////////////////////////////
  mappingStore = [{mapping:'',mapping2:'', line:null}];


  constructor() {
    this.createAry();
  }

  selectionWasMapped(id) {
    for (let i = 0; i < this.mappingStore.length; i++) {
      if (this.mappingStore[i].mapping === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  selectionWasMapped2(id) {
    for (let i = 0; i < this.mappingStore.length; i++) {
      if (this.mappingStore[i].mapping2 === id) {
        this.mappedIndex = i;
        return true;
      }
    }
  }

  getMappedIndex(id) {
    for (let i = 0; i < this.mappingStore.length; i++) {
      if (this.mappingStore[i].mapping === id) {
        return i;
      }
    }
    return 0;
  }

    getMappedIndex2(id) {
    for (let i = 0; i < this.mappingStore.length; i++) {
      if (this.mappingStore[i].mapping2 === id) {
        return i;
      }
    }
    return 0;
  }

  leader(id, id2) {
    let startEl = document.getElementById(id);
    let endEl = document.getElementById(id2);

    return new LeaderLine(
      startEl,
      endEl, {
        endPlugOutline: false,
        animOptions: { duration: 3000, timing: 'linear' }
      }
    );
  }

  doSomething(clickedEl: HTMLElement) {
    console.log("dosomething");
    this.currentClickSM = clickedEl.id;
    this.currentClickFMM = undefined;
    if (this.wasRedraw) {
      this.globalLine.setOptions({ dash: false });
      this.wasRedraw = false;
    }
    if (this.mapped) {
      this.selectedSM = undefined;
      this.selectedFMM = undefined;
      this.mapped = false;
    }
    if (this.selectionWasMapped(this.currentClickSM)) {
      let l = this.mappingStore[this.mappedIndex].line;
      l.setOptions({ dash: { animation: true } });
      this.wasRedraw = true;
      this.globalLine = l;
      console.log("hi");
    } else if (this.selectedSM === this.currentClickSM) {
      this.currentClickSM = '';

      this.selectedSM = '';
    } else {
      this.selectedSM = this.currentClickSM;
    }

    if (this.isMapped()) {
      //save
      //mark mapped
      let l = this.leader(this.selectedSM, this.selectedFMM);
      this.mappedStandardMetrics[this.selectedSM] = true;
      this.mappedFinancialModelMetrics[this.selectedFMM] = true;
      this.save(l);
    }
  }

  save(l) {
    this.mappingStore.push({
      mapping: this.selectedSM,
      mapping2: this.selectedFMM,
      line: l
    });
  }

  isMapped() {
    this.mapped = !!this.selectedSM && !!this.selectedFMM;
    return this.mapped;
  }

  doSomething2(clickedEl: HTMLElement) {
    console.log('dosomething2');
    this.currentClickFMM = clickedEl.id;
    this.currentClickSM = undefined;

    if (this.wasRedraw) {
      this.globalLine.setOptions({ dash: false });
      this.wasRedraw = false;
    }
    if (this.mapped) {
      this.selectedSM = undefined;
      this.selectedFMM = undefined;
      this.mapped = false;
    }


    if (this.selectionWasMapped2(this.currentClickFMM)) {
      let l = this.mappingStore[this.mappedIndex].line;
      l.setOptions({ dash: { animation: true } });
      this.wasRedraw = true;
      this.globalLine = l;
    } else if (this.selectedFMM === this.currentClickFMM) {
      this.currentClickFMM = '';

      this.selectedFMM = '';
    } else {
      this.selectedFMM = this.currentClickFMM;
    }

    if (this.isMapped()) {
      //save
      //mark mapped
      let l = this.leader(this.selectedSM, this.selectedFMM);

      this.mappedStandardMetrics[this.selectedSM] = true;
      this.mappedFinancialModelMetrics[this.selectedFMM] = true;

      this.save(l);
    }
  }




  createAry() {
    for (let i = 0; i < 10; i++) {
      this.mapping.push({ id: i });
      this.mapping2.push({ id: i })
    }
  }
}
