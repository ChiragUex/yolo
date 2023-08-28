const initialState = {
  "cards": [
    // {
    //   "card_id": 0,
    //   "questions": [
    //     {
    //       "answer": "",
    //       "field_type": "TextField",
    //       "input_type": "String",
    //       "question_id": 1,
    //       "place_holder": "First Name",
    //       "is_compulsory": true,
    //       "question_text": "Customer First Name",
    //       "answer_choices": [],
    //       "profile_parameter": "firstname"
    //     },
    //     {
    //       "answer": "",
    //       "field_type": "TextField",
    //       "input_type": "String",
    //       "question_id": 2,
    //       "place_holder": "Last Name",
    //       "is_compulsory": true,
    //       "question_text": "Customer Last Name",
    //       "answer_choices": [],
    //       "profile_parameter": "lastname"
    //     },
    //     {
    //       "answer": "",
    //       "field_type": "TypeAhead",
    //       "input_type": "",
    //       "question_id": 3,
    //       "place_holder": "Email",
    //       "is_compulsory": false,
    //       "question_text": "Email",
    //       "answer_choices": [],
    //       "profile_parameter": "Email"
    //     },
    //     {
    //       "answer": "",
    //       "field_type": "TypeAhead",
    //       "input_type": "Integer",
    //       "question_id": 4,
    //       "place_holder": "Phone Number",
    //       "is_compulsory": false,
    //       "question_text": "Phone Number",
    //       "answer_choices": [],
    //       "profile_parameter": "Phone Number"
    //     }
    //   ],
    //   "card_heading": "Applicant detail"
    // },
    {
      "card_id": 1,
      "questions": [
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "String",
          "question_id": 5,
          "place_holder": "First Name",
          "is_compulsory": true,
          "question_text": "First Name",
          "answer_choices": [],
          "profile_parameter": "firstname"
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "String",
          "question_id": 6,
          "place_holder": "Last Name",
          "is_compulsory": true,
          "question_text": "Last Name",
          "answer_choices": [],
          "profile_parameter": "lastname"
        },
        {
          "answer": "",
          "field_type": "Date",
          "input_type": "",
          "question_id": 7,
          "place_holder": "mm/dd/yyyy",
          "is_compulsory": true,
          "question_text": "Date of Birth",
          "answer_choices": [],
          "profile_parameter": "DOB"
        },
        {
          "answer": "",
          "field_type": "TextField",
          "input_type": "Integer",
          "question_id": 8,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Social Security Number",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 9,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Gender",
          "answer_choices": [
            "Male",
            "Female",
            "Do not want to disclose"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 10,
          "place_holder": "Select Marital Status",
          "is_compulsory": false,
          "question_text": "Marital Status",
          "answer_choices": [
            "Single",
            "Married",
            "Separated",
            "Domestic Partner",
            "Widowed",
            "Divorced"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Basic Customer Information"
    },
    {
      "card_id": 2,
      "questions": [
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 11,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Street Address",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 12,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Apt/Unit #?",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 13,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "City",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 14,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "State",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "Integer",
          "question_id": 15,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Zip code",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 16,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Country",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 17,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Do you currently live here?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Contact Information"
    },
    {
      "card_id": 3,
      "questions": [
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 18,
          "place_holder": "Select Highest Level of Education",
          "is_compulsory": false,
          "question_text": "Highest Level of Education?",
          "answer_choices": [
            "High School or Other",
            "Associates / Some College / Vocational",
            "Bachelors",
            "Advanced Degree"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 19,
          "place_holder": "Select Employment Status",
          "is_compulsory": false,
          "question_text": "Employment Status",
          "answer_choices": [
            "A Private Company/Organization",
            "Unemployed",
            "Self- employed",
            "Self- employed",
            "Military",
            "State/Local Government",
            "Federal Government/Postal Service",
            "Retired",
            "Student(Not Employed)"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "",
          "question_id": 20,
          "place_holder": "Occupation",
          "is_compulsory": false,
          "question_text": "Occupation",
          "answer_choices": [],
          "profile_parameter": ""
        }
      ],
      "card_heading": " Education and Employment"
    },
    {
      "card_id": 4,
      "questions": [
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 21,
          "place_holder": "Street Address",
          "is_compulsory": false,
          "question_text": "Street Address",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 22,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Apt/Unit #?",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 23,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "City",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 24,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "State",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "Integer",
          "question_id": 25,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Zip code",
          "answer_choices": [],
          "profile_parameter": "Address"
        },
        {
          "answer": "",
          "field_type": "Address",
          "input_type": "",
          "question_id": 26,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Country",
          "answer_choices": [],
          "profile_parameter": "Address"
        }
      ],
      "card_heading": "Property Address"
    },
    {
      "card_id": 5,
      "questions": [
        {
          "answer": "",
          "field_type": "Year",
          "input_type": "",
          "question_id": 27,
          "place_holder": "Select year",
          "is_compulsory": false,
          "question_text": "Approximate Year Built",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 28,
          "place_holder": "Home style",
          "is_compulsory": false,
          "question_text": "Home style",
          "answer_choices": [
            "Single Family Home",
            "Manufactured/Mobile House",
            "Multi-Family home",
            "Rowhouse",
            "Non-Traditional House",
            "Condo",
            "Townhouse",
            "Commercial",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 29,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Square footage(Sq.Ft)",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 30,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Number of floors",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 31,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "How many people are living in the home?",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Date",
          "input_type": "",
          "question_id": 32,
          "place_holder": "mm/dd/yyyy",
          "is_compulsory": false,
          "question_text": "House Purchase date",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 33,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Purchase price of the House",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 34,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Current value of the House",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 35,
          "place_holder": "Select Foundation Type",
          "is_compulsory": false,
          "question_text": "Foundation Type",
          "answer_choices": [
            "Slab",
            "Basement\t",
            "Partial basement, (Piers, posts and piles)",
            "open",
            "Walkout Basement",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Basic property Details"
    },
    {
      "card_id": 6,
      "questions": [
        {
          "answer": "",
          "field_type": "Year",
          "input_type": "",
          "question_id": 36,
          "place_holder": "Year roof installed",
          "is_compulsory": false,
          "question_text": "Year roof installed",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 37,
          "place_holder": "Primary Roof Material",
          "is_compulsory": false,
          "question_text": "Primary Roof Material",
          "answer_choices": [
            "Solar roof tiles",
            "Asphalt shingles",
            "Metal roofing",
            "Stone-coated steel",
            "Slate",
            "Rubber slate",
            "Clay tiles",
            "Concrete tiles",
            "Built-up roofing",
            "Wood shingles",
            "Wood Shakes",
            "Other",
            "I don’t Know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 38,
          "place_holder": " select Roof Shape",
          "is_compulsory": false,
          "question_text": "Roof Shape",
          "answer_choices": [
            "Gable",
            "Hip",
            "Flat",
            "Gambrel",
            "Mansard",
            "Shed",
            "Other",
            "I don’t Know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 39,
          "place_holder": "Select Primary exterior wall material",
          "is_compulsory": false,
          "question_text": "Primary exterior wall material",
          "answer_choices": [
            "Vinyl siding",
            "wood siding",
            "brick veneer",
            "Stone",
            "Metal siding",
            "Stucco on Frame",
            "Aluminum siding",
            "Brick and block",
            "Clapboard",
            "EIFS or Synthetic Stucco",
            "HardyPlank or Cement fiber",
            "Logs",
            "Solid brick",
            "Stucco on block",
            "Wood shakes",
            "Other",
            "I don’t Know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 40,
          "place_holder": "Select Roof Condition",
          "is_compulsory": false,
          "question_text": "Roof Condition",
          "answer_choices": [
            "Good",
            "Needs Repair",
            "I don't know"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Exterior"
    },
    {
      "card_id": 7,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 41,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Deck",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 42,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Garage",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 43,
          "place_holder": "Garage/carport type",
          "is_compulsory": false,
          "question_text": "Garage/carport type",
          "answer_choices": [
            "Attached",
            "Basement",
            "Built-in",
            "Carport",
            "Detached",
            "Other"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 44,
          "place_holder": "Pool",
          "is_compulsory": false,
          "question_text": "Pool",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 45,
          "place_holder": "Pool type",
          "is_compulsory": false,
          "question_text": "Pool type",
          "answer_choices": [
            "Above ground",
            "In ground"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 46,
          "place_holder": "Does the pool have any of the following?",
          "is_compulsory": false,
          "question_text": "Does the pool have any of the following?",
          "answer_choices": [
            "Diving board",
            "Slide",
            "Removable/Lockable ladder",
            "None of the Above",
            "Other"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 47,
          "place_holder": "Does the pool have any of the following safety barriers?",
          "is_compulsory": false,
          "question_text": "Does the pool have any of the following safety barriers?",
          "answer_choices": [
            "4 ft. fence with locking gate",
            "Screened enclosure",
            "Surrounding wall",
            "Other pool barrier",
            "None of the above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 48,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Trampoline",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 49,
          "place_holder": "Is the trampoline netted?",
          "is_compulsory": false,
          "question_text": "Is the trampoline netted?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 50,
          "place_holder": "Does the trampoline sit inside a fenced area?",
          "is_compulsory": false,
          "question_text": "Does the trampoline sit inside a fenced area?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 51,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Does this home have a perimeter fence?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Exterior Additional Structures"
    },
    {
      "card_id": 8,
      "questions": [
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 52,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Number of baths",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 53,
          "place_holder": "Interior wall material",
          "is_compulsory": false,
          "question_text": "Interior wall material",
          "answer_choices": [
            "Wooden Paneling",
            "Glass wall material",
            "Veneer plaster wall material",
            "Marble cladding",
            "Tile cladding",
            "Brick wall material",
            "Log-solid",
            "Stone",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 54,
          "place_holder": "Flooring material",
          "is_compulsory": false,
          "question_text": "Flooring material",
          "answer_choices": [
            "Marble",
            "Vitrified tiles",
            "Ceramic tiles",
            "Vinyl Flooring",
            "Hardwood",
            "Granite",
            "Linoleum Flooring",
            "Laminate Flooring",
            "Carpet",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 55,
          "place_holder": "Kitchen",
          "is_compulsory": false,
          "question_text": "Kitchen",
          "answer_choices": [
            "Granite or Marble",
            "Plastic Laminate",
            "Solid surface",
            "Tile",
            "Quartz (Engineered Stone)",
            "Butcher Block Countertop",
            "Dekton Countertop",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Interior"
    },
    {
      "card_id": 9,
      "questions": [
        {
          "answer": "",
          "field_type": "MultiSelect",
          "input_type": "",
          "question_id": 56,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Home Safety Devices",
          "answer_choices": [
            "One or More Fire Extinguishers",
            "Smoke Alarms on All Floors",
            "Deadbolt Locks on Exterior Doors",
            "Fire Alarm Reporting to a Monitoring Center",
            "Sprinkler System on All Floors",
            "Burglar Alarm",
            "Other",
            "I don’t know"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 57,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Do you live within 5 miles of a fire station?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 58,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Do you live within 1,000 ft. of a fire hydrant?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Safety Features"
    },
    {
      "card_id": 10,
      "questions": [
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "",
          "question_id": 59,
          "place_holder": "Number of fireplaces in the House",
          "is_compulsory": false,
          "question_text": "Number of fireplaces in the House",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 60,
          "place_holder": "Type of Fireplace",
          "is_compulsory": false,
          "question_text": "Type of Fireplace",
          "answer_choices": [
            "Gas",
            "Wood burning",
            "Wood Stove/Freestanding",
            "Other"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 61,
          "place_holder": "Primary heating type?",
          "is_compulsory": false,
          "question_text": "Primary heating type?",
          "answer_choices": [
            "Electric",
            "Gas",
            "Oil",
            "Solid Fuel",
            "Wood",
            "No Heating",
            "Other"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Date",
          "input_type": "",
          "question_id": 62,
          "place_holder": "mm/dd/yyyy",
          "is_compulsory": false,
          "question_text": "Date for new policy to begin",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 63,
          "place_holder": "Do any of these apply to you or this home?",
          "is_compulsory": false,
          "question_text": "Do any of these apply to you or this home?",
          "answer_choices": [
            "Under major renovation/construction",
            "Currently has major damage",
            "In foreclosure",
            "In bankruptcy",
            "None of the above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "TypeAhead",
          "input_type": "Integer",
          "question_id": 64,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Number of home insurance claims in the last 5 years?",
          "answer_choices": [],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "DropDown",
          "input_type": "",
          "question_id": 65,
          "place_holder": "Do you have any pets or animals?",
          "is_compulsory": false,
          "question_text": "Do you have any pets or animals?",
          "answer_choices": [
            "Dogs",
            "Cat",
            "Exotic Animals",
            "Farm Animals (1-2)",
            "Farm Animals (3+)",
            "Other"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 66,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Does this home have central air conditioning?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 67,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Is the property held in a business trust?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 68,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Primary Home? (Owner Occupied)",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 69,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Is the home on stilts or piers?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 70,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Is the home located in a secured/gated community?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 71,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Is your home built on a hill?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 72,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Do you do business with clients or customers in this home?(e.g. day care, tutoring, etc.)",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 73,
          "place_holder": "How would you prefer to buy?",
          "is_compulsory": false,
          "question_text": "How would you prefer to buy?",
          "answer_choices": [
            "Buy online",
            "Buy over the phone",
            "No preference"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 74,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Mortgage or loan on this property ",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 75,
          "place_holder": "What is more important to you?",
          "is_compulsory": false,
          "question_text": "What is more important to you?",
          "answer_choices": [
            "Lower price",
            "More coverage",
            "No preference"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Other Property Details"
    },
    {
      "card_id": 11,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 76,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $100,000",
            "$100,000 - $300,000",
            "$300,000 - $500,000",
            "$500,000 or 1 million",
            "1 million or above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 77,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Dwelling coverage"
    },
    {
      "card_id": 12,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 78,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $100,000",
            "$100,000 - $300,000",
            "$300,000 - $500,000",
            "$500,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 79,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Personal Property coverage"
    },
    {
      "card_id": 13,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 80,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $100,000",
            "$100,000 - $300,000",
            "$300,000 - $500,000",
            "$500,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 81,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Loss of Use coverage"
    },
    {
      "card_id": 14,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 82,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $100,000",
            "$100,000 - $300,000",
            "$300,000 - $500,000",
            "$500,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 83,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Personal Liability coverage"
    },
    {
      "card_id": 15,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 84,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 85,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Medical Payments coverage"
    },
    {
      "card_id": 16,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 86,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $50,000",
            "$50,000 - $100,000",
            "$100,000 - $200,000",
            "$200,000 or above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 87,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Other structures coverage"
    },
    {
      "card_id": 17,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 88,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 89,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Backup of Sewers and Drains"
    },
    {
      "card_id": 18,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 90,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 91,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Building Additions and Alterations"
    },
    {
      "card_id": 19,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 92,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 93,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Refrigerated Property Coverage"
    },
    {
      "card_id": 20,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 94,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 95,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Identity Fraud Expense Coverage"
    },
    {
      "card_id": 21,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 96,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above",
            "No coverage"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 97,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Wind/Hail Deductible"
    },
    {
      "card_id": 22,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 98,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 99,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Portable Electronics coverage"
    },
    {
      "card_id": 23,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 100,
          "place_holder": "Limits",
          "is_compulsory": false,
          "question_text": "Limits",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        },
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 101,
          "place_holder": "Deductible",
          "is_compulsory": false,
          "question_text": "Deductible",
          "answer_choices": [
            "$0 - $500",
            "$500 - $1000",
            "$1000 - $3000",
            "$3000 - above",
            "No deductible"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Fire Insurance/Coverage"
    },
    {
      "card_id": 24,
      "questions": [
        {
          "answer": "",
          "field_type": "Range",
          "input_type": "",
          "question_id": 102,
          "place_holder": "Total Deductible",
          "is_compulsory": false,
          "question_text": "Total Deductible",
          "answer_choices": [
            "$0 - $1000",
            "$1000 - $3000",
            "$3000 - $5000",
            "$5000 - $10,000",
            "$10,000 - above"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Total Deductible"
    },
    {
      "card_id": 25,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 103,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Does your home have smoke detectors, burglar alarms, fire alarms, sprinkler systems, deadbolts or a security system?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Safety features discount"
    },
    {
      "card_id": 26,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 104,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Have you been a customer of the same insurance company for a certain number of years?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Loyalty discount"
    },
    {
      "card_id": 27,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 105,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Have you had any claims on your home insurance in the past few years?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Claims-free discount"
    },
    {
      "card_id": 28,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 106,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you able to pay your insurance premium in full upfront?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Paid-in-full discount"
    },
    {
      "card_id": 29,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 107,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Does your home have any energy-efficient features, such as solar panels, energy-efficient appliances, or insulation upgrades?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Energy-efficient discount"
    },
    {
      "card_id": 30,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 108,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you interested in bundling your home insurance with any other insurance policies, such as auto or life insurance?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Bundled insurance discount"
    },
    {
      "card_id": 31,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 109,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you currently serving or have you served in the military?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Electronic billing discount"
    },
    {
      "card_id": 32,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 110,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you currently serving or have you served in the military?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Military discount"
    },
    {
      "card_id": 33,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 111,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you interested in adding an inflation protection endorsement to your policy?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Inflation Protection Discount"
    },
    {
      "card_id": 34,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 112,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Has your home been recently built or renovated?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "New/Renovated Home Discount"
    },
    {
      "card_id": 35,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 113,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Are you shopping for home insurance coverage in advance of your policy's expiration date?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Early Shopper Discount"
    },
    {
      "card_id": 36,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 114,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Did you purchase your home within the past year?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "Recent Home Buyer Discount"
    },
    {
      "card_id": 37,
      "questions": [
        {
          "answer": "",
          "field_type": "Chip",
          "input_type": "",
          "question_id": 115,
          "place_holder": "",
          "is_compulsory": false,
          "question_text": "Has your roof been recently replaced or upgraded?",
          "answer_choices": [
            "Yes",
            "No"
          ],
          "profile_parameter": ""
        }
      ],
      "card_heading": "New Roof Discount"
    }
  ]
}

export default initialState;
