import React, { Component } from 'react';
import './ModeloMMS.css'

const miu = 0;
const lamda = 0;
const servidores = 0;
const p = 0;
const p0 = 0;
const n = 0;
const pn = 0;
const lq = 0;
const l = 0;
const wq = 0;
const w = 0;
const cw = 0;
const cs = 0;
const ct = 0;
class ModeloMMS extends Component {

  constructor(props){
    super(props);
    this.state = { miu, lamda, servidores, p, p0, lq, l, wq, w, pn, n, cw, cs, ct }
    this.handleMiuChange = this.handleMiuChange.bind(this);
    this.handleLamdaChange = this.handleLamdaChange.bind(this);
    this.handleServidoresChange = this.handleServidoresChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleCWChange = this.handleCWChange.bind(this);
    this.handleCSChange = this.handleCSChange.bind(this);
    this.calcularP = this.calcularP.bind(this);
    this.calcularP0 = this.calcularP0.bind(this);
    this.factorial = this.factorial.bind(this);
    this.calcularLQ = this.calcularLQ.bind(this);
    this.calcularL = this.calcularL.bind(this);
    this.calcularWQ = this.calcularWQ.bind(this);
    this.calcularW = this.calcularW.bind(this);
    this.calcularPn = this.calcularPn.bind(this);
    this.calcularCT = this.calcularCT.bind(this);
  }

  factorial(n){
    let res = 1;
    while(n > 0){
      res = res * n;
      n = n-1;
    }
    return res;
  }

  calcularP(){
    const lamda = this.state.lamda;
    const miu = this.state.miu;
    const servidores = this.state.servidores;
    let resultado;
    resultado = lamda / (servidores*miu);
    this.setState({ p: resultado.toFixed(5) })
  }

  calcularP0(){
    const lamda = this.state.lamda;
    const miu = this.state.miu;
    const servidores = this.state.servidores;
    let sumatoria = 0;
    let multiplicacion = 0;
    let p0;
    for(let i = 0; i < servidores; i++){
      sumatoria = sumatoria + (Math.pow(lamda/miu,i)/this.factorial(i))
    }
    let factor1 = (Math.pow(lamda/miu,servidores)/this.factorial(servidores))
    let factor2 = (servidores*miu)/(servidores*miu-lamda)
    multiplicacion = factor1*factor2;
    p0 = 1/(sumatoria + multiplicacion)
    this.setState({ p0: p0.toFixed(5) })
    return p0;
  }

  handleMiuChange( evt ){
    if(Number(evt.target.value) < 0){
      this.setState({ miu: 0 }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }else{
      this.setState({ miu: evt.target.value }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }
  }
  handleLamdaChange( evt ){
    if(Number(evt.target.value) < 0){
      this.setState({ lamda: 0 }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }else{
      this.setState({ lamda: evt.target.value }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }
  }
  handleServidoresChange( evt ){
    if(Number(evt.target.value) < 0){
      this.setState({ servidores: 0 }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }else{
      this.setState({ servidores: evt.target.value }, () => {
        this.calcularP();
        this.calcularP0();
        this.calcularLQ();
        this.calcularL();
        this.calcularWQ();
        this.calcularW();
        this.calcularPn();
        this.calcularCT();
      });
    }
  }
  handleNChange( evt ){
    if(Number(evt.target.value < 0)){
      this.setState({ n: 0 }, () => {
        this.calcularPn();
      });
    }else{
      this.setState({ n: evt.target.value }, () => {
        this.calcularPn();
      });
    }
  }
  handleCWChange (evt) {
    if(Number(evt.target.value < 0)){
      this.setState({ cw: 0 }, () => {
        this.calcularCT();
      });
    }else{
      this.setState({ cw: evt.target.value }, () => {
        this.calcularCT();
      });
    }
  }
  handleCSChange (evt) {
    if(Number(evt.target.value < 0)){
      this.setState({ cs: 0 }, () => {
        this.calcularCT();
      });
    }else{
      this.setState({ cs: evt.target.value }, () => {
        this.calcularCT();
      });
    }
  }

  calcularLQ(){
    const lamda = this.state.lamda;
    const miu = this.state.miu;
    const servidores = this.state.servidores;
    const p0 = this.calcularP0();
    let numerador = 0;
    let denominador = 0;
    let resultado = 0;
    numerador = Math.pow(lamda/miu,servidores)*lamda*miu*p0;
    denominador = this.factorial(servidores-1)*Math.pow(servidores*miu-lamda,2);
    resultado = numerador/denominador;
    this.setState({ lq: resultado.toFixed(5) })
    return resultado;
  }
  calcularL(){
    const lamda = this.state.lamda;
    const miu = this.state.miu;
    const lq = this.calcularLQ();
    let resultado = lq + (lamda/miu);
    this.setState({ l: resultado.toFixed(5) })
  }
  calcularWQ(){
    const lamda = this.state.lamda;
    const lq = this.calcularLQ();
    let resultado = lq / lamda;
    this.setState({ wq: resultado.toFixed(5) })
    return resultado;
  }
  calcularW(){
    const miu = this.state.miu;
    const wq = this.calcularWQ();
    let resultado = wq + (1/miu);
    this.setState({ w: resultado.toFixed(5) })
  }
  calcularPn(){
    const lamda = this.state.lamda;
    const miu = this.state.miu;
    const servidores = this.state.servidores;
    const p0 = this.calcularP0();
    const n = this.state.n;
    let resultado;
    if(n <= servidores){
      resultado = (Math.pow(lamda/miu,n)/this.factorial(n))*p0;
    }else{
      resultado = (Math.pow(lamda/miu,n)/(this.factorial(servidores)*Math.pow(servidores,n-servidores)))*p0;
    }
    this.setState({ pn: resultado.toFixed(5) })
  }
  calcularCT(){
    const lq = this.calcularLQ();
    const cw = this.state.cw;
    const cs = this.state.cs;
    const servidores = this.state.servidores;
    let resultado;
    resultado = (Number(lq) * Number(cw)) + (Number(servidores) * Number(cs));
    this.setState({ ct: resultado.toFixed(5) })
  }

  render() {
    return (
      <div className="col-md-3 card" >
        <div className="card-body">
          <h3 className="text-center">Modelo M/M/s</h3>
          <form>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">Taza Media de Llegada (λ)</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" id="example-text-input" onChange={this.handleLamdaChange} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">Taza Media de Servicio (μ)</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" id="example-text-input" onChange={this.handleMiuChange} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">Número de Servidores (s)</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" id="example-text-input" onChange={this.handleServidoresChange} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">N para Pn</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" id="example-text-input" onChange={this.handleNChange} />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">Costo por Tiempo de Espera (cw)</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" max="100" onChange={this.handleCWChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-md-7 col-form-label">Costo del Servicio (cs)</label>
              <div className="col-md-5">
                <input className="form-control" type="number" min="1" max="100" onChange={this.handleCSChange}/>
              </div>
            </div>
          </form>
          { Number(this.state.lamda) >= (Number(this.state.miu)*Number(this.state.servidores)) ?
            <div class="alert alert-danger" role="alert">
              Sistema no estable
            </div> :
              <ul className="list-group">
                <li className="list-group-item active text-center">Resultados</li>
                <li className="list-group-item">Factor de Utilización (Ρ): <strong>{ this.state.p }</strong></li>
                <li className="list-group-item">Probabilidad 0 Clientes en la Sistema (P0): <strong>{ this.state.p0 }</strong></li>
                <li className="list-group-item">Promedio Clientes en la Cola (LQ): <strong>{ this.state.lq }</strong></li>
                <li className="list-group-item">Promedio Clientes en el Sistema (L): <strong>{ this.state.l }</strong></li>
                <li className="list-group-item">Tiempo Esperado en la Cola (WQ): <strong>{ this.state.wq }</strong></li>
                <li className="list-group-item">Tiempo Esperado en el Sistema (W); <strong>{ this.state.w }</strong></li>
                <li className="list-group-item">Probabilidad (Pn); <strong>{ this.state.pn }</strong></li>
                <li className="list-group-item">Costo Total Esperado (CT): <strong>{ this.state.ct }</strong></li>
              </ul>
            }
        </div>
      </div>
    );
  }
}

export default ModeloMMS;
