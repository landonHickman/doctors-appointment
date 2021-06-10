# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Patient.destroy_all
Doctor.destroy_all
Test.destroy_all

day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

Test.create( name: 'test1')
Test.create( name: 'test2')
Test.create( name: 'test3')

stan = Patient.create( name: 'Stan')
cartman = Patient.create( name: 'Cartman')
kenny = Patient.create( name: 'Kenny')
kyle = Patient.create( name: 'Kyle')

horatio = Doctor.create( name: 'Dr. Horatio')
hillman = Doctor.create( name: 'Dr. Hillman')
hickens = Doctor.create( name: 'Dr. Hickens')
henderson = Doctor.create( name: 'Dr. Henderson')

stan.appointments.create( date: day.sample, doctor_id: horatio.id )
stan.appointments.create( date: day.sample, doctor_id: hillman.id )

cartman.appointments.create( date: day.sample, doctor_id: hickens.id )
cartman.appointments.create( date: day.sample, doctor_id: hillman.id )

kenny.appointments.create( date: day.sample, doctor_id: henderson.id )
kenny.appointments.create( date: day.sample, doctor_id: horatio.id )

kyle.appointments.create( date: day.sample, doctor_id: hillman.id )
kyle.appointments.create( date: day.sample, doctor_id: hickens.id )

puts  Patient.all.size
puts Doctor.all.size
puts Appointment.all.size