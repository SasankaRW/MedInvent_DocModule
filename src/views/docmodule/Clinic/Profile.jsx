import Title from "../../../Components/Title";

let clinicInfo = {
  name: "Example Clinic",
  address: "123 Example Street, City, Country",
  emailAddress: "info@exampleclinic.com",
  contactNumber: "+1234567890",
  openHours: {
    from: "9:00 AM",
    to: "5:00 PM",
  },
  clinicFees: "$50",
  location: {
    lat: 6.794668,
    long: 79.901444,
  },
  visitingDoctors: [
    "Dr. Emily Watson",
    "Dr. Michael Brown",
    "Dr. Sophia Johnson",
    "Dr. Ethan Smith",
  ],
};

function Profile() {
  const mapURL = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.3885038149997!2d${clinicInfo.location.long}!3d${clinicInfo.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTAnMzguMiJOIDc5wrA1NycyMi45IkU!5e0!3m2!1sen!2slk!4v1709995715108!5m2!1sen!2slk`;
  return (
    <div>
      <Title>Profile</Title>
      <div className="row container">
        <div className="col-lg-6 col-md-6 col-12 bg-white shadow rounded-5 p-2">
          <div className="container p-4">
            <div className="d-flex align-items-center">
              <img src={"/images/dp.png"} alt="" height={80} />
              <div className="mx-4">
                <h3 className="my-0">{clinicInfo.name}</h3>
              </div>
            </div>
          </div>
          <hr className="mx-4 my-0" />
          <div className="container p-4">
            <div className="row mb-3">
              <div className="col-4 text-muted">Address</div>
              <div className="col-8">{clinicInfo.address}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Email Address</div>
              <div className="col-8">{clinicInfo.emailAddress}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Contact Number</div>
              <div className="col-8">{clinicInfo.contactNumber}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Open Hours</div>
              <div className="col-8">
                {clinicInfo.openHours.from} to {clinicInfo.openHours.to}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Clinic Fees</div>
              <div className="col-8">{clinicInfo.clinicFees}</div>
            </div>

            <div className="row mb-3">
              <div className="col-4 text-muted">Location</div>
              <div className="col-8">
                <iframe
                  className="rounded-4"
                  title="map"
                  src={mapURL}
                  width="100%"
                  height="200"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-12 bg-white shadow rounded-5 p-2 mx-md-4 mt-md-0 mt-sm-3 mt-3">
          <div className="container p-4 lead">Visiting Doctors</div>
          <hr className="my-0 mx-4" />
          <div
            className="container p-4 overflow-y-auto"
            style={{ maxHeight: "60vh", scrollbarWidth: "thin" }}
          >
            {clinicInfo.visitingDoctors.map((doctor) => (
              <div
                className="mb-2 p-3 rounded-4"
                style={{
                  backgroundColor: "#edf8ff",
                }}
              >
                {doctor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
