import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-view-repo',
  templateUrl: './view-repo.component.html',
  styleUrls: ['./view-repo.component.scss']
})
export class ViewRepoComponent implements OnInit {

  @Input() open: Observable<any> = new Observable<any>();
  public status = { opened: false, duplicated: false, error: false, loading: false, updating: false };
  public repo: any = { tags: [] };

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.open.subscribe((repo) => {
      this.status.opened = true;
      if (repo) {
        this.repo = repo;
        this.getRepoData(repo.id);
      }
    });
  }

  private getRepoData(nodeId: string): void {
    this.status.loading = true;
    const access = this.session.getAccessCode();
    const owner = this.session.getUserData().id;
    let uri = environment.API_ENDPOINT + `/repo/${nodeId}?&owner=${owner}`;
    axios.get(uri)
      .then(res => {
        this.status.loading = false;
        if (res.data.error) {
          this.status.error = true;
        } else {
          this.repo.tags = res.data?.tags || [];
        }
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
      });
  }

  public addTag(value: string): void {
    value = value.toLowerCase();
    if (!this.repo.tags.includes(value)) {
      this.status.duplicated = false;
      if (value.trim().length > 0) {
        this.repo.tags.push(value);
      }
    } else {
      this.status.duplicated = true;
    }
  }

  public removeTag(index: number): void {
    this.repo.tags.splice(index, 1);
  }

  public closeModal(): void {
    this.status = { opened: false, duplicated: false, error: false, loading: false, updating: false };
    this.repo = undefined;
  }

  public updateRepo(): void {
    if (!this.status.updating) {
      this.status.updating = true;
      this.status.error = false;
      let uri = `${environment.API_ENDPOINT}/repo/update`;
      const payload = {
        git_node_id: this.repo.id,
        tags: this.repo.tags,
        user: this.session.getUserData().id,
        github_data: this.repo,
      };
      axios.post(uri, payload)
        .then(res => {
          this.status.updating = false;
          this.closeModal();
        }).catch(err => {
          this.status.updating = false;
          this.status.error = true;
        });
    }
  }
}
