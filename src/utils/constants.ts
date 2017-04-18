export class Constants {
    //public static CUSTOMER: string = 'c';
    //public static PHARMACY: string = 'p';
    public static APP_VERSION: string = '1.0';
    public static ERROR_MESSAGE: string = "Oops! Something went wrong. Try again.";
    public static NETWORK_ERROR: string = "You are offline. Check your internet connection.";
    public static CUSTOMER: number = 2;
    public static PHARMACY: number = 1;
    
    public static MY_INFO: number = 1;
    public static MY_INFO_ADDRESS: number = 2;
    public static MY_INFO_INSURANCE: number = 3;
    public static MY_INFO_DOCTOR: number = 4;
    public static MY_INFO_CHILDREN: number = 5;
    public static MY_INFO_OTHERS: number = 6;


    public static FNAME: string = "First Name";
    public static LNAME: string = "Last Name";
    public static PNAME: string = "Pharmacy Name";
    public static PCNUMBER: string = "Pharmacy NPI#";
    public static CAMERA: string = "camera";
    public static PHOTO_ALBUM: string = "photo_album";
    public static PHONE_LENGTH: number = 1;
    public static PASSWORD_LENGTH: number = 1;
    
    public static ADD: number = 1;
    public static EDIT: number = 2;
    public static DELETE: number = 0;

    
    public static SERVICES = [
            {
                root: 'http://dev.findapharma.com/',
                customerType: 'http://dev.findapharma.com/api/getcustomertype.php',
                validate: 'http://dev.findapharma.com/api/validate.php',
                signup: 'http://dev.findapharma.com/api/signup.php',
                verify: 'http://dev.findapharma.com/api/verify.php',
                forgot: 'http://dev.findapharma.com/api/getpass.php',
                updateCustomerMyInfo: 'http://dev.findapharma.com/api/updatecustomermyinfo.php',
                insertUpdateCustomerAddress: 'http://dev.findapharma.com/api/insertupdatecustomeraddress.php',
                insertUpdateCustomerInsurance: 'http://dev.findapharma.com/api/insertupdatecustomerinsurance.php',
                getInsurances: 'http://dev.findapharma.com/api/getinsurances.php',
                getCustomer: 'http://dev.findapharma.com/api/getcustomer.php',
                getCustomerAddresses: 'http://dev.findapharma.com/api/getcustomeraddresses.php',
                getCustomerInsurances: 'http://dev.findapharma.com/api/getcustomerinsurances.php',
                getProducts: 'http://dev.findapharma.com/api/getproducts.php',
                getPacks: 'http://dev.findapharma.com/api/getpacks.php',
                getPharmacies: 'http://dev.findapharma.com/api/getpharmacies.php',
                getDosageForm: 'http://dev.findapharma.com/api/getdosageform.php',
                getDosageDetails: 'http://dev.findapharma.com/api/getdosagedetails.php',
                getChildren: 'http://dev.findapharma.com/api/getchildren.php',
                upload: 'http://dev.findapharma.com/api/uploadprescription.php',
                insertPrescriptionImageHeader: 'http://dev.findapharma.com/api/insertprescriptionimageheader.php',
                insertPrescriptionItem: 'http://dev.findapharma.com/api/insertprescriptionitem.php',
                sendEmail: 'http://dev.findapharma.com/api/sendEmail.php'
            },
        
            {
                customerType: 'http://uat.findapharma.com/api/getcustomertype.php',
                validate: 'http://uat.findapharma.com/api/validate.php',
                signup: 'http://uat.findapharma.com/api/signup.php',
                verify: 'http://uat.findapharma.com/api/verify.php',
                forgot: 'http://uat.findapharma.com/api/getpass.php'
            },
        
            {
                customerType: 'http://findapharma.com/api/getcustomertype.php',
                validate: 'http://findapharma.com/api/validate.php',
                signup: 'http://findapharma.com/api/signup.php',
                verify: 'http://findapharma.com/api/verify.php',
                forgot: 'http://findapharma.com/api/getpass.php'
            }
        
    ];

    public static TIME = [ 
      {val: 7, displayTime : 7, display: 'AM'}, 
      {val: 8, displayTime : 8, display: 'AM'}, 
      {val: 9, displayTime : 9, display: 'AM'}, 
      {val: 10, displayTime : 10, display: 'AM'}, 
      {val: 11, displayTime : 11, display: 'AM'}, 
      {val: 12, displayTime : 12, display: 'PM'}, 
      {val: 13, displayTime : 1, display: 'PM'}, 
      {val: 14, displayTime : 2, display: 'PM'}, 
      {val: 15, displayTime : 3, display: 'PM'}, 
      {val: 16, displayTime : 4, display: 'PM'}, 
      {val: 17, displayTime : 5, display: 'PM'}, 
      {val: 18, displayTime : 6, display: 'PM'}, 
      {val: 19, displayTime : 7, display: 'PM'}, 
      {val: 20, displayTime : 8, display: 'PM'}, 
      {val: 21, displayTime : 9, display: 'PM'}, 
      {val: 22, displayTime : 10, display: 'PM'}, 
    
    ];
    public static PHARMA_MENU = [
      { pageId: 'phm', title: 'Orders', icon: 'list-box' },
      { pageId: 'pp', title: 'My Profile', icon: 'person' },
      { pageId: 'so', title: 'Sign Out' ,icon: 'power' }
    ];

    public static CUSTOMER_MENU = [
      { pageId: 'chm', title: 'New Order', icon: 'create' },
      { pageId: 'cp', title: 'My Profile', icon: 'person' },
      { pageId: 'oh', title: 'Order History', icon: 'list-box' },
      { pageId: 'so', title: 'Sign Out', icon: 'power' }
    ];

    public static CUSTOMER_OPTIONS = [
      { id: 1, code: 'np', name: 'New prescription' },
      { id: 2, code: 'tr', name: 'Transfer a refill' },
      { id: 3, code: 'rh', name: 'Reorder from my history' }
    ];
}