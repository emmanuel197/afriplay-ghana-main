// Define a function to format subscription data

const SubscriptionsData = [
  {
    ID: { "auto-renewal": 1079, "on-demand": 1081 },
    UID: "basic",
    Name: "Daily Live",
    "Price Options": "daily",
    Validity: "1 day",
    "Rate Code": 9921710002,
    "Plan ID": 1079,
    Price: 2.0,
    Currency: "GHS",
    DataBonus: "200 MB",
    Details: [
      "Daily unlimited access",
      `Rentals
      (TVOD)`,
      `200Mb data bonus`
    ]
  },
  {
    ID: { "auto-renewal": 1080, "on-demand": 1082 },
    UID: "basicplus",
    Name: "Daily Cinema",
    "Price Options": "daily",
    Validity: "1 day",
    "Rate Code": 9921710003,
    "Plan ID": 1080,
    Price: 2.5,
    Currency: "GHS",
    DataBonus: "320 MB",
    Details: [
      `Daily unlimited access`,
      `Rentals
    (TVOD)`,
      `200Mb data bonus`
    ]
  },
  // {
  //   ID: 1081,
  //   UID: "basicod",
  //   Name: "BASIC ON DEMAND",
  //   "Price Options": "daily",
  //   Validity: "1 day",
  //   "Rate Code": 9921710008,
  //   "Plan ID": 1081,
  //   Price: 2.0,
  //   Currency: "GHS",
  //   DataBonus: "200 MB",
  //   Details: ["Daily unlimited access", `Rentals
  //     (TVOD)` , `200Mb data bonus`]
  // },
  // {
  //   ID: 1082,
  //   UID: "basicplusod",
  //   Name: "BASIC+ ON DEMAND",
  //   "Price Options": "daily",
  //   Validity: "1 day",
  //   "Rate Code": 9921710009,
  //   "Plan ID": 1082,
  //   Price: 2.00,
  //   Currency: "GHS",
  //   DataBonus: "320 MB",
  //   Details: [`Daily unlimited access`, `Rentals
  //   (TVOD)` , `200Mb data bonus`]
  // },
  {
    ID: { "auto-renewal": 1083, "on-demand": 1084 },
    UID: "compact",
    Name: "Daily Max",
    "Price Options": "daily",
    Validity: "1 day",
    "Rate Code": 9921710004,
    "Plan ID": 1083,
    Price: 5.0,
    Currency: "GHS",
    DataBonus: "600 MB",
    Details: [
      `Daily unlimited access`,
      `Rentals
    (TVOD)`,
      `600Mb data bonus`
    ]
  },
  // {
  //   ID: 1084,
  //   UID: "compactod",
  //   Name: "COMPACT ON DEMAND",
  //   "Price Options": "daily",
  //   Validity: "1 day",
  //   "Rate Code": 9921710010,
  //   "Plan ID": 1084,
  //   Price: 5.0,
  //   Currency: "GHS",
  //   DataBonus: "600MB",
  //   Details: [`Daily unlimited access`, `Rentals
  //   (TVOD)` , `600Mb data bonus`]
  // },
  {
    ID: 1085,
    UID: "standard",
    Name: "3-day Binge",
    "Price Options": "daily",
    Validity: "3 days",
    "Rate Code": 9921710005,
    "Plan ID": 1085,
    Price: 12.5,
    Currency: "GHS",
    DataBonus: "1.2 GB",
    Details: [
      `3-Day unlimited access`,
      `Rentals
    (TVOD)`,
      `1.2GB data bonus`
    ]
  },
  {
    ID: 1086,
    UID: "pro",
    Name: "Weekly Wonder",
    "Price Options": "daily",
    Validity: "7 days",
    "Rate Code": 9921710006,
    "Plan ID": 1086,
    Price: 25.0,
    Currency: "GHS",
    DataBonus: "3 GB",
    Details: [
      `7-Day unlimited access`,
      `Rentals
    (TVOD)`,
      `3GB data bonus`
    ]
  },
  {
    ID: 1087,
    UID: "max",
    Name: "Monthly Magic",
    "Price Options": "daily",
    Validity: "30 days",
    "Rate Code": 9921710007,
    "Plan ID": 1087,
    Price: 75.0,
    Currency: "GHS",
    DataBonus: "10 GB",
    Details: [
      `30-Day unlimited access`,
      `Rentals
    (TVOD)`,
      `10GB data bonus`
    ]
  }
];

export default SubscriptionsData;
