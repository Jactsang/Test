exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("account")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("account")
        .insert([
          {
            first_name: "Student",
            email: "student@gmail.com",
            password:
              "$2b$10$vvC.4r.ea2OIMmTZ5fEQYeUeGquIL0l/5jmZMSIssE.e3IONZtiYy",
            student: "true",
            subscribed: false,
            quota_increased: 0
          },
          {
            email: "expert@gmail.com",
            password:
              "$2b$10$vvC.4r.ea2OIMmTZ5fEQYeUeGquIL0l/5jmZMSIssE.e3IONZtiYy",
            expert: "true"
          },
          {
            email: "admin@gmail.com",
            password:
              "$2b$10$vvC.4r.ea2OIMmTZ5fEQYeUeGquIL0l/5jmZMSIssE.e3IONZtiYy",
            admin: "true"
          },
          {
            email: "pending@gmail.com",
            password:
              "$2b$10$vvC.4r.ea2OIMmTZ5fEQYeUeGquIL0l/5jmZMSIssE.e3IONZtiYy",
            pending: "true"
          },
          {
            first_name: "sss",
            email: "sss",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            student: "true",
            subscribed: false,
            quota_increased: 0
          },
          {
            email: "eee",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            expert: "true"
          },
          {
            email: "aaa",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            admin: "true"
          },
          {
            email: "ppp1",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            pending: "true"
          },
          {
            email: "ppp2",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            pending: "false",
            expert: "false"
          },
          {
            email: "ppp3",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            pending: "false",
            expert: "true"
          },
          {
            email: "ppp4",
            password:
              "$2b$10$il2s3PQ2eOPB56qhN0MQBO78X4SPjtU0lfEf8CQbSno3G.6AB1EvS",
            pending: "false",
            expert: "false"
          }
        ])
        .then(function() {
          // Inserts seed entries
          return knex("application").insert([
            {
              first_name: "Jac",
              last_name: "Wong",
              email: "jac@msn.com",
              education_certificate:
                "Master degree in Shopping dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              instrument_1: "Piano",
              level_of_skil_1: 1,
              instrument_2: "Guitar",
              level_of_skil_2: 3,
              instrument_3: "",
              level_of_skil_3: 0,
              summary:
                "Summary dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              referral: "Franco A",
              language_English: "true",
              language_Mandarin: "true",
              language_Cantonese: "",
              experience:
                "experience hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf ",
              upload_1:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F24.jpg?alt=media&token=f5507fff-efef-47af-8e8a-51bede46c246",
              upload_2:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F24.jpg?alt=media&token=f5507fff-efef-47af-8e8a-51bede46c246",
              upload_3: "",
              account_id: 8
            },
            {
              first_name: "Bobo",
              last_name: "Tang",
              email: "bobo@msn.com",
              education_certificate:
                "Master degree in Eating dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              instrument_1: "Singing",
              level_of_skil_1: 1,
              instrument_2: "Guitar",
              level_of_skil_2: 2,
              instrument_3: "",
              level_of_skil_3: 0,
              summary:
                "Summary dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              referral: "Franco B",
              language_English: "true",
              language_Mandarin: "",
              language_Cantonese: "true",
              experience:
                "experience hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf ",
              upload_1:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F3da43e718d52877c9b94f6212b19ff23-1024-5.jpg?alt=media&token=a64d2d2b-52d9-40da-9983-9b72a538494e",
              upload_2:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F10%20-%20Wild%20Fire.jpg?alt=media&token=87f444e1-b4cc-4af0-b3f9-049d59ed2e51",
              upload_3: "",
              account_id: 9
            },
            {
              first_name: "Ivan",
              last_name: "Wong",
              email: "Ivan@msn.com",
              education_certificate:
                "Master degree in Sleeping dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              instrument_1: "Singing",
              level_of_skil_1: 3,
              instrument_2: "Piano",
              level_of_skil_2: 3,
              instrument_3: "",
              level_of_skil_3: 0,
              summary:
                "Summary dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
              referral: "Franco C",
              language_English: "true",
              language_Mandarin: "true",
              language_Cantonese: "true",
              experience:
                "experience hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf ",
              upload_1:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F5.jpg?alt=media&token=cbdef8ad-fe5a-4b43-90c8-7e7a88d50d9f",
              upload_2:
                "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2FDB.png?alt=media&token=0f5ce7c2-819f-4655-99ee-0e9b9ffbe3f3",
              upload_3: "",
              account_id: 10
            }
          ]);
        });
    });
};
