import { Router } from '@angular/router';
import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private renderer: Renderer2,
    private router: Router,
    ) {

  }
}
