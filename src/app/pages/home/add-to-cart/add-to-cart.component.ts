import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';
import { WindowRefService } from 'src/app/core/services/window-ref.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  getData: any;
  selectedRadioValue: any;
  addressList: any = [];
  paymentId = '';
  cartData: any = {};
  checkoutRes: any = {}
  message: any = '';
  error = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService,
    private winRef: WindowRefService,
    public fun: FunctionService,
    public navCtrl: NavigationRouteService,
    public auth: AuthencationService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  increment(data: any) {
    data.quantity++;
    console.log(data);
    this.updateCartData(data, 1);
  }

  decrement(data: any) {
    if (data.quantity > 1) {
      data.quantity--;
      this.updateCartData(data, -1);
    }
  }

  updateCartData(item: any, quentity: number) {
    let data = {
      user_id: item.user_id,
      art_id: item.art_id,
      creator_id: item.creator_id,
      quantity: quentity,
    };
    this.api.addToCartData(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.getCartList()
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  addOrder(pay: any) {
    const newData = this.checkoutRes.carts.reduce(
      (acc: any, element: any) => {
        acc.items.push(element._id);
        (acc.user_id = element.user_id)
        return acc;
      },
      {
        user_id: '',
        items: [],
        payment_id: pay.razorpay_payment_id,
        timezone: 'Asia/Kolkata',
        artistList: this.checkoutRes.artistList,
        address_id: this.selectedRadioValue,
      }
    );
    this.api.addOrder(newData).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.toast.success(res.message);
        this.navCtrl.goTo('/page/order-status')
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error(res.message);
      }
    });
  }

  payNow(order: any) {
    let options: any = {
      key: environment.paymentKey,
      amount: 200,
      currency: environment.currency,
      name: this.auth.getUserData().name,
      description: 'Web Developer',
      image:
        this.auth.getUserData() && this.auth.getUserData().profile_image
          ? this.auth.getUserData().profile_image
          : 'https://paintika.s3.ap-south-1.amazonaws.com/1692028765688_image_4312740.jpg',
      order_id: '',
      handler: (response: any) => {
        this.addOrder(response);
        var event = new CustomEvent('payment.success', {
          detail: response,
          bubbles: true,
          cancelable: true,
        });
        window.dispatchEvent(event);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#0c238a',
      },
    };

    this.paymentId = '';
    this.error = '';
    options.amount = order.order_total * 100;
    options.prefill.name = this.auth.getUserData().name;
    options.prefill.email = this.auth.getUserData().email_or_mobile_number;
    options.prefill.contact = '9200020095';
    var rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', (response: any) => {
      console.log(response);
      this.message = 'Payment Failed';
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
    rzp1.open();
  }

  getTopayment() {
    if(this.selectedRadioValue){
      const newData = this.cartData.carts.reduce(
        (acc: any, element: any) => {
          acc.items.push(element._id);
          (acc.user_id = element.user_id),
            (acc.price = this.cartData.order_total);
          return acc;
        },
        {
          user_id: '',
          price: '',
          items: [],
        }
      );
  
      this.api.checkOut(newData).then((res: any) => {
        if (res && res.statusCode === 200) {
          this.payNow(res.data);
          this.checkoutRes = res.data
          this.toast.success(res.message);
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      });
    }else{
      this.toast.error('Please select address');
    }
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = 'Success Payment';
  }

  getCartList() {
    let data = { user_id: this.auth.getUserData()._id };
    this.api.cartListData(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.getAddressList();
        this.cartData = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  getAddressList() {
    let data = {
      user_id: this.auth.getUserData()._id,
      page: 1,
      limit: 10,
    };
    this.api.delAddressList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.addressList = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  editAddress(address: any) {
    this.navCtrl.goTo(`/page/delivery-address/${address._id}`);
  }

  removeFromCart(cart: any) {
    this.api.removeToCart({ id: cart._id }).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.toast.error(res.message);
        this.getCartList();
        const indexToRemove = this.cartData.carts.findIndex(
          (item: any) => item._id === cart._id
        );
        if (indexToRemove !== -1) {
          this.cartData.carts.splice(indexToRemove, 1); // Remove one item at the found index
          this.fun.cartCount = this.cartData.carts.length;
        } else {
          console.log('No Find data');
        }
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  deleteAddress(del: any) {
    this.api.deleteAddress({ id: del._id }).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.toast.error(res.message);
        const indexToRemove = this.addressList.findIndex(
          (item: any) => item._id === del._id
        );
        if (indexToRemove !== -1) {
          this.addressList.splice(indexToRemove, 1); // Remove one item at the found index
        } else {
          console.log('No Find data');
        }
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }
}
