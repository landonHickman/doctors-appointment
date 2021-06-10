class Doctor < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :patients, through: :appointments

  def get_patient_with_appointments
    date = self.patients.map do |patient|
      appointment = patient.appointments.find_by(doctor_id: self.id)
      {patient: patient.name, date: appointment.date}
    end
    return {doctor: self.name, appointment: date}
  end
end
