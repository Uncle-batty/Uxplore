import { UsersService } from 'src/app/services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { locationOutline,star, bookmark, shareSocial  } from 'ionicons/icons';
import { Event } from 'src/Models/event-card';
import { UserInteraction, User } from '../interfaces/interfaces';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  imports: [IonGrid, IonCol, IonRow, IonIcon, IonCard, IonCardHeader, IonApp, IonRouterOutlet,CommonModule, IonCardTitle, IonCardSubtitle, IonCardContent, FormsModule, HttpClientModule],
  providers: [UsersService]
})
export class EventCardComponent  implements OnInit {

  @Input() bgColor : string = "#00ff11";
  @Input() boxShadow : string = "";
  @Input() shareVisible: boolean = true;
   @Input() event: Event = {
    Id: 0,
    Name: '',
    Location: '',
    PriceRange: '',
    Times: '',
    Rating: '0',
    SafetyRating: '',
    ImageData: ''
  };



  constructor(private userService: UsersService) {
    addIcons({locationOutline, star, bookmark, shareSocial})
  }

  ngOnInit() {
    this.boxShadow = `10px 10px 5px ${this.bgColor + 60}`
    if (this.event.ImageData == ''){
      this.event.ImageData = this.getDefaultImage();
    }
  }

  getStars(): number[] {
    return Array.from({ length: parseInt(this.event.Rating, 10) }, (_, index) => index + 1);
  }

   addToSaved(){
    const userString = localStorage.getItem('user') ?? "";
    const user = JSON.parse(userString)
    let currentDate = new Date(Date.now()).toLocaleDateString()
    currentDate = currentDate.replace("/","-" )
    console.log("This user: ",user.id,)
    const interaction: UserInteraction = {
      event_ID: 0,
      listing_ID: Number(this.event.Id),
      user_ID: user.id,
      interaction_Type: "Saved",
      // interaction_Date: "2024-06-12"
      interaction_Date: currentDate.replace("/","-" )
    }
    console.log("Interaction: ",interaction)

    this.userService.setInteraction(interaction).subscribe(result =>
      console.log(result)
    ),((error: any) => {
      console.log("error: ", error)
    })
  }

  getDefaultImage() : string{
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAIACAYAAAAczR65AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAADmUSURBVHgB7d1rdN3lfS/4nyzL1pYtGcvGwpKvsvCttsEKQsQKmCDAdgyxcd0Ex2QFz9hZNVPTtZgOr/O6Z9505Uw6q81MZ1bPWaez5px2SEs5lDBJO4c0aVaBhhDHXEKMb2B8CUi2hS3j0bOJCAFfdNmS9v7/P5+19voL47yIt2T27/s8z/epal297lIAAAAAmTYpAAAAgMwTAAAAAEAOCAAAAAAgBwQAAAAAkAMCAAAAAMgBAQAAAADkgAAAAAAAckAAAAAAADkgAAAAAIAcEAAAAABADggAAAAAIAcEAAAAAJADAgAAAADIAQEAAAAA5IAAAAAAAHJAAAAAAAA5IAAAAACAHBAAAAAAQA4IAAAAACAHBAAAAACQAwIAAAAAyAEBAAAAAOSAAAAAAAByQAAAAAAAOSAAAAAAgBwQAAAAAEAOCAAAAAAgBwQAAAAAkAMCAAAAAMgBAQAAAADkgAAAAAAAckAAAAAAADkgAAAAAIAcEAAAAABADggAAAAAIAcEAAAAAJADAgAAAADIAQEAAAAA5IAAAAAAAHJAAAAAAAA5IAAAAACAHBAAAAAAQA4IAAAAACAHBAAAAACQAwIAAAAAyAEBAAAAAOSAAAAAAAByQAAAAAAAOSAAAAAAgBwQAAAAAEAOCAAAAAAgBwQAAAAAkAMCAAAAAMgBAQAAAADkwOQAACCTZs+aFfMXtERdoRCzZ88q/vOHXzdGYeBZ/D0Dv345J06cLD5Pnjz14T8PPE+cPFn89fT1oUNH4uzZswFA5ahqXb3uUgAAUNHScL9sWVssmD8vli+7MWalYb+uEGPp7NlzA0HA4Xjzo9eR4j8DUJ4EAAAAFSgN/GvXrh4Y+OfH2pvXjPmwP1TF3QFvHo7nX/y3OHDgteKuAQDKgwAAAKBCLBtY2V++9MZoX7sm5g+s9FeCtCPg5wdejf/2gx/ZHQAwwQQAAABlrK6uLu7pvjO61nVe8bx+pUi7A5757v8bL7zwkp0BABNAAAAAUIbSav/W+79QfGbRgeKugB/Gcz/4UQAwPgQAAABlYnC1/567P182Z/rHWtoV8MR3nowXXnzJrQIAY0wAAAAwwfI4+H9SCgKee+7DHQGOBwCMDQEAAMAEMfh/2mAQ8MTf/n0AUFoCAACACXBP9+djyxe/YPC/gsGjAToCAEpHAAAAMI6yXu5XaikI+ON/9yeOBQCUgAAAAGAcpO3+W+7fVNzuz/A9893vDby+LwgAGAUBAADAGEur/f/9w1+N2bMbg5FzLABgdAQAAABjxKr/2Ei7Af7T//VfAoDhEQAAAIyB2bNmxeN/9IdW/ceIbgCA4RMAAACUmIb/8XH27Ll44jt/H888+70A4NqqZzbN/0YAAFASO778u8Xhv6amJhhb6c949aqVxa8PvPJqAHB1dgAAAJRAOu+/75E9rvebIAcOvBrf/NafFXcFAHB5AgAAgFFy3r886AUAuLpJAQDAiBn+y8fsWY3x+P/0h8X3BIBPEwAAAIzQgvnzDP9lZjAESO8NAL9NAAAAMAKG//JVDAH+SAgA8EkCAACAYRoc/l3zV77SeyMEAPhtAgAAgGFI58v/4JGvG/4rQHqP/uB/+LpOAIBfEwAAAAyRwr/KoxgQ4DcEAAAAQ1BXV2f4r1CDIYBdG0DeCQAAAIZg3yN7DP8VLIUA+x75egDkmQAAAOAattz/hVi27MagsqX3cMeXfzcA8koAAABwFfd0fz62fPELQTbcc/fni+8pQB4JAAAAriAVxxn+sye9p0oBgTwSAAAAXEEq/VMclz3pPVUKCOSRAAAA4DLSWXGlf9mVSgFTtwNAnggAAAA+4XPrOotnxcm29B4vV+4I5IgAAADgY9LZ8C/evznIh/9u11cdBQByQwAAAPAx99x9p63/OeIoAJAnAgAAgF9Lq/+2/uePowBAXggAAAB+LbX+k092AQB5IAAAAIgPi/9s/c+vZctujHu67f4Ask0AAAAwQPEfW774BYWAQKYJAACA3Evbv63+k4Z/HRBAlgkAAIBcS8V/XetuC0jSMQC7AICsEgAAALnW5ew/H2MXAJBlAgAAILfSsGf1n0+yCwDIKgEAAJBb7TevsfrPp9gFAGSVAAAAyC3N/1yJKwGBLBIAAAC59Dln/7mKtAtg+bIbAyBLBAAAQC45+8+1pOshAbJEAAAA5E66+m+Z1V2uIX2PKAMEskQAAADkztq1awKGQhkgkCUCAAAgdxS8MVSOigBZIgAAAHJlwfx5yv8YstmzGpUBApkhAAAAcqWrqzNgOPRFAFkhAAAAcmXZUsMcw7P25psCIAsEAABAbqT2/3QEAIZjwfyW4vcOQKUTAAAAubF8WVvASLg5AsgCAQAAkBs332yIY2Tm2zkCZIAAAADIjQXz5weMRLvwCMgAAQAAkAuu/2M06uoKegCAiicAAAByIRW5wWgsW65DAqhsAgAAIBfmL3CGm9FxgwRQ6QQAAEAuLJhneGN0li1dGgCVTAAAAOSCFndGa/YsHRJAZRMAAACZlwrc0gtGQxEgUOkEAABA5ln9p1TmL1AmCVQuAQAAkHnX27pNidhJAlQyAQAAkHmzZtu2TWk4AgBUMgEAAJB5ytsolVkCAKCCCQAAgMyzakupTCs4AgBULgEAAAAMkeMkQCUTAAAAmTfLEQBKRAkgUMkEAAAAAJADAgAAIPNm27ZNiSiUBCqZAAAAAAByQAAAAAAAOSAAAAAAgBwQAAAAAEAOCAAAAAAgBwQAAEDmnThxMqAUTpw8FQCVSgAAAAAAOSAAAAAy7+y5cwGlcNJuEqCCCQAAgMxzBAAABAAAQA6cswOAEnlHBwBQwQQAAEDmKW6jVE6etJsEqFwCAAAg85zbplROCACACiYAAAAy74wjAJTIiRN2kwCVSwAAAGTeoTePBJTCoUOHA6BSCQAAgMxL27bPnrULgNFJ30O+j4BKJgAAAHLB2W1Gy+o/UOkEAABALhx45dWA0XjzsAAAqGwCAAAgFw69aXhjdN70PQRUOAEAAJALPz/wWsBoHDqkTBKobAIAACAXFAEyGidOnoo3dQAAFU4AAADkxgsv/lvASDhCAmSBAAAAyI03beFmhJ4XHgEZIAAAAHLjhRd+EjASB3RIABkgAAAAciP1ADjHzXClnSPpeweg0gkAAIBceeFFuwAYngOvvBIAWSAAAABy5cCBVwOG47nnfhQAWSAAAABy5ecDAcCJE7ZzMzSu/wOyRAAAAOTOc/9sRZeheea73wuArBAAAAC5Y6hjqNwcAWSJAAAAyJ2zZ8/pAuCa0veI9n8gSwQAAEAuPfG3fx9wNf/tBz8MgCwRAAAAuZTKANNOALicVP733A90RQDZIgAAAHLrmWd1AXB5T3znyQDIGgEAAJBbqQzQLgA+Ka3+v/Ci8j8gewQAAEBupeHfLgA+6bkf/FAwBGSSAAAAyDW7APi44tn/55z9B7JJAAAA5JpdAHxcWv139R+QVQIAACD37AIgSav/T3zH9ZBAdgkAAIDcS8P/E39r8Ms7zf9A1gkAAADiw10ABw68GuRT8ez/D5z9B7JNAAAA8Gt2AeTXH/+7PwmArBMAAAD82s8PvKoQMIfSe674D8gDAQAAwMekErgTJ04F+ZC2/j/zzPcDIA8EAAAAH5MKAf/3/+Mvg3xIxX9W/4G8EAAAAHyCowD5kN5jxX9AnggAAAAuw1GAbEtb///TX/2XAMgTAQAAwGWkowB//D//SfFJthTfW63/QA4JAAAAriCdDXc1YPak99S5fyCPBAAAAFfxzHe/pw8gQ9Lwn95TgDwSAAAAXEM6K37gwKtBZUvvYep2AMgrAQAAwBB881t/phSwgqXSv29+688DIM8EAAAAQzBYCigEqDxp+E+lf2fPng2APBMAAAAMUSqOEwJUlsHhX+kfgAAAAGBY0iD577/1Z64HrADpPfr3/8ufGf4Bfk0AAAAwTG8eOlzcCSAEKF+DRzbSewXAhwQAAAAjMBgCOA5Qforb/g3/AJ8iAAAAGCEhQPkZPPNv+Af4NAEAAMAoKAYsHwr/AK6uqnX1uksBAMCo1NUVYt8jX49ly24Mxt+BA6/GN7/15676A7iK6plN878RAACMyoUL/fHcD340sLwSsVwIMK6eefZ78b/+2V8MvAcXAoArEwAAAJRQWok+e+5cLGldHDU1NcHYSU3///mvvxNPfOfvA4BrcwQAAGAMzJ41Kx7/oz+M2bMbg9Jz3h9g+AQAAABjaMeDvxv3dH8+KJ205f+J7zzlvD/AMAkAAADG2OfWdcYX799sN8AopVX//+0v/rJ4zAKA4RMAAACMg3Qk4J577rQbYISs+gOMngAAoMI0zpwZjY3pdV3UFQpRqK2NQiG9Ch/9nnPnzg28+opfnzx9Ok6d+lXx144cPRbAxNINMDxptf//+du/t+oPUAICAIAy1tI8N25say0+W1rmFof/NOyPRgoBUiDw2uu/iMNHjhWfwPhzLODqUsP/EwOD/zPf/V4AUBoCAIAykob7zo7PxOpVK4tD/2iH/aF67fU34qWf/ix+MvA6dep0AONnyxe/EF2fvU0Q8Gtp8E/b/Z/57vdt9wcoMQEAwAT7+NDftmRxTLQUAPzj//cDYQCMo3QsoKurM9dBgMEfYOwJAAAmSNuS1rjzjq7i0D9eK/3DlXYG/MuP/zV+9OPnAxh7dXV10X7z6lwdDTD4A4wfAQDAOEuD/6YN3WWx2j9UaSfAf/2HZwUBMI5SR0DXutti2bIbI4uU+wGMPwEAwDipxMH/kwQBMP7S8YC1a1fHPd13VfyugBMnTsZz//wjq/0AE0QAADDG0pV9Ox/cXtGD/yelIOBvnniy2BMAjJ/58+cVdwYsX3Zj8etKcOjQ4Xj+xZ/EzwdW+q32A0wsAQDAGEnn+tMZ/433dkdW/cuPn4+n/uFZZYEwAdLOgOXL2mLtzTcVw4By2R2QzvS/MDDwv3noULzwwktx4uTJAKA8CAAAxkDa7r/zwd8trv5nnWMBUB5SCLBwfkvxuWDglZ51dYUYS2nYPzkw4KfV/TcHVvoPHHjNwA9QxgQAACWWzvlnedX/StJugL9+4u/i3Lm+AMpDulVg/kAoMHtWY8yePau4ayB9ncz69TP9+uWk8/rJuXPnBr4+FWfTc2C4T7+evj705hHDPkCFEQAAlEgWz/oPV9oN8M0//bYjAQAAZah6ZtP8bwQAo9LS0hx79zw88JwbeVYoFKKz4zPx9vF34vjACwCA8iEAABilzo72+NpDD0ZDQ30QUVMzOdrXromqqojXXn8jAAAoD5MDgBFLLf8PbNkcfNpgD8JTTz8bAABMPAEAwAjltexvOIQAAADlY1IAMGyG/6FLf06pHBEAgInlFgCAYdq5Y3vcekt7MDxHjh6Lb37rz10TCAAwQQQAAENUKNTGvr27i43/jIxrAgEAJo4jAABD0Ng4Mx5/bJ/hf5TSn2MKUdITAIDxJQAAuAZDa2kN/nm2NM8NAADGT/XMpvnfCAAuK634793zsOG/xAqFQrSvvSnePv5OHB94AQAw9gQAAFfQtqS1OPw3NNQHpVdTM3kgBFgTfX198cuDhwIAgLElAAC4jM6O9ti966HikMrYWrF8aVRVRbz2+hsBAMDY8ckW4BM2begu3l3P+Bn8837q6WcDAICxoQQQ4GMM/xMn/blv23JfAAAwNqpaV6+7FADEzh3b49Zb2oOJlY4CfPsv/jLOnesLAABKRwAA5F6hUBu7d3012pYsDsrDqVOn45t/+u3iEwCA0nAEAMi1wTvpDf/lZfB9cf0iAEDpCACA3BocMltamoPyIwQAACgtAQCQS2noN1yWv/T+PP7YvmhpnhsAAIxO9cym+d8IgBwZHP4bGuqD8ldTMzm61nXGqdOn48jRYwEAwMgIAIBc6exoj9/f83BxqKSyrFm1MqqqPrwlAACA4fMJGMiNTRu6i3fNU7kG37+nnn42AAAYHh0AQC4Y/rMjvY/bttwXAAAMjyMAQOZt27o57r5rfZAdixbOj3ktzbH/wCvR398fAABcmx0AQGYVCrWxc8f2WH97V5A9q1etiH2P7HGTAwDAEAkAgExKw39q+r/1lvYgu9L1gK5zBAAYGgEAkDkf3R3f0hxkX3q/hQAAANcmAAAyxTCYTx+FPs1zAwCAy1MCCGRGWvF/7NG90dBQH+RPTc3k6FrXGadOn44jR48FAAC/TQAAZEJnR3t87aEHi2f/ybc1q1ZGVVXEa6+/EQAA/MbkAKhwd97RFQ9s2RwwaOO93cXnU08/GwAAfEgAAFS0TRu6Pxr24OOEAAAAv80RAKBibdu6Oe6+a33AlbQtaY1ZjTPjtdd/Ef39/QEAkGduAQAq0s4d22P97V0B13JrR3vse2SPmyEAgNwTAAAVJZX8Pf7YH8Stt7QHDFW6HtD1kABA3gkAgIrx0V3vLc0Bw5W+f4QAAECeCQCAimB4oxQGv4/SjgAAgLxRAgiUvbTiv3fPw4Z/SqJQKET72pvi7ePvxPGBFwBAXggAgLKWWtzT8N/QUB9QKjU1kwdCgDXR19cXvzx4KAAA8kAAAJStzo722L3roeKwBmNhxfKlUVUV8drrbwQAQNb5VA2UpU0bumPjvd0BY23w++ypp58NAIAsUwIIlB3DP+Mtfb/tfHB7AABkWVXr6nWXAqBM7NyxPW69pT1gIhw5eiy++a0/j3Pn+gIAIGvsAADKQqFQG/se2WP4Z0Kl6wEff2yfGycAgEwSAAATbvBu9rYliwMm2uD3oxAAAMgaAQAwoQaHrZaW5oBy8dH3ZfPcAADICtcAAhMmDf179zxspZWyVCgUon3tTfH28Xfi+MALAKDSCQCACdG2pLU4/Dc01AeUq5qayQMhwJro6+uLXx48FAAAlUwAAIy7zo722L3roeJwBZVgxfKlUVUV8drrbwQAQKXy6RsYV5s2dBfvXIdKM/h9+9TTzwYAQCVSAgiMG8M/lS59/27bcl8AAFQiAQAwLrZt3Wz4JxPW37Eu9j2yJwqF2gAAqCQCAGBMpSFp547tsf72roCsaFuyOB5/bJ8bLACAiiIAAMZMGv7TXeq33tIekDVp+E/f30IAAKBSCACAMZGGorRC2tLSHJBVQgAAoJIIAICSMxSRJx+FXc1zAwCgnFXPbJr/jQAokbTi/9ije6OhoT4gL2pqJkfXus44dfp0HDl6LAAAypEAACiZzo72+NpDD2pHJ7fWrFoZVVURr73+RgAAlJvJAVACd97RFQ9s2RyQd4PXXT719LMBAFBO7AAARm3Thu64f/OGAD7UtqQ16gqF2H/glQAAKBcCAGBUtm3dHHfftT6A37Zo4fyY19JcDAH6+/sDAGCiuQUAGJF0zn/nju2x/vauAC5v9aoVse+RPW7EAADKggAAGLY0/Kdr/m69pT2Aq0vXA7oWEwAoBwIAYFg+uvO8pTmAoUk/N0IAAGCiCQCAITPEwMh9FJ41zw0AgImgBBAYkrTiv3fPw4Z/GIWamsnRta4zTp0+HUeOHgsAgPEkAACuKV1plob/hob6AEZvzaqVUVUV8drrbwQAwHiZHABX0dnRHl95cHsApbXx3u7i86mnnw0AgPEgAACuaNOG7o+GFKD00s9XobYQf/3E3wUAwFhzBAC4LMM/jI9FC+fHrMaZ8drrv4j+/v4AABgrVa2r110KgI/ZuWN73HpLewDjJ5UCfvsv/kOcOnU6AADGgmsAgY8UCrWx75E9hn+YAOl6QNdsAgBjSQAAFKWhIw0fbUsWBzAxBn8OhQAAwFgQAAAfDR0tLc0BTKyPfh6b5wYAQCkpAYScS0P/3j0PW3GEMlIoFKJ97U3x9vF34vjACwCgFAQAkGNtS1qLw39DQ30A5aWmZvJACLAm+vr64pcHDwUAwGgJACCnOjvaY/euh4pDBlC+VixfGlVVEa+9/kYAAIyGT/6QQ5s2dMfGe7sDqAyDP69PPf1sAACMlBJAyBnDP1Sm9HO788HtAQAwUgIAyJFtWzcb/qGC3drRHo//j/uiUKgNAIDhEgBADqRhYfeur8b627sCqGzpesDHH9vn5g4AYNgEAJBxafhPd4qvXrUigGxIw3/6uRYCAADDIQCADEvDQVopbGlpDiBbBkOAtCMAAGAoBACQUVYIIfuKP+eP7InVq1YGAMC1VM9smv+NADIlrfg/9ujeaGioDyDbamomR/vaNdHX1xe/PHgoAACuRAAAGdPZ0R5fe+hBLeGQMyuWL42qqojXXn8jAAAuZ3IAmXHnHV3xwJbNAeTT4DWfTz39bAAAfJIOAMiITRu6Df9AMQTY+eD2AAD4JAEAZMC2rZs/WvkDuLWjvVgO6CgQAPBxAgCoYOnD/c4d22P97V0B8HFtSxYXrwF1EwgAMEgAABUqDf/pmr9bb2kPgMtxHSgA8HECAKhA6cN8WtlL1/0BXI0QAAAYJACACuPDPDBcg6Fh25LWAADyq6p19bpLAVSEtOK/++Gdhn9gxP7jX/3n+JcfPx/AxKuvnzbw3/TGmDJlSsye1RhTp9TE9OnTi/9u8Plxvb29Hz3f6z0T598/HydPnYpTJ0/F++cvBMC1CACgQqxZtTK+8uB2rd7AqP3Xf3g2nnr62QDGTxruGweG/OYbboi5c5uKX08dGPxL5f3z54tBwNG33o5jx94aeL0dAJ8kAIAK0NnRXhz+AUpFCABjLw39N97YFosWzi/5wH8tKRB4ayAI+OXBQ8VAoKf3TAAIAKDMbdrQHRvv7Q6AUvvHf/pB/PUTfxdA6aSh/4a5N8Tq31kxsNJ/Q5SLgwffLIYBr7z6egD5JQCAMmb4B8baSz/dH//xr/7vOHeuL4CRS4P/qt9ZGb+zasW4rvQPV09vbxz85aH46cs/sysAckgAAGVq547tcest7QEw1o4cPRbf/ov/EKdOnQ5geOqnT4v29ptj6Y1LotKk3QDPP/+iIAByRAAAZSaV/O3e9dVoW7I4AMZLGv6/+affFgLAEKUV/9tuu7UiB/9PEgRAfggAoIyk6/3SNX/puj+A8SYEgGurlK3+w5WOBrz80/3x0sv7A8guAQCUiTT879u7u/gEmCipC+Cb3/rz4rEA4Lel6/vW39EV9dOnR1alIODJJ5+2GwAyqnpm0/xvBDCh0or/3j0PG/6BCVdTMzm61nXGqdOnhQDwa2nV/9ZbPhOf67otU6v+l5P+/61atTKqBr4+9tbbAWSLAAAmWNuS1uLw39BQHwDlYk0aAAYmgNdefyMgz1LJ3xe/+IWYP68l8iRdYbh06ZLi9YHnz18IIBsEADCBOjvaY/euh4orbgDlJgWUQgDyLBX83XPP56OuUIg8SrsBFi5aUDwW8O677wVQ+QQAMEE2beiOB7bcFwDlLIUAafjZf+CVgDxpX3tTfPa2jphcXR15lkKAJa2LHQmAjBAAwARIw//Ge7sDoBIsWjg/5rU0F0OA/v7+gKxbf3tXrF61IviNdCRg6tQpcfjw0QAqlwAAxtm2rZvj7rvWB0AlaZpzfaxYvnQgBHi1eFMAZFEq+9uSw/P+QzVn4O+BFAgePnxELwBUKAEAjJNCoTYe/uqOuLWjPQAqUUN9fbEcMN0TLgQga9Lwv3nzhpjV2BhcWV1dodgLoBwQKpMAAMZBut4vNf23tbUGQCUrFApCADLH8D88qRdg6dK2gb8DzsXJU6cDqBwCABhjafjft3d3NDXNCYAsGAwB0u0APT29AZXM8D8y1dXVsWjhAuWAUGEEADCGBof/9ATIkhQCpJb093p64sjRYwGVyPA/eoPlgMePn4iLFy8GUN4EADBGWlqa47FH90ZDQ30AZFFNzeTiToCqgSXAtBsAKonhv3RSOeCSJYv0AkAFEADAGOjsaI+vPfRgsfgPIOvalrQKAagohv/SS70AygGh/AkAoMTuvKMrvrR9a3FlDCAvhABUkrs+vz6a594QlNZgOeAHFy/G8XdOBFB+BABQQps2dMf9AysKAHmUQoBZjTPjpZ/+LKBcrb+9q7hdnbGRygHnzWtRDghlSgAAJbJt6+a4+671AZBnLS1zY83qlfH8iz+J/v7+gHKShv+lS5cEY085IJQnAQCMUjrn/+Xf2xpdn+0MACIa6uuj/eY18dLL++Pcub6AcmD4H3/KAaH8CABgFNLwn675W7F8aQDwG+mawHRDgBCAcmD4nziD5YDH3nrL3wVQBgQAMEKNjTOL1/w1Nc0JAD5tMARIxYA9Pb0BE8HwP/FSCLBi+bK4cP68ckCYYAIAGIE0/KeV//QE4MpSCNC+9qZ4+/g7cXzgBePJ8F9elAPCxBMAwDC1tDTH3j0PG/4Bhihdi9q+dk309fXFLw8eChgPhv/ylMoBZ8+aGYcOH1UOCBNAAADDkLay7t71UDQ01AcAw5P6UqoGlv/SkQAYS4b/8nbddTOUA8IEEQDAEN15R1d85cHtxZUsAEambUmrEIAxZfivDMoBYWIIAGAINm3ojvs3bwgARi+FALMaZ8ZLP/1ZQCl9trMjVqxwM0+lUA4I408AANeQhv+N93YHAKXT0jI31qxeGc+/+JPo7+8PGK1UNnnzTauCyqMcEMaPAACuYueO7cWthACUXkN9fbTfvCZeenm/LcCMShr+P9N+U1C5lAPC+BAAwGUUCrWx9+u7YvWqlQHA2EnXBKaCVSEAI2X4zw7lgDD2BADwCel6v3TN36KFCwKAsScEYKQM/9mjHBDGlgAAPiYN//v27o6mpjkBwPhJIUBnx2filwcPxanTpwOuxfCfXcoBYewIAODXWlqaiyv/KQQAYPyla1Y7O9qjr6+vGATAlRj+80E5IJSeAADiwyup0vDf0FAfAEysFcuXRtXAp/7XXn8j4JMM//miHBBKSwBA7qXVpt27HiquPAFQHlIwKwTgkwz/+aQcEEpHAECubdrQHQ9suS8AKD8pBKgrFGL/gVcCDP/5phwQSkMAQG6l4X/jvd0BQPlatHB+zGtpLoYA/f39QT4Z/kmUA8LoCQDIpZ07tsf627sCgPLXNOf6Yi/A/gOvWvnLIcM/n6QcEEZOAECuFAq18fBXd0T7zWsCgMrRUF8fa1atjJde3i8EyBHDP1eiHBBGRgBAbqTr/VLTf1tbawBQeQqFghAgRwz/XItyQBg+AQC5kIb/fXt3R1PTnACgcqUQoLPjM7H/569ET09vkE2Gf4ZKOSAMjwCAzBsc/tMTgMqXrm3tWtcZp06fjiNHjwXZYvhnuAbLAfUCwLUJAMi0lpbmeOzRvdHQUB8AZEs6DlA18In/tdffCLLB8M9opF4AIQBcnQCAzOrsaI+vPfRgsfgPgGxqW9IqBMgIwz+lkEKA5rlNcezYW3oB4DIEAGTSnXd0xZe2by1uEwUg21IIUFcoxP4DrwSVyfBPKdXXTy/2AigHhE8TAJA5mzZ0x/2bNwQA+bFo4fyY19JcDAH6+/uDymH4ZywMlgOePHUqenvPBPAhAQCZsm3r5rj7rvUBQP40zbk+VixfOhACvKoNvEKs+p0VcWtHe8BYSCHA0hvb9ALAxwgAyIR0zv/Lv7c1uj7bGQDkV0N9fbEc8KWX9wsBytzSG5fE57puCxhrygHhNwQAVLw0/Kdr/tKqDwAUCgUhQJlLw//6O7oCxotyQPiQAICK1tg4s3jNX1PTnACAQYMhQLodoKenNygfhn8minJAEABQwdLwn1b+0xMAPimFAKlg7r2enjhy9Fgw8Qz/TLRiL8DStvjVu+/Gu+++F5A3AgAqUktLc3Hlv6GhPgDgStJ1sGknQFVVFHcDMHEM/5SL6urqWNK6WC8AuSQAoOKkD3K7dz1UPPsPAEPRtqRVCDCBDP+Uo9QLMHXqlDh8+GhAXggAqCh3Dnx4+MqD24srOgAwHEKAiWH4p5zNmXN9LFo4fyAEOKIXgFwQAFAxNm3ojvs3bwgAGKkUAsxqnBkv/fRnwdgz/FMJ6uoKygHJDQEAFSEN/xvv7Q4AGK2WlrmxZvXKeP7Fn0R/f38wNgz/VBLlgOSFAICyt3PH9lh/uw8QAJROQ319tN+8Jl56eX+cO9cXlFbaZbFp490BlUQ5IHkgAKBspZK/vV/fFatXrQwAKLV0TWAqlhUClFYa/jdv3hCTB4YpqETKAckyAQBlqXHgw8PePQ/HooULAgDGymAIkIoBe3p6g9EZHP7TdmqoZMoBySoBAGUnDf/79u6OpqY5AQBjLYUA7WtvirePvxPHB16MjOGfrFEOSBYJACgrLS3NxZX/FAIAwHhJ18u2r10TfX198cuDh4LhMfyTVcoByRoBAGUjXc2Uhv+GhvoAgImwYvnSqKqK4pEAhsbwT9YpByRLBACUhc6O9ti966HiCgwATKQUSAsBhsbwT54oByQLBABMuE0buuOBLfcFAJSLFAKk4faln/4suDzDP3mkHJBKJwBgQqXhf+O93QEA5aalZW6sWb0ynn/xJ9Hf3x/8huGfPFMOSCUTADBhdu7YHutv7woAKFcN9fXRfvOaeOnl/XHuXF9g+IdEOSCVSgDAuCsUamPv13fF6lUrAwDKXbomcM3Af7OEABH106fFxo13R93AnwnknXJAKpEAgHGVrvdLTf+LFi4IAKgUgyFAKgbs6emNPErDf1r5r58+PYDfUA5IJREAMG7S8L9v7+5oapoTAFBpUgjQvvam+OXBQ3Hq9OnIE8M/XJ1yQCqFAIBxMTj8pycAVKp0XW26uravr68YBOSB4R+GRjkglUAAwJhraWmOxx7dGw0N9QEAWbBi+dKoqorikYAsM/zD8CgHpNwJABhTaZXkaw89WCz+A4AsaVvSmukQwPAPI6MckHImAGDM3HlHV3xp+9bidkkAyKIUAqRG/P0HXoksMfzD6A2WAx4/fiIuXrwYUA4EAIyJTRu64/6BDw4AkHWp+GteS3MxBOjv749KZ/iH0knlgEuWLNILQNkQAFBy27ZujrvvWh8AkBdNAx/yUy/A/gOvxrlzfVGpDP9QeqkXQDkg5UIAQMmkc/5f/r2t0fXZzgCAvGmor481q1bGSy/vr8gQwPAPY2ewHPCDixfj+DsnAiaKAICSSMN/uuYvrX4AQF4VCoWKDAEM/zD2UjngvHktygGZUAIARq2xcWbxmr+mpjkBAHmXQoDOjs/E/p+/Ej09vVHuDP8wvpQDMpEEAIxKGv7Tyn96AgAfSjfgdK3rjFOnT8eRo8eiXBn+YWIoB2SiCAAYsZaW5uLKf0NDfQAAn5aOA1RVRbz2+htRbgz/MLEGywGPvfVWRZeHUlkEAIxIZ0d7fO2hB4tn/wGAK2tb0lp2IYDhH8pDCgFWLF8WF86fVw7IuBAAMGx33tEVX9q+tbi9EQC4thQC1BUKsf/AKzHRDP9QfpQDMl4EAAzLpg3dcf/AhwYAYHgWLZwf81qaiyFAf39/TATDP5SvVA44e9bMOHT4qHJAxowAgCFLw//Ge7sDABiZpjnXF6/M3X/g1XE/82v4h/J33XUzlAMypgQADMnOHdtj/e1dAQCMTkN9fbEc8KWX949bCGD4h8qhHJCxJADgqlLJ396v74rVAx9UAIDSKBQK4xYCGP6h8igHZKwIALiixsaZsXfPw7Fo4YIAAEorhQCdHZ+J/T9/JXp6emMsTJ1SExs33h3XzZgRQOVRDkipCQC4rDT879u7O5qa5gQAMDbSjTrta2+K93p64sjRY1FKafhPK/+zGhsDqFzKASklAQCf0tLSXFz5TyEAADC2UgiQjgNUDSzzvfb6G1EKhn/IFuWAlIoAgN+S7ilOw39DQ30AAOMn/Te4FCGA4R+ySTkgpSAA4COdHe2xe9dDxZUIAGD8jTYEMPxDtikHZLQEABRt2tAdD2y5LwCAiZVCgFmNM+Oln/5sWP87wz/kh3JARkoAQHH433hvdwAA5aGlZW6sWb0ynn/xJ9Hf33/N32/4h/xRDshICABybueO7bH+9q4AAMpLQ319tN+8Jl56ef9Vz/sa/iG/lAMyXAKAnCoUamPv13fF6lUrAwAoT4VCoXhDwJVCAMM/oByQ4RAA5FC63i81/S9auCAAgPI2GAKkYsCent6Pft3wDwxSDshQCQByJg3/+/bujqamOQEAVIYUArSvvSnePv5OHB94JZ9b99mYP68lAAYpB+RaqlpXr7sU5MLg8J+eAEBl+psnnoxLA5/eli5dEgCXkzoBvv9PP4jz588HfJwAICdaWpqLw386+w8AVLa0xdc2X+Bqenp748knnx54ngkY5AhADnR2tMfv73k4amomBwBQ+aZNqys+z5w9GwCXoxyQyxEAZNydd3TFl7ZvDQAgW1IIUDOl5reKAQE+TjkgnyQAyLBNG7rj/s0bAgDIpkJtbTTUT49333svLl1yqhO4POWADBIAZNS2rZvj7rvWBwCQbZMnT47rZjTEe7298cHFDwLgcubOvSGa5zbFsWNvxfnzF4J8mhRkSir527lje6y/vSsAgHyoqamJ1oULikcCAK4khQCbN2+I+unTgnyyAyBD0vCfmv5XLF8aAEC+VFdXx4z6+mIxYH//xQC4nMFywJOnTkWvGwJyRwCQEY2NM+OxR/dGU9OcAADyqRgCNMyI8+ffj/fd/w1cQQoBlt7YphcghwQAGZCG/7Tyn54AQL5NmlQVM2Y0xMWLF139BVxVOhIgBMgXAUCFa2lpLq78NzTUBwDAoPrp04vPdCQA4EqUA+aLEsAK1tnRXlz5T2f/AQA+ac71s4svgKtRDpgfdgBUqDvv6Iovbd8aNTWTAwDgSqZNq4tJ1dXKvoCrKvYCLG2LX737brz77ntBNgkAKtCmDd1x/0BCBwAwFHWFQjEI6OnpiUuXLgXA5aQi0SWti/UCZJgjABUmDf8b7+0OAIDhmFZXF4sXLoiaKTUBcDXt7TfFZ2/rCLKnqnX1OjFwhdi5Y3vcekt7AACM1IULF+IXB9+MC8q+gGs4efJUPPPd70WPI0SZYQdABUglf48/9geGfwBg1GpqaqLVTgBgCGbNalQOmDECgDLX2Diz2PSfrvsDACiFFAK0LV4ctbVTA+Bq0pWi2x64PxYunB9UPiWAZWxw+G9qmhMAAKU0aVJVNM6cGecvXIi+vvcD4EqUA2aHAKBMpRX/vXseLoYAAABjpaG+vvg8c/ZsAFzN3Lk3xNSpU+Lw4aNBZRIAlKG2Ja3F4b+hoT4AAMZauiIwEQIA1zJnzvWxaOH8gRDgSJxXJlpxdACUmc6O9tj3yO5i8R8AwHiZc/3suOGGpgC4FuWAlcsOgDKyaUN3PLDlvgAAmAh1hULU1tZG75neuHTJTdHAlU2dMiWWLm2LX737brz77ntBZRAAlIk0/G+8tzsAACZSOt+bVvV6zpyJDy5+EABXohyw8ggAysDOHdtj/e1dAQBQDiZPnhwz6uvjvd5eIQBwTcoBK0dV6+p19ndNkHTOf/eur0bbksUBAFBuLly4EL84+GZcUPQFDMHJk6fime9+L3p6zwTlSQngBEnX++3bu9vwDwCUrZqammhbvDhqa6cGwLUoByx/jgBMgMHhv6lpTgAAlLNJk6qicebMOH/hQvT1vR8AV6McsLwJAMbZ4PCfngAAlaKhvr74PHP2bABcjXLA8jU5GDctLc3F4T+d/QcAqDRzrp9dfB5/50QAXEt7+00xZeqU+Ocf/jgoD0oAx0lnR3t85cHtAQBQ6VIAIAQAhko5YPlQAjgONm3oNvwDAJmRdgK0tMyN6mofJYFrUw5YPnQAjLE0/G+8tzsAALKkUFtb/DDfc+ZMfHDxgwC4GuWA5UEAMIa2bd0cd9+1PgAAsmjy5Mkxo74+3uvtFQIA16QccOIJAMZAKvn78u9tja7PdgYAQJalD/RCAGA45s69IaZOnRLHj5+IixcvBuNHCWCJpeE/Nf2nxn8AgLy4cOFCHDx0OPr63g+AoegZCA6ffPJp5YDjSHNLCTU2zozHH9tn+AcAcqempiYWL1wYDfXTA2Ao6qdPVw44zhwBKJE0/KeV//QEAMijSZOqYsaMhuKW3nPn+gLgWgbLAT8Y+HvD9aJjTwBQAmnF/7FH90ZDQ30AAORdWtVLzpw9GwDXkrpE5s1rUQ44DiYHo9LZ0R4PbLmvePYfAIAPzbl+dvFpRQ8Yqvb2m2LK1Cnxr8//W5w/fz4oPSWAo3DnHV0Dw//mAADg8k6/+24cOXIsAIZKOeDYUQI4Qps2dBv+AQCuYeaMGdHWuiiqq33sBIZmsBxw1iz9aqWmA2AE0vC/8d7uAADg2iZPnhzXzWiI9wZW9T64+EEAXEsqB1yxfFlcOH/eUaISEgAM084d22P97V0BAMDQpZKvGfX1QgBgWJQDlpYOgCFKJX/pmr/U+A8AwMhcuHAhDh46HH197wfAUB08+GZ8/59+oBxwlAQAQ9DYOLM4/KcnAACjc/HiB3Hk6NF4r6c3AIZKOeDoaWO5BsM/AEBppULABfPnxSyfr4BhUA44ejoAriJt99+752HDPwDAGEgf5pMzZ88GwFAoBxwdAcAVtC1pLQ7/DQ31AQDA2Jg2ra74FAIAw6EccGQEAJfR2dEeu3c9FDU1kwMAgLGVQoBJ1dXR61wvMAxz594Qs2fNjEOHj8bFixeDa1MC+AmbNnTHxnu7AwCA8ZV2Abx56HCxJBBgqJQDDp0SwI8x/AMATJxpdXXR1ro4aqbUBMBQKQccOkcAfm3nju2x/vauAABg4lRXV8eM+vp4b2BF7wM7AYAhUg44NLkPAAqF2tj79V2xetXKAABg4gkBgJFSDnh1uQ4A0vV+qel/0cIFAQBA+UghwMwZ10Xvmd7o71fuBQydcsAry20HQBr+9+3dHS0tzQEAQPmprp5U7AS47roZATAcCwcWebc9cF/UT58W/EYuA4A09KfhP4UAAACUt3nNc2PO9bMDYDiUA35a7o4ADA7/DQ31AQBAZZg2ra74TFcFAgyVcsDfNjlypLOjPb7y4PYAAKDypF0Ak6qr4y3lXsAw3XZbR0wZCAP+9YV/izzLzQ6ATRu644Et9wUAAJWrrlCI2traYjngpUuXAmColAPmpAMgDf8b7+0OAAAqX0P99Fi8cEHUTKkJgOHIezlg5gOAbVs3G/4BADIm7QJoFQIAI5DncsDMHgEoFGrjy7+3Nbo+2xkAAGRPdXV1zKivj/d6e+ODix8EwFDltRwwkwFAGv5T0/+K5UsDAIDsSiHAzBnXFTsB+vvzeaYXGLl581qiauB5LCflolWtq9dlqj2lsXFmcfhPTwAA8uPw0WPxq1+9GwDDdezYW/GP//Rc9PSeiSzLVAeA4R8AIL/mNc8tXhUIMFzphoDUC5D1csDMHAFoaWmOxx7dGw0N9QEAQD5Nm1ZXfJ45ezYAhiP1AixctCBOnjoVvRndCZCJAKCzoz2+9tCDxbP/AADkWwoBJlVXZ/YDPDB2Ugiw9Ma2zPYCTI4Kd+cdXfHAls0BAACDZjfOjOrqSfHWwAf4i24IAIapvf2m4vNfX/i3yJKK3gGwaUN33L95QwAAwCcVamuL53l7zpxxTSAwbKkXoHluU7Eg8Pz5C5EFFVsCuG3r5th4b3cAAMCV1A6EAK0LF0TNlJoAGK6slQNW5A6AnTu2R9dnOwMAAK6luro6ZtTXx3u9vXYCAMM2WA7YM/B3yLvvvheVrKICgFTy99ijvx8rli8NAAAYqsEQIN0O0N9/MQCGI4UAS1oXV3w5YMUEAI2NM4vX/DU1zQkAABiuYgjQMCPOn38/3j9/PgCGKx0JmDp1Shw+fDQqUUUEAGn437d3d/EJAAAjNWlSVcyY0RAXL16Mc+f6AmC45sy5PhYtnD8QAhypuHLAsi8BbGlpNvwDAFBSc29oijnXzw6AkZg1q7EiywHLegdA25LW2Lvn4WhoqA8AACiladPqis/UCwAwXKkXYOnStvjVu+9WTDlg2QYAnR3tsXvXQ1FTMzkAAGAspBAgXRHY09MbAMOVukUqqRywLKfrTRu6Y+O93QEAAGNt5owZUZg6Nd44+GZcdE0gMALt7TfFlKlT4p9/+OMoZ2XXAWD4BwBgvNXW1kbbwCpe2g0AMBKrfmdFbNt6X1n3ApRVALBzx3bDPwAAE6KmpiZaFy4QAgAjVu7lgGXRAVAo1Mber++K1atWBgAATJR0nndGfX2xGLC//2IADFc5lwNOeACQrvdLTf+LBtJWAACYaMUQoGFGnD//frx//nwADFe5lgNOaACQhv99e3dHU9OcAACAcjFpUlXMmNEQFy9ejHPn+gJgJObOvSGmTp0Shw8fjXIwYQFAS0tzceU/hQAAAFCO6qdPLz7TkQCAkZgz5/pYtHD+QAhwJM6fvxATaUJKANuWtBZX/g3/AACUuznXzy6+AEaqXMoBx30HQGdHe+ze9VDU1EwOAACoBNOm1RVvB+jp6Q2AkSiHcsBxDQA2beiOB7bcFwAAUGkKtbXFIKCnpycuXboUAMM10eWA43YEIA3/G+/tDgAAqFTT6uqibeDDe9oNADBS7e03xWdv64jxNi4BwLatmw3/AABkQk1NTbQuXCAEAEZl1e+sGJiV7xvXXoAxDQAKhdrYuWN7rL+9KwAAICuEAEApjHc5YFXr6nVjcoApDf+p6T9d9wcAAFl08eIH8cbBg9HX934AjNT58+fj+//0XBw8eCjG0piUAKbr/R57dG80Nc0JAADIqkmTqqJx5sw4f+GCEAAYsfEqByx5AJCG/7Tyn54AAJAHDfX1xeeZs2cDYKTmzr0hpk6dEsePn4iLFy9GqZX0CEDa7p+G/7T9HwAA8ub4OyeKL4DR6OntjSeffHrgeSZKqWQlgJ0d7YZ/AABybc71s+OGG5oCYDTqp08fk3LAkhwBuPOOrvjS9q1RUzM5AAAgz+oKhaitrY3eM71x6dKY9G0DOTB1ypRYurQtPrh4sWQ7i0YdAGza0B33DyQTAADAh9IZ3rRy13PmzMCH9w8CYCRSOeC8eS0lKwccVQCwbevmuPuu9QEAAPy2yZMnx4z6+nivt1cIAIxKqcoBR1QCmM75b9t6X9x6S3sAAABXduHChfjFwTfjwvkLATAaoy0HHHYJYBr+U9mf4R8AAK6tpqYm2hYvjtraqQEwGqMtBxzWEYDGxpnx2KN7o6lpTgAAAEMzaVJVNM6cGecvXIi+vvcDYKRSOeCqVSvjwvnzwy4HHHIAkIb/tPKfngAAwPA11NcXn2fOng2A0RhJOeCQAoCWlubYu+dhwz8AAIzStGl1xacQABitVA44e9bMOHT46JDKAa/ZAdC2pNXKPwAAlNCc62fHDTc0BcBoLVy4ILY9cN+QegGuugOgs6M9du96KGpqJgcAAFA6dYVC1NbWRu+Z3rh0adgXcwF8JPUCLFy0II699VacO9d3xd93xQBg04bueGDLfQEAAIyNdK93WrXrOXMmPrj4QQCMVAoBVixfdtVywMseAUjD/8Z7uwMAABhbaRdA68IFUTOlJgBG67bbOuIza2+67L/71A6AnTu2x/rbuwIAABgf1dXVMaO+Pt7r7bUTABi1K5UDVrWuXlc8cFQo1MbuXV+NtiWLAwAAGH8XLlyIg4cOR1/f+wEwWj0DoeKTTz498DxT/OfiEYDU8J+a/g3/AAAwcWpqamLxwoVx3XUzAmC06qdPj82bN8SsWR/e6ld1y/rNl1zzBwAA5eXYW2/HyVOnA6AUfvjDH0fV//lXf3PJ8A8AAOUnNXlfqc0bYLj+f3AC9wDbEDpZAAAAAElFTkSuQmCC"
  }



}
