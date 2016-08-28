db.locations.drop();

db.locations.save([{
  "name" : "Geisel Library",
  "address" : "9500 Gilman Dr, La Jolla, CA 92093",
  "rating" : 3,
  "facilities" : [
    "Hot drinks",
    "Food",
    "Private rooms"
  ],
  "coords" : [
    -117.2397564,
    32.8811391
  ],
  "openingTimes" : [
    {
      "days" : "Monday - Thursday",
      "opening" : "7:30am",
      "closing" : "10:00pm",
      "closed" : false
    },
    {
      "days" : "Friday",
      "opening" : "7:30am",
      "closing" : "6:00pm",
      "closed" : false
    },
    {
      "days" : "Saturday",
      "opening" : "10:00am",
      "closing" : "6:00pm",
      "closed" : false
    },
    {
      "days" : "Sunday",
      "opening" : "12:00pm",
      "closing" : "8:00pm",
      "closed" : false
    }
  ],
  "reviews" : [
    {
      "author" : "Will Zegers",
      "_id" : ObjectId(),
      "rating" : 4,
      "timestamp" : new Date("Sep 4, 2016"),
      "reviewText" : "Crowded at time, and wifi can be spotty in some areas. Love the new cafe, tho!"
    }
  ]
},
{
  "name" : "Starbucks",
  "address" : "La Jolla Village Square, 8657 Villa La Jolla Dr, La Jolla, CA 92037",
  "rating" : 3,
  "facilities" : [
    "Hot drinks",
    "Food",
    "Premuim wifi"
  ],
  "coords" : [
    -117.2313128,
    32.8666768
  ],
  "openingTimes" : [
    {
      "days" : "Monday - Thursday",
      "opening" : "5:00am",
      "closing" : "11:00pm",
      "closed" : false
    },
    {
      "days" : "Friday - Saturday",
      "opening" : "5:00am",
      "closing" : "11:30pm",
      "closed" : false
    }
  ],
  "reviews" : [
    {
      "author" : "Chuck Finley",
      "_id" : ObjectId(),
      "rating" : 2,
      "timestamp" : new Date("Aug 16, 2016"),
      "reviewText" : "Good wifi, but hard to get a seat sometimes."
    },
    {
      "author" : "Paul Atreides",
      "_id" : ObjectId(),
      "rating" : 4,
      "timestamp" : new Date("Aug 11, 2016"),
      "reviewText" : "Good spice lattes and reliable wifi. And water is free!."
    }
  ]
},
{
  "name" : "Lestat's Coffee House",
  "address" : "3343 Adams Ave, San Diego, CA 92116",
  "rating" : 5,
  "facilities" : [
    "Hot drinks",
    "Food",
    "24 hours"
  ],
  "coords" : [
    -117.1241786,
    32.7632441
  ],
  "openingTimes" : [
    {
      "days" : "Everyday",
      "opening" : "12:00am",
      "closing" : "12:00pm",
      "closed" : false
    }
  ],
  "reviews" : [
    {
      "author" : "J. P. Sartre",
      "id" : ObjectId(),
      "rating" : 5,
      "timestamp" : new Date("Aug 2, 2016"),
      "reviewText" : "Tres bien! Et il est ouvert 24 heures!"
    }
  ]
},
{
  "name" : "San Diego Airport",
  "address" : "3225 N Harbor Dr, San Diego, CA 92101",
  "rating" : 2,
  "facilities" : [
    "Hot drinks",
    "Food"
  ],
  "coords" : [
    -117.1954925,
    32.7338051
  ],
  "openingTimes" : [
    {
      "days" : "Everyday",
      "opening" : "12:00am",
      "closing" : "12:00pm",
      "closed" : false
    }
  ]
}]);
