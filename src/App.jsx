import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    consultationType: '',
    specialties: [],
    sortBy: ''
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = () => {
    const doctorsList = [
      {
        id: '1',
        name: 'Dr. Sarah Wilson',
        specialties: ['Cardiologist', 'Heart Specialist'],
        experience: 15,
        fees: 2500,
        location: 'Manhattan',
        consultationType: 'Video Consult',
        image: 'https://img.freepik.com/free-photo/woman-doctor-posing-hospital_23-2148827784.jpg'
      },
      {
        id: '2',
        name: 'Dr. James Mitchell',
        specialties: ['Dermatologist', 'Cosmetologist'],
        experience: 8,
        fees: 1800,
        location: 'Brooklyn',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg'
      },
      {
        id: '3',
        name: 'Dr. Emily Chen',
        specialties: ['Pediatrician', 'Child Specialist'],
        experience: 12,
        fees: 1500,
        location: 'Queens',
        consultationType: 'Video Consult',
        image: 'https://img.freepik.com/free-photo/portrait-successful-mid-adult-doctor-with-crossed-arms_1262-12865.jpg'
      },
      {
        id: '4',
        name: 'Dr. Michael Rodriguez',
        specialties: ['Orthopedic Surgeon', 'Sports Medicine'],
        experience: 20,
        fees: 3000,
        location: 'Bronx',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/doctor-standing-with-folder-stethoscope_1291-16.jpg'
      },
      {
        id: '5',
        name: 'Dr. Lisa Thompson',
        specialties: ['Neurologist', 'Headache Specialist'],
        experience: 14,
        fees: 2800,
        location: 'Staten Island',
        consultationType: 'Video Consult',
        image: 'https://img.freepik.com/free-photo/woman-doctor-posing-with-stethoscope_23-2148827776.jpg'
      },
      {
        id: '6',
        name: 'Dr. David Kim',
        specialties: ['Psychiatrist', 'Mental Health Expert'],
        experience: 10,
        fees: 2000,
        location: 'Manhattan',
        consultationType: 'Video Consult',
        image: 'https://img.freepik.com/free-photo/pleased-young-male-doctor-wearing-medical-robe-stethoscope-pointing-side_409827-229.jpg'
      },
      {
        id: '7',
        name: 'Dr. Rachel Greene',
        specialties: ['Gynecologist', 'Women\'s Health'],
        experience: 16,
        fees: 2200,
        location: 'Brooklyn',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg'
      },
      {
        id: '8',
        name: 'Dr. Robert Martinez',
        specialties: ['ENT Specialist', 'Head & Neck Surgeon'],
        experience: 11,
        fees: 1900,
        location: 'Queens',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/medical-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-wearing-medical-mask-cross-arms-chest-professional-ready-help-patients_1258-57233.jpg'
      },
      {
        id: '9',
        name: 'Dr. Amanda White',
        specialties: ['Ophthalmologist', 'Eye Surgeon'],
        experience: 13,
        fees: 2100,
        location: 'Manhattan',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/doctor-with-co-workers-analyzing-x-ray_1098-581.jpg'
      },
      {
        id: '10',
        name: 'Dr. John Patel',
        specialties: ['Dentist', 'Dental Surgeon'],
        experience: 9,
        fees: 1200,
        location: 'Brooklyn',
        consultationType: 'In Clinic',
        image: 'https://img.freepik.com/free-photo/portrait-confident-male-doctor_329181-12190.jpg'
      }
    ];
    setDoctors(doctorsList);
  };

  const handleSearch = (value) => {
    setSearchTerm(value)
    if (value.trim() === '') {
      setSuggestions([])
      return
    }
    const matches = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3)
    setSuggestions(matches)
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesConsultationType = !selectedFilters.consultationType || 
      doctor.consultationType === selectedFilters.consultationType
    const matchesSpecialties = selectedFilters.specialties.length === 0 || 
      doctor.specialties.some(specialty => selectedFilters.specialties.includes(specialty))
    return matchesSearch && matchesConsultationType && matchesSpecialties
  })

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (selectedFilters.sortBy === 'fees') return a.fees - b.fees
    if (selectedFilters.sortBy === 'experience') return b.experience - a.experience
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">MediConnect Pro</h1>
            <p className="text-blue-100">Your Trusted Healthcare Partner</p>
          </div>
          <div className="relative">
            <input
              type="text"
              data-testid="autocomplete-input"
              className="w-full p-4 border rounded-lg shadow-sm pl-12 text-lg"
              placeholder="Search Doctors by Name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full max-w-7xl bg-white border rounded-lg mt-1 shadow-lg">
              {suggestions.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    setSearchTerm(doctor.name)
                    setSuggestions([])
                  }}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-gray-500">{doctor.specialties[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              </div>
              
              <div className="space-y-6">
                {/* Sort Options */}
                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sortBy"
                        value="fees"
                        checked={selectedFilters.sortBy === 'fees'}
                        onChange={(e) => setSelectedFilters({
                          ...selectedFilters,
                          sortBy: e.target.value
                        })}
                        className="mr-2"
                      />
                      <span>Fees: Low to High</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sortBy"
                        value="experience"
                        checked={selectedFilters.sortBy === 'experience'}
                        onChange={(e) => setSelectedFilters({
                          ...selectedFilters,
                          sortBy: e.target.value
                        })}
                        className="mr-2"
                      />
                      <span>Experience: Most First</span>
                    </label>
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <h3 className="font-medium mb-3">Mode of Consultation</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="consultationType"
                        value="Video Consult"
                        checked={selectedFilters.consultationType === 'Video Consult'}
                        onChange={(e) => setSelectedFilters({
                          ...selectedFilters,
                          consultationType: e.target.value
                        })}
                        className="mr-2"
                      />
                      <span>Video Consultation</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="consultationType"
                        value="In Clinic"
                        checked={selectedFilters.consultationType === 'In Clinic'}
                        onChange={(e) => setSelectedFilters({
                          ...selectedFilters,
                          consultationType: e.target.value
                        })}
                        className="mr-2"
                      />
                      <span>In-clinic Visit</span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <button 
                  className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  onClick={() => setSelectedFilters({
                    consultationType: '',
                    specialties: [],
                    sortBy: ''
                  })}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-9">
            <div className="space-y-4">
              {sortedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-lg mr-6 object-cover"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {doctor.name}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {doctor.specialties.join(', ')}
                          </p>
                          <p className="text-gray-600 mt-1">
                            {doctor.experience} years experience
                          </p>
                          <div className="flex items-center mt-2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {doctor.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">₹{doctor.fees}</p>
                          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
