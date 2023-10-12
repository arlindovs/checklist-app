import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  public copywrite = 'Arlindo © 2023. Todos os direitos reservados.';

  ngOnInit(): void {
  }

}
