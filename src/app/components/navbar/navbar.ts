import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-navbar',
  imports: [Button, Popover],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
