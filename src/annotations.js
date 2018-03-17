const annotationObject = [
  [{
    note: {
      label: "John and Ruby Lomax begin their trip in John Lomax's 1939 Plymouth, loaded with the recording equipment",
      title: 'March 31, 1939 at San José Island, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop1'], x: 401.4499969482422, y: 1421.2000122070312},
    subject: { radius: 30, radiusPadding: 0 },
    dy: 60,
    dx: 80
  }],
  [{
    note: {
      label: 'The Lomax family makes their first stop at Austin where they meet up with a mechanic “who could check the machine to be sure all parts were there and working”',
      title: 'April 1, 1939 at Austin, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop2'], x: 377.8500061035156, y: 1189.7999877929688},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -300,
    dx: 40
  }],
  [{
    note: {
      label: 'Arrival at Houston where they set up headquarters for the next two weeks',
      title: 'April 4, 1939 at Houston, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop3'], x: 574.7000122070312, y: 1262.4500122070312},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -10,
    dx: 90
  }],
  [{
    note: {
      label: 'Prison recordings at the Clemens State Farm and the Ramsey State Farms respectively',
      title: 'April 16-23, 1939 at Brazoria and Otey, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop4', 'Stop5'], x: 553.3500061035156, y: 1318.5},
    subject: { radius: 30, radiusPadding: 0 },
    dy: 10,
    dx: 30
  }],
  [{
    note: {
      label: 'The Lomaxes record seven songs of the musical drama “The Good Thief”',
      title: 'April 23, 1939 at Sugarland, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop6'], x: 545.2999877929688, y: 1274.7999877929688},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -100,
    dx: 80
  }],
  [{
    note: {
      label: 'The Lomaxes are introduced to Miss Manuela Longoria, the principal of a public school for Mexican children',
      title: 'April 24, 1939 at Brownsville, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop7'], x: 344.40000915527344, y: 1612.5499877929688},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -10,
    dx: 150
  }],
  [{
    note: {
      label: 'Recordings by 85-year old former Sheriff and fiddler Lake N. Porter, as well as ranch hand Frank Goodwyn',
      title: 'April 28, 1939 at Falfurrias, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop8'], x: 302.75, y: 1476.2000122070312},
    subject: { radius: 15, radiusPadding: 0 },
    dy: -100,
    dx: 300
  }],
  [{
    note: {
      label: 'Recordings by Senora Isabella Salazar and the Moye Family. Mr Moye “teaches at night in the U.S.Citizenship Training Corps.”',
      title: 'May 1, 1939 at Kingsville, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop11'], x: 330.09999084472656, y: 1449.8999633789062},
    subject: { radius: 15, radiusPadding: 0 },
    dy: 30,
    dx: 150
  }],
  [{
    note: {
      label: 'Recordings by Elmo Newcomer, who is described as “best dance caller in the county”, as well as other “Hill Country” ranchmen (sheep)',
      title: 'May 3-7, 1939 at Pipe Creek, Bandera and Medina, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop12', 'Stop13', 'Stop14'], x: 254.31666819254556, y: 1222.3500162760417},
    subject: { radius: 40, radiusPadding: 0 },
    dy: 150,
    dx: 80
  }],
  [{
    note: {
      label: 'Recordings by Shirley Lomax, the daughter of John Lomax and his first wife Bess Brown Lomax',
      title: 'May 8, 1939 at Comanche, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop15'], x: 327.59999084472656, y: 1020.2999877929688},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -150,
    dx: 80
  }],
  [{
    note: {
      label: 'The Lomaxes ask around for and find, Moses “Clear Rock” Platt, someone who had provided ample material in earlier recording trips',
      title: 'May 10, 1939 at Taylor, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop16'], x: 407.5, y: 1161.3999633789062},
    subject: { radius: 30, radiusPadding: 0 },
    dy: 150,
    dx: 80
  }],
  [{
    note: {
      label: 'The Lomaxes visit a segregated school but make no recordings. John Lomax makes recordings at the State Penitentiary as well as the Goree State Farm for women',
      title: 'May 11, 1939 at Huntsville, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop17'], x: 568.3500061035156, y: 1165.1000366210938},
    subject: { radius: 30, radiusPadding: 0 },
    dy: -180,
    dx: 80
  }],
  [{
    note: {
      label: 'Lomaxes record Reverend J. R. Gipson, “Blind Gipson” as well as H.R. Weaver the uncle of Alan Lomax’s wife',
      title: 'May 15 and 17-19, 1939 at Merryville, Louisiana',
      wrap: 1200
    },
    data: {stops: ['Stop18'], x: 737.5, y: 1182.1000366210938},
    subject: { radius: 20, radiusPadding: 0 },
    dy: 180,
    dx: 80
  }],
  [{
    note: {
      label: 'Lomaxes make recordings at the segregated Weirgate High School and Liberty High School. They also record Henry Truvillion, the foreman of a work gang for Wier Lumber Company',
      title: 'May 16 and 18, 1939 at Newton and Burkeville, Texas',
      wrap: 1200
    },
    data: {stops: ['Stop19'], x: 723.7999877929688, y: 1150.8999633789062},
    subject: { radius: 20, radiusPadding: 0 },
    dy: -330,
    dx: 0
  }],
  [{
    note: {
      label: 'Lomaxes make prison recordings at the Cummins State Farm',
      title: 'May 20, 1939 at Varner, Arkansas',
      wrap: 1200
    },
    data: {stops: ['Stop23'], x: 917.7000122070312, y: 867.6000061035156},
    subject: { radius: 20, radiusPadding: 0 },
    dy: -330,
    dx: 0
  }],
  [{
    note: {
      label: 'Lomaxes make prison recordings at State Farm, Camp #9',
      title: 'May 22, 1939 at Arkansas City, Arkansas',
      wrap: 1200
    },
    data: {stops: ['Stop24'], x: 944.7000122070312, y: 903.7999877929688},
    subject: { radius: 20, radiusPadding: 0 },
    dy: -330,
    dx: 0
  }]
]

const removalMap = {
  'Stop3': ['Stop1'],
  'Stop4': ['Stop2'],
  'Stop6': ['Stop3'],
  'Stop7': ['Stop4'],
  'Stop8': ['Stop5', 'Stop6'],
  'Stop9': ['Stop7'],
  'Stop12': ['Stop8', 'Stop11'],
  'Stop16': ['Stop12'],
  'Stop17': ['Stop15'],
  'Stop18': ['Stop16'],
  'Stop19': ['Stop17'],
  'Stop23': ['Stop18'],
  'Stop24': ['Stop19']
}

export {annotationObject, removalMap}
