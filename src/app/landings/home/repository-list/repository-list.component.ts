import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

  public page: number = 1;
  public repositories: any[] = [];
  public status = { loading: true, error: false, filtered: false, starred: false };
  public viewRepo: Subject<any> = new Subject<any>();

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.getListOfRepositories();
  }

  /**
   * Method to get the user's repositories
   * @param page Page list
   * @param searchEvent Param of search
   */
  public getListOfRepositories(page = 1, searchEvent?: string): void {
    this.page = page;
    this.status.filtered = !!searchEvent;
    this.status.starred = false;
    let uri = environment.API_ENDPOINT + `/repo?page=${page}`;
    if (searchEvent) {
      uri += `&q=${searchEvent}`;
    }
    this.getData(uri).then(res => {
      if (searchEvent) {
        this.repositories = res?.data?.items || [];
      } else {
        this.repositories = res?.data || [];
      }
    });
  }

  /**
   * Method to get the user's favorite repositories
   */
  public getListOfRepositoriesStarred(): void {
    this.status.filtered = true;
    this.status.starred = true;
    const uri = environment.API_ENDPOINT + `/repo?starred=true`;
    this.getData(uri).then(res => {
      if (res) {
        this.repositories = res?.data || [];
      }
    });
  }

  /**
   * 
   * @param uri Endpoint with params
   * @returns Promise with the repositories
   */
  private getData(uri: string): Promise<any> {
    this.status.loading = true;
    const access = this.session.getAccessCode();
    return axios.get(uri + `&access_token=${access.access_token}&token_type=${access.token_type}`)
      .then(res => {
        this.status.loading = false;
        if (res.data.error) {
          this.status.error = true;
          return undefined;
        } else {
          return res;
        }
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
      });
  }

  /**
   * Helper
   * @returns User logged status
   */
  public isLogged(): boolean {
    return this.session.isLogged();
  }
}
