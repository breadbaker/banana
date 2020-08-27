export default {
  prereqsForPracticalTest: {
    label: 'PREREQUISITES FOR THE PRACTICAL TEST ENDORSEMENT',
    endorsements: {
      loggedTrainingTime: {
        section: 'A.1',
        title: 'Prerequisites for practical test: Title 14 of the Code of Federal Regulations(14 CFR) part 61, § 61.39(a)(6)(i) and (ii).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received and logged training time within 2 calendar-months preceding the month of application in preparation for the practical test and they are prepared for the required practical test for the issuance of ${opt.licenseType} certificate.`
        },
        fields: ['licenseType']
      },
      reviewOfDeficiencies: {
        section: 'A.2',
        title: 'Review of deficiencies identified on airman knowledge test: § 61.39(a)(6)(iii), as required.',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has demonstrated satisfactory knowledge of the subject areas in which they were deficient on the ${opt.licenseType} airman knowledge test.`
        },
        fields: ['licenseType']
      }
    }
  },
  studentPilotEndorsements: {
    label: 'STUDENT PILOT ENDORSEMENTS',
    endorsements: {
      presoloAeronauticalKnowledge: {
        section: 'A.3',
        title: 'Pre-solo aeronautical knowledge: § 61.87(b).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has satisfactorily completed the pre-solo knowledge test of § 61.87(b) for the ${opt.aircraftMake} ${opt.aircraft} aircraft.`
        },
        fields: ['aircraft', 'aircraftMake']
      },
      preSoloManuvers: {
        section: 'A.4',
        title: 'Pre-solo flight training: § 61.87(c)(1) and (2).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received and logged pre-solo flight training for the maneuvers and procedures that are appropriate to the ${opt.aircraftMake} ${opt.aircraft} aircraft. I have determined they have demonstrated satisfactory proficiency and safety on the maneuvers and procedures required by § 61.87 in this or similar make and model of aircraft to be flown.`
        },
        fields: ['aircraft', 'aircraftMake']
      },
      a5: {
        section: 'A.5',
        title: 'Pre-solo flight training at night: § 61.87(o). Flight training must be received within the 90 calendar-day period preceding the date of the flight.',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received flight training at night on night flying procedures that include takeoffs, approaches, landings, and go-arounds at night at the ${opt.airport} airport where the solo flight will be conducted; navigation training at night in the vicinity of the ${opt.airport} airport where the solo flight will be conducted. This endorsement expires 90 calendar-days from the date the flight training at night was received.`
        },
        fields: ['airport']
      },
      a6: {
        section: 'A.6',
        title: 'Solo flight (first 90 calendar-day period): § 61.87(n).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training to qualify for solo flying. I have determined they meet the applicable requirements of § 61.87(n) and is proficient to make solo flights in ${opt.aircraftMake} ${opt.aircraft}.`
        },
        fields: ['aircraft', 'aircraftMake']
      },
      a7: {
        section: 'A.7',
        title: 'Solo flight (each additional 90 calendar-day period): § 61.87(p).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training to qualify for solo flying. I have determined that they meet the applicable requirements of § 61.87(p) and is proficient to make solo flights in ${opt.aircraftMake} ${opt.aircraft}.`
        },
        fields: ['aircraft', 'aircraftMake']
      },
      a8: {
        section: 'A.8',
        title: 'Solo takeoffs and landings at another airport within 25 nautical miles (NM): § 61.93(b)(1).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training of § 61.93(b)(1). I have determined that they are proficient to practice solo takeoffs and landings at ${opt.airport}. The takeoffs and landings at ${opt.airport} are subject to the following conditions: ${opt.comments}`
        },
        fields: ['airport', 'comments']
      },
      a9: {
        section: 'A.9',
        title: 'Solo cross-country flight: § 61.93(c)(1) and (2).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required solo cross-country training. I find they have met the applicable requirements of § 61.93, and is proficient to make solo cross-country flights in a ${opt.aircraftMake} ${opt.aircraft} aircraft, ${opt.aircraftCategory}.`
        },
        fields: ['aircraft', 'aircraftMake', 'aircraftCategory']
      },
      a10: {
        section: 'A.10',
        title: 'Solo cross-country flight: § 61.93(c)(3).',
        text: function (opt) {
          return `I have reviewed the cross-country planning of ${opt.pilotName}. I find the planning and preparation to be correct to make the solo flight from [origination airport] to ${opt.departingAirport} via ${opt.route} with landings at ${opt.airports} in a ${opt.aircraftMake} ${opt.aircraft} aircraft on ${opt.date}. ${opt.comments}`
        },
        fields: ['date', 'departingAirport', 'airports', 'route', 'aircraft', 'aircraftMake', 'comments']
      },
      a11: {
        section: 'A.11',
        title: 'Repeated solo cross-country flights not more than 50 NM from the point of departure: § 61.93(b)(2).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training in both directions between and at both ${opt.departingAirport} and ${opt.arrivalAirport}. I have determined that they are proficient of § 61.93(b)(2) to conduct repeated solo cross-country flights over that route, subject to the following conditions: ${opt.comments}`
        },
        fields: ['departingAirport', 'arrivalAirport', 'comments']
      },
      a12: {
        section: 'A.12',
        title: 'Solo flight in Class B airspace: § 61.95(a).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training of § 61.95(a). I have determined they are proficient to conduct solo flights in ${opt.airspace} airspace. ${opt.comments}`
        },
        fields: ['airspace', 'comments']
      },
      a13: {
        section: 'A.13',
        title: 'Solo flight to, from, or at an airport located in Class B airspace: § 61.95(b) and 14 CFR part 91, § 91.131(b)(1).',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has received the required training of § 61.95(b)(1). I have determined that they are proficient to conduct solo flight operations at ${opt.airport}. ${opt.comments}`
        },
        fields: ['airport', 'comments']
      },
      a14: {
        section: 'A.14',
        title: 'Endorsement of U.S. citizenship recommended by the Transportation Security Administration (TSA): Title 49 of the Code of Federal Regulations (49 CFR) § 1552.3(h). The flight instructor must keep a copy of the documents used to provide proof of citizenship for 5 years or make the following endorsement in the student’s logbook and the instructor’s logbook or other record used to record flight student endorsements with the following:',
        text: function (opt) {
          return `I certify that ${opt.pilotName} has presented me a ${opt.documentType} ${opt.documentNumber} establishing that they are a U.S. citizen or national in accordance with 49 CFR § 1552.3(h).`
        },
        fields: ['documentType', 'documentNumber']
      }
    }
  }
}

