import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string =  ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == this.resposta) {
        alert('ACERTOOOOOOU !')

        //trocar pergunta da rodada  
        this.rodada++

        //progresso
        this.progresso = this.progresso + (100 / this.frases.length)

        //
        if(this.rodada === 4){
          alert("GANHOOOOOU !!!")
          this.encerrarJogo.emit('vitoria')
        }

        //atualiza o objeto rodadaFrase
        this.atualizaRodada()

    }else{
      alert('ERROOOOOOU !')

      //diminuir a variavel tentativas
      this.tentativas--

      if(this.tentativas === -1){
        alert('GAME OVER !!!')
        this.encerrarJogo.emit('derrota')
      }
    }

  }

  
  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}
