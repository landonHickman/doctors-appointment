class Patient < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :doctors, through: :appointments

  def get_doctors_with_appointments
    appDate = self.doctors.map do |doctor|
     appointment = doctor.appointments.find_by(patient_id: self.id)
      {doctor: doctor.name, appDate: appointment.date}
    end
    return {patient: self, appointment: appDate}
  end
end
