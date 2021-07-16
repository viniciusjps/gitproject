import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Method for sending an update event with the search param
   * @param value Value for search
   */
  public searchRepositories(value: string): void {
    this.searchEvent.emit(value);
  }

}
