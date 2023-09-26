import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { WindowRefService } from 'src/app/core/services/window-ref.service';
import { environment } from 'src/environments/environment';

declare var Razorpay:any

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit{
 
  getData:any;
  // quantity: number = 1;
  addressList: any = []
  paymentId = "";
  cartData: any = []
  message:any ="";
  error = "";

  options = {
    "key": environment.paymentKey,
    "amount": 200,
    "currency": environment.currency,
    "name": "Paintika",
    "description": "Web Developer",
    "image": "https://paintika.s3.ap-south-1.amazonaws.com/1692028765688_image_4312740.jpg",
    "order_id": "",
    "handler": function (response:any){
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill":{
      "name":"",
      "email":"",
      "contact":""
    },
    "notes":{
      "address":""
    },
    "theme": {
      "color": "#0c238a"
    }
  };
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService,
    private winRef: WindowRefService,
    public auth: AuthencationService
  ){

  }

  ngOnInit(): void {   
    this.getCartList();
  }

  increment(data:any) {
    data.quantity++;
  }

  decrement(data: any) {
    if (data.quantity > 1) {
      data.quantity--;
    }
  }

  getTopayment(){
    console.log('Test => ');
    this.paymentId = '',
    this.error = '',
    this.options.amount = 1000;
    this.options.prefill.name = "Sk Test";
    this.options.prefill.email = "sk@gmail.com";
    // this.options.prefill.contact = "8755221144";
    this.options.prefill.contact = "9200020095";
    var rzp1 = new Razorpay(this.options)
    rzp1.open();
    rzp1.on('payment.failed', (response:any) =>{
      this.message = "Payment Failed"
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  }

  @HostListener('window:payment.success', ['$event'])

  onPaymentSuccess(event:any): void{
    this.message = "Success Payment"
  }

  getCartList(){
    let data = {user_id: this.auth.getUserData()._id}
    this.api.cartListData(data).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.getAddressList()
        this.cartData = res.data.carts
        console.log('cart => ',  this.cartData);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  getAddressList(){
    let data ={
      "user_id": this.auth.getUserData()._id,
      "page":1,
      "limit":10
    }
    this.api.delAddressList(data).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.addressList = res.data
        console.log('Addrwess => ',  this.addressList);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }
}
