import { addIcons } from 'ionicons';
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
import { BusinessAdvert, User } from 'src/app/interfaces/interfaces';
import { BusinessAdvertsService } from 'src/app/services/business-adverts.service';
import { CommonModule } from '@angular/common';



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

  CommonModule  ],
  standalone: true,
  providers: [BusinessAdvertsService]
})
export class BusinessAdvertComponent implements OnInit {
  aiInput: string = '';
  aiOutput: string = '';
  loading: boolean = false;

  adImage: string= "";
  croppedImage: any = '';
  imageChangedEvent: any = '';
  adDescription : string = "";
  eventId : number = 0;
  businessID : number = 0;

  isModalOpen = false;
  isCreditsModalOpen = false;
  editingAdvert = false;
  allBusinessAdverts : BusinessAdvert[] =[];
  currentAdvert! : BusinessAdvert;
  credits: number = 0;


  constructor(private adsService: BusinessAdvertsService) {}

  ngOnInit() {
    this.getUser();
    const input = document.getElementById('upload') as HTMLInputElement;
    const filewrapper = document.getElementById('filewrapper') as HTMLElement;

    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const fileName = target.files![0].name;
      const filetype = target.value.split('.').pop()!;
      this.fileshow(fileName, filetype, filewrapper);
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeCreditsModal(){
    this.isCreditsModalOpen = false;
  }

  openModal(){
    this.isModalOpen = true;
    this.getBusinessAdverts()

  }

  openCreditsModal(){
    this.isCreditsModalOpen = true;
  }

  createCheckout(){

  }

  getUser () {
    const userString = localStorage.getItem('user') ?? "";
    const user : User = JSON.parse(userString) ?? '';
    this.businessID = user.id ?? 0
  }





  onSelectEvent(){

  }

  createAdvert (){
    console.log("Button clicked");
    if (this.adImage == null){
      return;
    }

    const advert : BusinessAdvert = {
      id : 0,
      business_ID: this.businessID,
      image_File: this.adImage,
      description : this.aiOutput ?? this.adDescription ?? "",
      event_ID: this.eventId
    }

    this.adsService.postAd(advert).subscribe((advert) => {
      console.log( "Advert response: ", advert)

      // this.adsService.createPayment(100).subscribe((Response) => {
      //   console.log("Payment response: ", Response)
      //   //window.location.href = Response.PaymentUrl;
      // } , (error) => {
      //   console.log("Cant create payment: ", error)
      // })

    }, (error) => {
      console.log("Error while uploading advert: ", error)
    })


  }

  creditsCheckout() {
  if (this.credits === 0) {
    return;
  }

  // Save credits to localStorage
  localStorage.setItem('credits', this.credits.toString());

  this.adsService.getGUID().subscribe((guidResponse: any) => {
    localStorage.setItem("YocoGUID", guidResponse);
    this.adsService.createCheckoutWithGUID(this.credits, guidResponse).subscribe((paymentResponse: any) => {
      console.log("Yoco redirect Url: ", paymentResponse.redirectUrl)
      window.location.href = paymentResponse.redirectUrl;
    });
  });
}

  getBusinessAdverts(){
    const BusinessAdvert = this.businessID;

    this.adsService.getAllAdverts(BusinessAdvert).subscribe((businessAds) => {
      this.allBusinessAdverts = businessAds;
    })
  }

  onAdvertClick(advert: BusinessAdvert){
    this.currentAdvert =advert;
    this.adDescription = advert.description;
    this.adImage = advert.image_File;
    this.closeModal();
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.adImage = e.target.result; // You can use this to display the image or upload it
        console.log(this.adImage); // This is a base64 string representation of the image
      };

      reader.readAsDataURL(file); // Converts the file to a base64 string
    }
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
