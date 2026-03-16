import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordHeader } from './components/word-header/word-header';
import { Wordle } from "./components/wordle/wordle";
import { WordContent } from './components/word-content/word-content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordHeader, WordContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ProductiveGames');
}
