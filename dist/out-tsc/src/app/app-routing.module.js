import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {
        path: 'search',
        loadChildren: './search/search.module#SearchPageModule'
    },
    {
        path: 'modalpage',
        loadChildren: './modalpage/modalpage.module#ModalpagePageModule'
    },
    {
        path: 'firm-details/:id',
        loadChildren: './firm-details/firm-details.module#FirmDetailsPageModule'
    },
    {
        path: 'sign-in',
        loadChildren: './sign-in/sign-in.module#SignInPageModule'
    },
    {
        path: 'terms',
        loadChildren: './cms/terms/terms.module#TermsPageModule'
    },
    {
        path: 'about-us',
        loadChildren: './cms/about-us/about-us.module#AboutUsPageModule'
    },
    {
        path: 'contact-us',
        loadChildren: './cms/contact-us/contact-us.module#ContactUsPageModule'
    },
    {
        path: 'manage-lawyer',
        loadChildren: './manage-lawyer/manage-lawyer.module#ManageLawyerPageModule'
    },
    {
        path: 'demo',
        loadChildren: './demo/demo.module#DemoPageModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterPageModule'
    },
    {
        path: 'change-password',
        loadChildren: './change-password/change-password.module#ChangePasswordPageModule'
    },
    {
        path: 'manage-enquiry',
        loadChildren: './manage-enquiry/manage-enquiry.module#ManageEnquiryPageModule'
    },
    {
        path: 'view-enquiry/:id',
        loadChildren: './view-enquiry/view-enquiry.module#ViewEnquiryPageModule'
    },
    {
        path: 'plan',
        loadChildren: './plan/plan.module#PlanPageModule'
    },
    {
        path: 'lawyer-detail/:id',
        loadChildren: './lawyer-detail/lawyer-detail.module#LawyerDetailPageModule'
    },
    {
        path: 'forgotpassword',
        loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule'
    },
    {
        path: 'otp',
        loadChildren: './otp/otp.module#OtpPageModule'
    },
    {
        path: 'create-password',
        loadChildren: './create-password/create-password.module#CreatePasswordPageModule'
    },
    {
        path: 'register-select',
        loadChildren: './register-select/register-select.module#RegisterSelectPageModule'
    },
    {
        path: 'register-user',
        loadChildren: './register-user/register-user.module#RegisterUserPageModule'
    },
    { path: 'verify-otp',
        loadChildren: './verify-otp/verify-otp.module#VerifyOtpPageModule'
    },
    {
        path: 'profile-user-edit/:id',
        loadChildren: './profile-user-edit/profile-user-edit.module#ProfileUserEditPageModule'
    },
    {
        path: 'my-profile',
        loadChildren: './my-profile/my-profile.module#MyProfilePageModule'
    },
    {
        path: 'edit-profile-firm',
        loadChildren: './edit-profile-firm/edit-profile-firm.module#EditProfileFirmPageModule'
    },
    { path: 'user-my-profile',
        loadChildren: './user-my-profile/user-my-profile.module#UserMyProfilePageModule'
    },
    { path: 'user-edit',
        loadChildren: './user-edit/user-edit.module#UserEditPageModule'
    },
    {
        path: 'pay-now',
        loadChildren: './pay-now/pay-now.module#PayNowPageModule'
    },
    {
        path: 'active-plan',
        loadChildren: './active-plan/active-plan.module#ActivePlanPageModule'
    },
    { path: 'payment-error', loadChildren: './payment-error/payment-error.module#PaymentErrorPageModule' },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map