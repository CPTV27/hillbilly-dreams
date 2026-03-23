export const kioskMockData = {
  civicRoutes: [
    {
      id: "forks-to-freedom",
      title: "Forks of the Road to Freedom",
      description: "A profound historic journey tracing the path from the second-largest domestic slave market in the US to the sites of emancipation and civil rights struggles in Natchez.",
      distance: "2.4 miles",
      duration: "90 minutes",
      stops: [
        {
          id: "stop-1",
          name: "Forks of the Road Marker",
          location: "Intersection of D'Evereux Drive, St. Catherine Street, and Liberty Road",
          coordinates: { lat: 31.5605, lng: -91.3874 },
          description: "Once the site of a brutal human marketplace, now a place of somber reflection and historical reckoning.",
          audioGuideUrl: "/audio/civic/forks-intro.mp3",
          images: [
            "/images/historical/forks-of-the-road-marker.webp"
          ]
        },
        {
          id: "stop-2",
          name: "Rhythm Nightclub Memorial",
          location: "St. Catherine Street",
          coordinates: { lat: 31.5621, lng: -91.3932 },
          description: "Honoring the 209 souls lost in the tragically devastating 1940 Rhythm Nightclub Fire, a pivotal moment in Natchez's African American history.",
          audioGuideUrl: "/audio/civic/rhythm-club.mp3",
          images: [
            "/images/historical/rhythm-night-club-memorial.webp"
          ]
        },
        {
          id: "stop-3",
          name: "Zion Chapel African Methodist Episcopal Church",
          location: "228 N. Pitcher Street",
          coordinates: { lat: 31.5638, lng: -91.4011 },
          description: "A cornerstone of the Black community in Natchez, where Hiram Revels, the first African American U.S. Senator, served as pastor.",
          audioGuideUrl: "/audio/civic/zion-chapel.mp3",
          images: [
            "/images/historical/zion-chapel.webp"
          ]
        },
        {
          id: "stop-4",
          name: "The Proud to Take a Stand Monument",
          location: "Jefferson Street",
          coordinates: { lat: 31.5599, lng: -91.4048 },
          description: "Commemorating the hundreds of civil rights activists who were unjustly arrested and incarcerated at the Mississippi State Penitentiary (Parchman) in 1965.",
          audioGuideUrl: "/audio/civic/parchman-stand.mp3",
          images: [
            "/images/historical/proud-to-take-a-stand.webp"
          ]
        }
      ],
      partnerVenues: [
        {
          name: "The Big Muddy Inn & Blues Room",
          offer: "Show your KioskMode pass for a complimentary signature cocktail during the Friday night Blues Session.",
          distanceFromRoute: "0.8 miles"
        }
      ]
    }
  ]
};
