import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as includes from 'lodash.includes';
import * as findLastIndex from 'lodash.findlastindex';
import * as findIndex from 'lodash.findindex';
import { BACKSPACE, DELETE, LEFT_ARROW, overWriteCharAtPos, RIGHT_ARROW, SPECIAL_CHARACTERS, TAB } from './mask.utils';
import { getDigitValidator, maskDigitValidators } from './digit-validator';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {

  @Input('au-mask') mask = '';

  input: HTMLInputElement;
  fullFieldSelected = false;

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  ngOnInit(): void {
    this.input.value = this.buildPlaceholder();
  }

  buildPlaceholder(): string {
    const chars = this.mask.split('');

    return chars.reduce((result, char) => {
      const inc = includes(SPECIAL_CHARACTERS, char);
      return result += inc ? char : '_';
    }, '');
  }

  @HostListener('select', ['$event'])
  onSelect($event) {
    this.fullFieldSelected = this.input.selectionStart == 0 && this.input.selectionEnd == this.input.value.length;

  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  onKeyDown($event: KeyboardEvent, keyCode) {
    if ($event.metaKey || $event.ctrlKey) {
      return;
    }

    if (keyCode !== TAB) {
      $event.preventDefault();
    }

    const key = String.fromCharCode(keyCode);
    const cursorPos = this.input.selectionStart;

    if (this.fullFieldSelected) {
      this.input.value = this.buildPlaceholder();
      const firstPlaceholderPpos = findIndex(this.input.value, char => char === '_');
      this.input.setSelectionRange(firstPlaceholderPpos, firstPlaceholderPpos);
    }

    switch (keyCode) {
      case LEFT_ARROW:
        this.handleLeftArrow(cursorPos);
        return;
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);
        return;
      case BACKSPACE:
        this.handleBackspace(cursorPos);
        return;
      case DELETE:
        this.handleDelete(cursorPos);
        return;
    }
    const maskDigit = this.mask.charAt(cursorPos);
    const digitValidator = getDigitValidator(maskDigit);
    if (digitValidator(key)) {
      overWriteCharAtPos(this.input, cursorPos, key);
      this.handleRightArrow(cursorPos);
    }
  }

  handleDelete(cursorPos: number) {
    overWriteCharAtPos(this.input, cursorPos, '_');
    this.input.setSelectionRange(cursorPos, cursorPos);
  }

  handleBackspace(cursorPos: number) {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);
    if (previousPos >= 0) {
      overWriteCharAtPos(this.input, cursorPos, '_');
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }



  private handleLeftArrow(cursorPos: number) {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);
    if (previousPos >= 0) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  private handleRightArrow(cursorPos: number) {
    const nextPos = this.calculateNextCursorPos(cursorPos);
    if (nextPos >= 0) {
      const newCursorPos = cursorPos + nextPos + 1;
      this.input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  private calculateNextCursorPos(cursorPos: number) {
    const valueAftereCursor = this.input.value.slice(cursorPos + 1);

    const nextPos = findIndex(valueAftereCursor, char => !includes(SPECIAL_CHARACTERS, char));
    return nextPos;
  }

  private calculatePreviousCursorPos(cursorPos: number) {
    const valueBeforeCursor = this.input.value.slice(0, cursorPos);

    const previousPos = findLastIndex(valueBeforeCursor, char => !includes(SPECIAL_CHARACTERS, char));
    return previousPos;
  }
}
