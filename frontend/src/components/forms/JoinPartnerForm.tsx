"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  joinPartnerSchema,
  JoinPartnerFormData,
} from "@/lib/validations/join-partner-schema";

const defaultValues: JoinPartnerFormData = {
  serviceType: "",
  businessName: "",
  contactPerson: "",
  email: "",
  phone: "",
  city: "",
  description: "",

  address: "",
  googleMapsLink: "",
  propertyType: "",
  roomCount: "",
  amenities: "",

  vehicleCategory: "",
  fleetSize: "",
  seatCapacity: "",
  driverAvailable: false,
  airportPickup: false,
  serviceAreas: "",

  languages: "",
  regionsCovered: "",
  guideLicense: "",
  experienceYears: "",

  cuisineType: "",
  openingHours: "",
  dineInAvailable: false,
  takeawayAvailable: false,

  activityType: "",
  duration: "",
  ageSuitability: "",
  safetyNotes: "",
  operatingArea: "",
};

export default function JoinPartnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<JoinPartnerFormData>({
    resolver: zodResolver(joinPartnerSchema),
    defaultValues,
  });

  const serviceType = watch("serviceType");
  const hasSelectedService = !!serviceType;

  useEffect(() => {
    if (!serviceType) return;

    if (serviceType !== "hotel") {
      resetField("address");
      resetField("googleMapsLink");
      resetField("propertyType");
      resetField("roomCount");
      resetField("amenities");
    }

    if (serviceType !== "vehicle-rental") {
      resetField("vehicleCategory");
      resetField("fleetSize");
      resetField("seatCapacity");
      resetField("driverAvailable");
      resetField("airportPickup");
      resetField("serviceAreas");
    }

    if (serviceType !== "tour-guide") {
      resetField("languages");
      resetField("regionsCovered");
      resetField("guideLicense");
      resetField("experienceYears");
    }

    if (serviceType !== "restaurant") {
      resetField("cuisineType");
      resetField("openingHours");
      resetField("dineInAvailable");
      resetField("takeawayAvailable");
    }

    if (serviceType !== "activity-provider") {
      resetField("activityType");
      resetField("duration");
      resetField("ageSuitability");
      resetField("safetyNotes");
      resetField("operatingArea");
    }

    if (serviceType !== "hotel" && serviceType !== "restaurant") {
      resetField("address");
    }
  }, [serviceType, resetField]);

  const onSubmit = async (data: JoinPartnerFormData) => {
    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const res = await fetch("/api/join-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Submission failed");
      }

      setSuccessMessage("Application submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Join Our Partner Network
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-400">
          Select the service type you provide to load the relevant partner application form.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="max-w-xl mx-auto">
          <Field
            label="Service Type"
            error={errors.serviceType?.message}
            input={
              <select
                {...register("serviceType")}
                className={`${inputClass} ${!serviceType ? "text-white/45" : "text-white"}`}
              >
                <option value="" disabled className="bg-neutral-900 text-white/50">
                  Select the service type you provide
                </option>
                <option value="hotel" className="bg-neutral-900 text-white">Hotel / Resort / Villa</option>
                <option value="vehicle-rental" className="bg-neutral-900 text-white">Vehicle Rental / Transport</option>
                <option value="tour-guide" className="bg-neutral-900 text-white">Tour Guide</option>
                <option value="restaurant" className="bg-neutral-900 text-white">Restaurant / Cafe</option>
                <option value="activity-provider" className="bg-neutral-900 text-white">Activity Provider</option>
              </select>
            }
          />
        </div>

        {!hasSelectedService && (
          <div className="rounded-2xl border border-dashed border-[#d4af37]/30 bg-[#d4af37]/5 px-6 py-8 text-center">
            <p className="text-sm md:text-base text-gray-300">
              Please select your service type first. The relevant application form will appear here.
            </p>
          </div>
        )}

        {hasSelectedService && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field
                label="Business Name"
                error={errors.businessName?.message}
                input={<input {...register("businessName")} className={inputClass} />}
              />
              <Field
                label="Contact Person"
                error={errors.contactPerson?.message}
                input={<input {...register("contactPerson")} className={inputClass} />}
              />
              <Field
                label="Email"
                error={errors.email?.message}
                input={<input {...register("email")} type="email" className={inputClass} />}
              />
              <Field
                label="Phone"
                error={errors.phone?.message}
                input={<input {...register("phone")} className={inputClass} />}
              />
              <Field
                label="City / Main Location"
                error={errors.city?.message}
                input={<input {...register("city")} className={inputClass} />}
              />
            </div>

            <Field
              label="Business Description"
              error={errors.description?.message}
              input={<textarea {...register("description")} rows={4} className={textareaClass} />}
            />

            {serviceType === "hotel" && (
              <div className="space-y-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <h3 className="text-lg font-semibold text-[#d4af37]">Hotel Details</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Business Address"
                    error={errors.address?.message}
                    input={<input {...register("address")} className={inputClass} />}
                  />
                  <Field
                    label="Google Maps Link"
                    error={errors.googleMapsLink?.message}
                    input={<input {...register("googleMapsLink")} className={inputClass} />}
                  />
                  <Field
                    label="Property Type"
                    error={errors.propertyType?.message}
                    input={<input {...register("propertyType")} className={inputClass} />}
                  />
                  <Field
                    label="Room Count"
                    error={errors.roomCount?.message}
                    input={<input {...register("roomCount")} className={inputClass} />}
                  />
                </div>
                <Field
                  label="Amenities"
                  error={errors.amenities?.message}
                  input={<textarea {...register("amenities")} rows={3} className={textareaClass} />}
                />
              </div>
            )}

            {serviceType === "vehicle-rental" && (
              <div className="space-y-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <h3 className="text-lg font-semibold text-[#d4af37]">Transport Details</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Vehicle Category"
                    error={errors.vehicleCategory?.message}
                    input={<input {...register("vehicleCategory")} className={inputClass} />}
                  />
                  <Field
                    label="Fleet Size"
                    error={errors.fleetSize?.message}
                    input={<input {...register("fleetSize")} className={inputClass} />}
                  />
                  <Field
                    label="Seat Capacity"
                    error={errors.seatCapacity?.message}
                    input={<input {...register("seatCapacity")} className={inputClass} />}
                  />
                  <Field
                    label="Service Areas"
                    error={errors.serviceAreas?.message}
                    input={<input {...register("serviceAreas")} className={inputClass} />}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex items-center gap-3 text-sm text-white/80">
                    <input type="checkbox" {...register("driverAvailable")} />
                    Driver available
                  </label>
                  <label className="flex items-center gap-3 text-sm text-white/80">
                    <input type="checkbox" {...register("airportPickup")} />
                    Airport pickup available
                  </label>
                </div>
              </div>
            )}

            {serviceType === "tour-guide" && (
              <div className="space-y-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <h3 className="text-lg font-semibold text-[#d4af37]">Guide Details</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Languages"
                    error={errors.languages?.message}
                    input={<input {...register("languages")} className={inputClass} />}
                  />
                  <Field
                    label="Regions Covered"
                    error={errors.regionsCovered?.message}
                    input={<input {...register("regionsCovered")} className={inputClass} />}
                  />
                  <Field
                    label="License Status"
                    error={errors.guideLicense?.message}
                    input={<input {...register("guideLicense")} className={inputClass} />}
                  />
                  <Field
                    label="Years of Experience"
                    error={errors.experienceYears?.message}
                    input={<input {...register("experienceYears")} className={inputClass} />}
                  />
                </div>
              </div>
            )}

            {serviceType === "restaurant" && (
              <div className="space-y-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <h3 className="text-lg font-semibold text-[#d4af37]">Restaurant Details</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Business Address"
                    error={errors.address?.message}
                    input={<input {...register("address")} className={inputClass} />}
                  />
                  <Field
                    label="Cuisine Type"
                    error={errors.cuisineType?.message}
                    input={<input {...register("cuisineType")} className={inputClass} />}
                  />
                  <Field
                    label="Opening Hours"
                    error={errors.openingHours?.message}
                    input={<input {...register("openingHours")} className={inputClass} />}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex items-center gap-3 text-sm text-white/80">
                    <input type="checkbox" {...register("dineInAvailable")} />
                    Dine-in available
                  </label>
                  <label className="flex items-center gap-3 text-sm text-white/80">
                    <input type="checkbox" {...register("takeawayAvailable")} />
                    Takeaway available
                  </label>
                </div>
              </div>
            )}

            {serviceType === "activity-provider" && (
              <div className="space-y-5 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <h3 className="text-lg font-semibold text-[#d4af37]">Activity Details</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Activity Type"
                    error={errors.activityType?.message}
                    input={<input {...register("activityType")} className={inputClass} />}
                  />
                  <Field
                    label="Operating Area"
                    error={errors.operatingArea?.message}
                    input={<input {...register("operatingArea")} className={inputClass} />}
                  />
                  <Field
                    label="Duration"
                    error={errors.duration?.message}
                    input={<input {...register("duration")} className={inputClass} />}
                  />
                  <Field
                    label="Age Suitability"
                    error={errors.ageSuitability?.message}
                    input={<input {...register("ageSuitability")} className={inputClass} />}
                  />
                </div>
                <Field
                  label="Safety Notes"
                  error={errors.safetyNotes?.message}
                  input={<textarea {...register("safetyNotes")} rows={3} className={textareaClass} />}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#d4af37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c35c] disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            {successMessage && (
              <p className="text-center text-sm text-green-400">{successMessage}</p>
            )}
          </>
        )}
      </form>
    </section>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  input: React.ReactNode;
};

function Field({ label, error, input }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/85">{label}</label>
      {input}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#d4af37]";

const textareaClass =
  "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]";