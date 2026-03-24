import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfile.css';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profileFor: 'Myself',
    name: '',
    gender: 'male',
    dob: '',
    maritalStatus: 'Unmarried',
    religion: 'Hindu',
    caste: '',
    subCaste: '',
    motherTongue: 'Tamil',
    star: '',
    rasi: '',
    gothram: '',
    education: '',
    profession: '',
    income: '',
    country: 'India',
    state: 'Tamil Nadu',
    city: '',
    familyType: 'Nuclear',
    familyStatus: 'Middle Class',
    fatherOcc: '',
    motherOcc: '',
    about: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to create profile
    alert('Profile Created Successfully! Finding your perfect matches...');
    navigate('/matrimony?created=true');
  };

  return (
    <div className="cp-page">
      <div className="cp-header">
        <div className="container">
          <h1>Create Your Matrimony Profile</h1>
          <p>Join millions of Tamils globally finding their perfect life partner</p>
        </div>
      </div>

      <div className="container cp-container">
        <div className="cp-stepper">
          {['Basic Details', 'Religious Info', 'Professional Info', 'Family Info'].map((label, idx) => (
            <div key={label} className={`cp-step ${step >= idx + 1 ? 'active' : ''} ${step > idx + 1 ? 'completed' : ''}`}>
              <div className="step-circle">{step > idx + 1 ? '✓' : idx + 1}</div>
              <span className="step-label">{label}</span>
              {idx < 3 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        <div className="cp-form-card">
          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            
            {step === 1 && (
              <div className="cp-section">
                <h2>Basic Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Profile Created For</label>
                    <select name="profileFor" value={formData.profileFor} onChange={handleChange}>
                      <option>Myself</option>
                      <option>Son</option>
                      <option>Daughter</option>
                      <option>Brother</option>
                      <option>Sister</option>
                      <option>Relative/Friend</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required placeholder="Enter full name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-toggle">
                      <label className={`g-btn ${formData.gender === 'male' ? 'active' : ''}`}>
                        <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 🤵 Male
                      </label>
                      <label className={`g-btn ${formData.gender === 'female' ? 'active' : ''}`}>
                        <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 👰 Female
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" required value={formData.dob} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                      <option>Unmarried</option>
                      <option>Widow / Widower</option>
                      <option>Divorced</option>
                      <option>Separated</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mother Tongue</label>
                    <select name="motherTongue" value={formData.motherTongue} onChange={handleChange}>
                      <option>Tamil</option>
                      <option>Telugu</option>
                      <option>Malayalam</option>
                      <option>Kannada</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="cp-section">
                <h2>Religious Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Religion</label>
                    <select name="religion" value={formData.religion} onChange={handleChange}>
                      <option>Hindu</option>
                      <option>Christian</option>
                      <option>Muslim</option>
                      <option>Sikh</option>
                      <option>Jain</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Caste</label>
                    <input type="text" name="caste" placeholder="e.g. Mudaliar, Brahmin" value={formData.caste} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Sub-Caste</label>
                    <input type="text" name="subCaste" placeholder="e.g. Saiva Pillai" value={formData.subCaste} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Star / Nakshatra</label>
                    <input type="text" name="star" placeholder="e.g. Rohini" value={formData.star} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Rasi / Moon Sign</label>
                    <input type="text" name="rasi" placeholder="e.g. Rishabam" value={formData.rasi} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Gothram</label>
                    <input type="text" name="gothram" placeholder="If applicable" value={formData.gothram} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="cp-section">
                <h2>Professional & Location Info</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Education</label>
                    <input type="text" name="education" required placeholder="e.g. B.E Computer Science" value={formData.education} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Profession / Occupation</label>
                    <input type="text" name="profession" required placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Annual Income</label>
                    <select name="income" value={formData.income} onChange={handleChange}>
                      <option>Select</option>
                      <option>Less than 3 LPA</option>
                      <option>3 - 6 LPA</option>
                      <option>6 - 10 LPA</option>
                      <option>10 - 15 LPA</option>
                      <option>15+ LPA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Country Residing in</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" required placeholder="e.g. Chennai" value={formData.city} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="cp-section">
                <h2>Family Details & About</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Family Type</label>
                    <select name="familyType" value={formData.familyType} onChange={handleChange}>
                      <option>Nuclear Family</option>
                      <option>Joint Family</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Family Status</label>
                    <select name="familyStatus" value={formData.familyStatus} onChange={handleChange}>
                      <option>Middle Class</option>
                      <option>Upper Middle Class</option>
                      <option>Rich / Affluent</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Father's Occupation</label>
                    <input type="text" name="fatherOcc" placeholder="e.g. Business, Retired" value={formData.fatherOcc} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Mother's Occupation</label>
                    <input type="text" name="motherOcc" placeholder="e.g. Homemaker" value={formData.motherOcc} onChange={handleChange} />
                  </div>
                  <div className="form-group f-full">
                    <label>About Yourself</label>
                    <textarea name="about" rows="4" required placeholder="Write a few lines about your personality, hobbies, and partner expectations..." value={formData.about} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>
            )}

            <div className="cp-actions">
              {step > 1 && (
                <button type="button" className="btn-prev" onClick={prevStep}>← Back</button>
              )}
              {step < 4 ? (
                <button type="submit" className="btn-next">Next Step →</button>
              ) : (
                <button type="submit" className="btn-submit">✅ Create Profile</button>
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
