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
  isLoading = true;
  isUpdateFormActive = false;
  errorMessage!: string;

  constructor(private http: HttpClient, private articleService: ArticleService) {
    
  }

  ngOnInit(){
    this.getArticles();
  }

  getArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = Array.isArray(data[0]) ? data[0] : data;
        this.isLoading = false;
        console.log(this.articles);
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  save() {

  }

  trackById(index: number, article: any): number {
    return article.id;
  }

  updateArticle(article: any): void {
    console.log('Updating:', article);
    // Your update logic
  }

  deleteArticle(article: any): void {
    console.log('Deleting:', article);
    // Your delete logic
  }
}
