import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalService } from '../globalServices/global.service';
import { HttpClientModule } from '@angular/common/http';
// import { AgmCoreModule } from '@agm/core';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { PayPal } from '@ionic-native/paypal/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent,],
            entryComponents: [],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                NgxSpinnerModule,
                HttpClientModule,
                IonicStorageModule.forRoot({
                    name: 'lawyer',
                    driverOrder: ['indexeddb', 'sqlite', 'websql'],
                }),
            ],
            providers: [
                StatusBar,
                SplashScreen,
                GlobalService,
                PayPal,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map