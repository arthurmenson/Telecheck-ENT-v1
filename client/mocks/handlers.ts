import { http, HttpResponse } from "msw";

export const handlers = [
  // Authentication
  http.post("/auth/login", () =>
    HttpResponse.json({
      token: "demo-token-123",
      user: {
        id: "user-1",
        name: "Demo User",
        email: "demo@telecheck.com",
        role: "provider",
      },
    }),
  ),

  // Patients
  http.get("/patients", () =>
    HttpResponse.json([
      {
        id: "p1",
        name: "Jane Doe",
        email: "jane.doe@email.com",
        phone: "+1-555-0123",
        dateOfBirth: "1985-03-15",
        gender: "female",
      },
      {
        id: "p2",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0124",
        dateOfBirth: "1978-07-22",
        gender: "male",
      },
    ]),
  ),

  http.post("/patients", () =>
    HttpResponse.json(
      {
        id: "p3",
        name: "New Patient",
        email: "new@email.com",
        phone: "+1-555-0125",
      },
      { status: 201 },
    ),
  ),

  // Encounters
  http.post("/encounters", () =>
    HttpResponse.json(
      {
        id: "e1",
        status: "created",
        patientId: "p1",
        providerId: "user-1",
        encounterType: "consultation",
        notes: "Initial consultation",
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    ),
  ),

  // Lab Results
  http.post("/lab-results", () =>
    HttpResponse.json({
      id: "lab-1",
      patientId: "p1",
      testName: "Complete Blood Count",
      results: {
        hemoglobin: "14.2 g/dL",
        hematocrit: "42.1%",
        whiteBloodCells: "7.2 K/μL",
        platelets: "285 K/μL",
      },
      analysis: {
        status: "normal",
        insights: ["All values within normal range", "No immediate concerns"],
        recommendations: ["Continue current treatment plan"],
      },
      createdAt: new Date().toISOString(),
    }),
  ),

  // Medications
  http.get("/medications", ({ request }) => {
    const url = new URL(request.url);
    const patientId = url.searchParams.get("patientId");

    return HttpResponse.json([
      {
        id: "med-1",
        name: "Metformin",
        dosage: "500mg twice daily",
        patientId: patientId || "p1",
        interactions: [
          {
            drug: "Warfarin",
            severity: "moderate",
            description: "May increase bleeding risk",
          },
        ],
      },
      {
        id: "med-2",
        name: "Lisinopril",
        dosage: "10mg once daily",
        patientId: patientId || "p1",
        interactions: [],
      },
    ]);
  }),

  // AI Chat
  http.post("/chat", () =>
    HttpResponse.json({
      response:
        "Based on the lab results, I can see that your hemoglobin levels are within normal range. This is a good sign for your overall health.",
      suggestions: [
        "Continue current medication regimen",
        "Schedule follow-up in 3 months",
        "Maintain current diet and exercise routine",
      ],
      confidence: 0.92,
    }),
  ),

  // Vital Signs
  http.get("/vitals/:patientId", ({ params }) =>
    HttpResponse.json({
      patientId: params.patientId,
      vitals: [
        {
          type: "blood_pressure",
          value: "120/80",
          unit: "mmHg",
          timestamp: new Date().toISOString(),
        },
        {
          type: "heart_rate",
          value: "72",
          unit: "bpm",
          timestamp: new Date().toISOString(),
        },
        {
          type: "temperature",
          value: "98.6",
          unit: "°F",
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  ),

  // Health Insights
  http.get("/insights/:patientId", ({ params }) =>
    HttpResponse.json({
      patientId: params.patientId,
      insights: [
        {
          id: "insight-1",
          type: "risk_assessment",
          title: "Cardiovascular Risk",
          description: "Low risk based on current vitals and lab results",
          severity: "low",
          recommendations: [
            "Continue current lifestyle",
            "Annual checkup recommended",
          ],
        },
        {
          id: "insight-2",
          type: "medication_optimization",
          title: "Medication Review",
          description: "Current medications are well-tolerated",
          severity: "info",
          recommendations: [
            "Continue current dosages",
            "Monitor for side effects",
          ],
        },
      ],
    }),
  ),
];
