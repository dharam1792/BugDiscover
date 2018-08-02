import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {


  /************Live*****************/

  // public BaseUrl = "http://18.219.55.144/api/v1.0/";

  // public SignupURI = `user/researcher/sign_up`;

  // public SigninURI = `user/signin`;

  // public GetProfileInfo = `user/profile/`;

  // public GetHallofFame = `halloffame`;

  // public GetAllPrograms = `program/all`;

  // public AddZeroDiscover = `zerodiscover`;

  // public GetSubmissionReports = `bug/submissionReport`;

  // public GetSubmissionReportsById = `program/{ReportID}`;



  /************Mock*****************/
  //   public BaseUrl = "http://localhost/2018/Suji/services/Services/";

  //   public SignupURI = `addUsers`;

  //   public SigninURI = `signinUser`;

  //  public GetProfileInfo = `getProfile`;



  /***********Live*********** */

  // public BaseUrl = "http://bugdiscover.com:3000/api/v1.0/";

  // // public BaseUrl = "http://localhost:3000/api/v1.0/";

  // public tenentName = "http://bugdiscover.com:3000/";

  /***********Staging*********** */

  // public BaseUrl = "http://18.219.207.120/api/v1.0/";
  public BaseUrl = "http://18.219.207.120:3000/api/v1.0/";
  // public BaseUrl = "http://localhost:3000/api/v1.0/";

  public tenentName = "http://18.219.207.120/";



  /***********Reasearcher*********** */

  public SignupURI = `user/researcher/sign_up`;

  public SigninCompanyURI = `user/company/signin`;

  public SigninResearcherURI = `user/researcher/signin`;

  public GetProfileInfo = `user/profile/`;
  // public GetProfileInfo ;
  public GetDashboardInfo = `program/researcher`;

  public GetHallofFame = `halloffame`;

  public GetAllPrograms = `program/all`;

  public AddZeroDiscover = `zerodiscover`;

  public GetSubmissionReports = `bug/submissionReport`;

  public GetSubmissionReportsById = `program/{ReportID}`;

  // public UpdateProfileInfo = `user/profile/`;
  public UpdateProfileInfo = '';
  public ChangeProfilePicture = `user/changeprofilepicture/`;

  public UserProfilePrivacy = `user/profile/privacy/`;

  public ActivateProfile = `account/activate/`;

  public ChangePassword = `user/profile/ChangePassword`;


  /***********Company*********** */

  public SignupURICompany = `user/company/sign_up`;

  public GetProfileInfoCompany = `user/company/profile/`;

  public GetDashboardInfoCompany = `program/company/`;

  public GetHallofFameCompany = `halloffame`;

  public GetAllProgramsCompany = `program/all`;

  public UpdateProfileInfoCompany = `user/profile/`;

  public AddProgramsCompany = `program`;

  public GetSubmissionReportsCompany = `program/company/submissions`;
  
  // public GetSubmissionReportsById = `program/{ReportID}`;

  public GetAllMessagesInbox = `message/inbox`;
  public GetAllMessagesSent = `message/sent`;
  public GetAllMessagesTrash = `message/trash`;
  public GetAllMessagesByID = `message`;
  public postSupportMessage = `message/support`;
  

  //REWARD 
  public GetAllRewards  = `reward/company`;


  // public ChangeProfilePicture = `user/changeprofilepicture/`;

  // public UserProfilePrivacy = `profile/privacy/`;

  // public ActivateProfile = `account/activate/`;


  public dummyData: any = {};

  public isDummyData: boolean =false;

  constructor() {

    // this.dummyData.dashboardInfo =JSON.parse(`{"totalPrograms":4,"ongoingPrograms":0,"bugPending":0,"totalSubmissions":8,"successSubmissions":8,"inprogressSubmission":0,"rewards":0,"score":0,"openDiscover":0,"privateDiscover":0,"programs":[{"program_id":1,"program_name":"test","program_type":"public","researcherCount":5,"program_status":"close request"},{"program_id":1,"program_name":"test","program_type":"public","researcherCount":5,"program_status":"close request"},{"program_id":1,"program_name":"test","program_type":"public","researcherCount":5,"program_status":"close request"},{"program_id":1,"program_name":"test","program_type":"public","researcherCount":5,"program_status":"close request"}]}`);
    // this.dummyData.HallofFame=`{"halloffame":[{"researcher_name":"prabha","researcher_id":2,"score":0,"image":null,"rank":0},{"researcher_name":"dfgdfgdg","researcher_id":3,"score":0,"image":null,"rank":0},{"researcher_name":"sujithrakumar","researcher_id":4,"score":0,"image":null,"rank":0},{"researcher_name":"DInesh","researcher_id":5,"score":0,"image":null,"rank":0}],"myhalloffame":[{"company_id":1,"companyName":"Bugdiscover","image":"/uploads/users/447a60ba4e9158f4385f68e02fc21198.jpeg"}]}`;

    this.dummyData.dashboardInfo = {
      "tiles": {
        "comapany_name": "Test Company",
        "company_logo": "/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg",
        "risk_status": 0,
        "totalPrograms": 3,
        "submissionReceived": 3,
        "bugResolved": 0,
        "inprogressSubmission": 0,
        "bugPending": 0,
        "rewards": 3,
        "openDiscover": 0,
        "privateDiscover": 0
      },
      "tilesData": {
        "openDiscover": [],
        "privateDiscover": [],
        "bugResolved": [],
        "inprogressSubmission": [],
        "bugPending": [],
        "totalPrograms": [
          {
            "creation_date": "2018-03-28",
            "program_name": "sdf",
            "program_type": "Private Discover",
            "researcher_count": 5,
            "status": "Active"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "test",
            "program_type": "Private Discover",
            "researcher_count": 6,
            "status": "Inactive"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "cccc",
            "program_type": "Private Discover",
            "researcher_count": 0,
            "status": "Inactive"
          }
        ],
        "submissionReceived": [
          {
            "creation_date": "2018-03-28",
            "program_name": "sdf",
            "program_type": "Private Discover",
            "researcher_count": 5,
            "status": "Active"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "test",
            "program_type": "Open Discover",
            "researcher_count": 6,
            "status": "Inactive"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "cccc",
            "program_type": "Private Discover",
            "researcher_count": 0,
            "status": "Inactive"
          }
        ],
        "rewards": [
          {
            "creation_date": "2018-03-28",
            "program_name": "sdf",
            "program_type": "Open Discover",
            "researcher_count": 5,
            "status": "Active"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "test",
            "program_type": "Private Discover",
            "researcher_count": 6,
            "status": "Inactive"
          },
          {
            "creation_date": "2018-03-28",
            "program_name": "cccc",
            "program_type": "Private Discover",
            "researcher_count": 0,
            "status": "Inactive"
          }
        ]
      }
    };

    this.dummyData.HallofFame = '';

    this.dummyData.ProgramsData = [
      {
        "companyId": 15,
        "companyName": "Test Company",
        "companyLogoUrl": "/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg",
        "programName": "ssdsddf",
        "programType": "public",
        "programId": 1,
        "programDesc": "fgfg",
        "launchDate": "2018-03-28",
        "program_status": "open",
        "bugsResolved": 0,
        "rewardType": "",
        "minimumReward": 0
      },
      {
        "companyId": 15,
        "companyName": "Test Company",
        "companyLogoUrl": "/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg",
        "programName": "ssdsddf",
        "programType": "public",
        "programId": 1,
        "programDesc": "fgfg",
        "launchDate": "2018-03-28",
        "program_status": "open",
        "bugsResolved": 0,
        "rewardType": "",
        "minimumReward": 0
      },
      {
        "companyId": 15,
        "companyName": "Test Company",
        "companyLogoUrl": "/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg",
        "programName": "ssdsddf",
        "programType": "public",
        "programId": 1,
        "programDesc": "fgfg",
        "launchDate": "2018-03-28",
        "program_status": "open",
        "bugsResolved": 0,
        "rewardType": "",
        "minimumReward": 0
      },
      {
        "companyId": 15,
        "companyName": "Test Company",
        "companyLogoUrl": "/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg",
        "programName": "ssdsddf",
        "programType": "public",
        "programId": 1,
        "programDesc": "fgfg",
        "launchDate": "2018-03-28",
        "program_status": "open",
        "bugsResolved": 0,
        "rewardType": "",
        "minimumReward": 0
      }
    ];

    this.dummyData.SubmissionData = {
      "status": {
        "programID": 12,
        "totalSubmissions": 1,
        "pendingCount": 1,
        "completedCount": 1,
        "inProgressCount": 0
      },
      "bugs": {
        "private": [

        ],
        "public": [

        ]
      }
    };


    this.dummyData.MyProfile = {
      "companyName": "Haplot",
      "email": "prabhakaran3090@gmail.com",
      "registrarName": "Prabhakaran",
      "designation": "Senior Software Developer",
      "aboutMe": "xxxx",
      "phone": "9999999999",
      "skype": "xxxx",
      "website": "http://www.google.com",
      "socialLinks": "http://www.google.com",
      "profileImageUrl": "http://18.219.55.144:3000/uploads/users/ac4cb509e193a32b9adb6e7e962a3778.jpeg"
    };

    this.dummyData.MessageInboxData = [
      {
        "sender": "Prabhakaran",
        "messageid": 3,
        "subject": "Message 2 ",
        "createdtime": "2018-05-06 12:10:24 PM",
        "msgType": "sent"
      },
      {
        "sender": "Prabhakaran",
        "messageid": 2,
        "subject": "Message 2",
        "createdtime": "2018-05-06 12:08:19 PM",
        "msgType": "received"
      }
    ];


    this.dummyData.MessageListData = [
      {
        "sender": "Prabhakaran",
        "messageid": 3,
        "subject": "Message 2 ",
        "createdtime": "2018-03-15 12:10:24 PM",
        "msgType": "sent"
      },
      {
        "sender": "Prabhakaran",
        "messageid": 2,
        "subject": "sdfs",
        "createdtime": "2018-03-15 12:08:19 PM",
        "msgType": "received"
      }
    ];



    this.dummyData.SupportMessageListData = [
      {
        "message": "message 1",
        "createdtime": "2018-03-15 12:10:24 PM",
        "msgType": "sent"
      },
      {
        "message": "message 2",
        "createdtime": "2018-03-15 12:10:24 PM",
        "msgType": "received"
      },
      {
        "message": "message 3",
        "createdtime": "2018-03-15 12:10:24 PM",
        "msgType": "sent"
      },
    ];




    this.dummyData.Rewards ={
      "due": [
          {
              "submissionID": 2,
              "CVSS": "12",
              "dueDate": "2018-05-06 12:10:24 PM",
              "rewardType": "thaks",
              "reward": "1",
              "total": "1800",
              "status": "Due",
              "statusBtn": "ACK"
          }
      ],
      "invoice": [
          {
              "invoiceNumber": "xxx",
              "date": "2018-05-06 12:10:24 PM",
              "status": "Due",
              "reward": "1"
          },
          {
              "invoiceNumber": "yyy",
              "date": "2018-05-06 12:10:24 PM",
              "status": "COMPLETED",
              "reward": "1"
          }
      ],
      "receipt": [
          {
              "invoiceNumber": "123345",
              "date": "2018-05-06 12:10:24 PM",
              "total": "123"
          }
      ]
  };


  this.dummyData.Rewards_R ={
    "status": [
        {
            "dueDate": "2018-05-06 12:10:24 PM",
            "companyName": "Bugdiscover",
            "submissionId": 1,
            "CVSS": "12",
            "rewardType": "thaks",
            "reward": "1",
            "status": "Due",
            "statusMsg": "Due"
        },
        {
            "dueDate": "2018-05-06 12:10:24 PM",
            "companyName": "Bugdiscover",
            "submissionId": 1,
            "CVSS": "12",
            "rewardType": "thaks",
            "reward": "1",
            "status": "COMPLETED",
            "statusMsg": "COMPLETED"
        }
    ],
    "receipt": [
        {
            "receipt": "12323",
            "dateCleared": "2018-05-06 12:10:24 PM",
            "subId": 1,
            "reward": "1"
        }
    ]
};


  }

}
