class Appointment < ApplicationRecord
  belongs_to :patient
  belongs_to :doctor

  def self.doctor_and_patient
    appointments = Appointment.all
    appointments.map do |app|
      {id: app.id,
      patient_id: app.patient.id,
      doctor_id: app.doctor.id,
      date: app.date,
      patientName: app.patient.name,
      doctorName: app.doctor.name}
    end
  end
end
