import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../Article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  imports:[
    CommonModule,
  ],
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  articles: Article[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  errorMessage!: string;

  constructor(private http: HttpClient, private articleService: ArticleService) {
    
  }

  ngOnInit(){
    this.getArticles();
  }

  getArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        console.log(articles);
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }

  save() {

  }
}
