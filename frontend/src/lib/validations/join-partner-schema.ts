import { z } from "zod";

export const serviceTypes = [
  "hotel",
  "vehicle-rental",
  "tour-guide",
  "restaurant",
  "activity-provider",
] as const;

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

const optionalText = z.string().trim().optional();

export const joinPartnerSchema = z
  .object({
    serviceType: z
      .string()
      .min(1, "Please select a service type")
      .refine((value) => serviceTypes.includes(value as (typeof serviceTypes)[number]), {
        message: "Please select a valid service type",
      }),

    businessName: optionalText,
    contactPerson: optionalText,
    email: optionalText,
    phone: optionalText,
    city: optionalText,
    description: optionalText,

    address: optionalText,
    googleMapsLink: optionalText,
    propertyType: optionalText,
    roomCount: optionalText,
    amenities: optionalText,

    vehicleCategory: optionalText,
    fleetSize: optionalText,
    seatCapacity: optionalText,
    driverAvailable: z.boolean().optional(),
    airportPickup: z.boolean().optional(),
    serviceAreas: optionalText,

    languages: optionalText,
    regionsCovered: optionalText,
    guideLicense: optionalText,
    experienceYears: optionalText,

    cuisineType: optionalText,
    openingHours: optionalText,
    dineInAvailable: z.boolean().optional(),
    takeawayAvailable: z.boolean().optional(),

    activityType: optionalText,
    duration: optionalText,
    ageSuitability: optionalText,
    safetyNotes: optionalText,
    operatingArea: optionalText,
  })
  .superRefine((data, ctx) => {
    if (!data.serviceType) return;

    const requireField = (value: string | undefined, path: string, label: string) => {
      if (!value?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [path],
          message: `${label} is required`,
        });
      }
    };

    requireField(data.businessName, "businessName", "Business name");
    requireField(data.contactPerson, "contactPerson", "Contact person");
    requireField(data.email, "email", "Email");
    requireField(data.phone, "phone", "Phone");
    requireField(data.city, "city", "City / main location");
    requireField(data.description, "description", "Description");

    if (data.email && !z.string().email().safeParse(data.email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Enter a valid email",
      });
    }

    if (data.serviceType === "hotel") {
      requireField(data.address, "address", "Address");
      requireField(data.propertyType, "propertyType", "Property type");
      requireField(data.roomCount, "roomCount", "Room count");
    }

    if (data.serviceType === "vehicle-rental") {
      requireField(data.vehicleCategory, "vehicleCategory", "Vehicle category");
      requireField(data.seatCapacity, "seatCapacity", "Seat capacity");
      requireField(data.serviceAreas, "serviceAreas", "Service areas");
    }

    if (data.serviceType === "tour-guide") {
      requireField(data.languages, "languages", "Languages");
      requireField(data.regionsCovered, "regionsCovered", "Regions covered");
    }

    if (data.serviceType === "restaurant") {
      requireField(data.address, "address", "Address");
      requireField(data.cuisineType, "cuisineType", "Cuisine type");
      requireField(data.openingHours, "openingHours", "Opening hours");
    }

    if (data.serviceType === "activity-provider") {
      requireField(data.activityType, "activityType", "Activity type");
      requireField(data.operatingArea, "operatingArea", "Operating area");
      requireField(data.duration, "duration", "Duration");
    }
  });

export type JoinPartnerFormData = z.infer<typeof joinPartnerSchema>;