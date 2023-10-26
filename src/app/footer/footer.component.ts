import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() {
  }

  public copywrite = 'AVSJ © 2023. Todos os direitos reservados.';

  public currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
  }

}
