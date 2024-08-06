import {
  IonGrid,
  IonCol,
  IonRow,
  IonContent,
  IonButton,
  IonIcon,
  IonTextarea,
  IonItem,
  IonLabel,
  IonLoading
} from '@ionic/angular/standalone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-business-advert',
  templateUrl: './business-advert.component.html',
  styleUrls: ['./business-advert.component.scss'],
  imports: [
    IonGrid,
    IonCol,
    IonRow,
    IonContent,
    IonButton,
    IonIcon,
    IonTextarea,
    IonItem,
    IonLabel,
    FormsModule,
    ReactiveFormsModule,
    IonLoading,
  ],
  standalone: true,
})
export class BusinessAdvertComponent implements OnInit {
  aiInput: string = '';
  aiOutput: string = '';
  loading: boolean = false;

  constructor() {}

  ngOnInit() {
    const input = document.getElementById('upload') as HTMLInputElement;
    const filewrapper = document.getElementById('filewrapper') as HTMLElement;

    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fileName = target.files![0].name;
      const filetype = target.value.split('.').pop()!;
      this.fileshow(fileName, filetype, filewrapper);
    });
  }

  async generateContent() {
    this.loading = true; // Start loading
    const genAi = new GoogleGenerativeAI(
      'AIzaSyDlTzxScTdj6Iviv44Vi_A-0XWbmATuZXE'
    );
    const model = await genAi.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });

    try {
      const response = await model.generateContent(this.aiInput);
      this.aiOutput = response.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      this.aiOutput = 'Error generating content';
    } finally {
      this.loading = false; // Stop loading
    }
  }

  public fileshow(
    fileName: string,
    filetype: string,
    filewrapper: HTMLElement
  ) {
    const showfileboxElem = document.createElement('div');
    showfileboxElem.classList.add('showfilebox');
    showfileboxElem.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 10px 15px;
    box-shadow: #000000 0px 0px 0px 1px inset;
    border: 1px solid #ffffff;
    background-color: #000000;
  `;

    const leftElem = document.createElement('div');
    leftElem.classList.add('left');
    leftElem.style.cssText = `
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  `;

    const fileTypeElem = document.createElement('span');
    fileTypeElem.classList.add('filetype');
    fileTypeElem.innerHTML = filetype;
    fileTypeElem.style.cssText = `
    background: white;
    color: black;
    padding: 5px 15px;
    font-size: 20px;
    text-transform: capitalize;
    font-weight: 700;
    border-radius: 3px;
  `;
    leftElem.append(fileTypeElem);

    const filetitleElem = document.createElement('h3');
    filetitleElem.innerHTML = fileName;
    filetitleElem.style.cssText = `
    font-weight: 600;
    font-size: 18px;
    color: gray;
    margin: 0;
  `;
    leftElem.append(filetitleElem);

    showfileboxElem.append(leftElem);

    const rightElem = document.createElement('div');
    rightElem.classList.add('right');

    const crossElem = document.createElement('span');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash-o');
    trashIcon.style.fontSize = '24px';
    crossElem.appendChild(trashIcon);

    rightElem.append(crossElem);
    showfileboxElem.append(rightElem);

    filewrapper.append(showfileboxElem);

    crossElem.addEventListener('click', () => {
      filewrapper.removeChild(showfileboxElem);
    });
  }
}
