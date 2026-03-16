import { Component, inject, computed, signal, HostListener, OnInit } from '@angular/core';
import { WordleService } from '../../services/wordle.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-wordle',
  imports: [FormsModule],
  templateUrl: './wordle.html',
  styleUrl: './wordle.scss',
})
export class Wordle implements OnInit {
  private readonly wordleService = inject(WordleService);
  
  protected readonly answer = signal<string>('Loading...');
  protected guess = signal<string>('');
  protected guesses = signal<string[]>([]);

  // @HostListener('click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   console.log('Left click event fired', event);
  // }
  constructor() {
    this.wordleService.getWordle().subscribe((response: any) => {
      this.answer.set(response.answer.toLowerCase());
    });
  }

  ngOnInit() {
  }

  checkGuess() {
    this.guess.update((current) => current.toLowerCase());
    this.wordleService.isValidWord(this.guess()).subscribe({
      next: () => {
        this.guesses.update((current) => [...current, this.highlightLetters(this.guess())]);
        this.guess.set('');
      },
      error: () => alert('Sorry, that is not a valid word. Please try again.'),
    });
  }

  highlightLetters(guess: string) {
    const answer = this.answer();
    if (!answer) return 'none';
    return guess.split('').map((letter, index) => {
      if (letter === answer[index]) {
        return `${letter} is correct.`;
      } else if (answer.includes(letter)) {
        return `${letter} exists in the word.`;
      } else {
        return `${letter} does not exist in the word.`;
      }
    }).join(' '); 
  }
}
