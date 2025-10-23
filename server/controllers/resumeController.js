//controllers for contacting resume data
//GET /api/resume/creare

import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
    try{    
        const userId = req.userId;
        const {title} = req.body;
        //Logic for creating resume for userId

        const newResume = await Resume.create({ userId, title });
        res.status(200).json({ message : "Resume created successfully" , resume: newResume });
    }
    catch (error) {
        console.error("Error in createResume:", error);
        res.status(500).json({ message: "Server Error" });
    }
}       

//controller to delete resume
//DELETE /api/resume/:id
export const deleteResume = async (req, res) => {
    try{    
        const userId = req.userId;
        const resumeId = req.params.id;

        const resume = await Resume.findOne({ _id: resumeId, userId });
        if(!resume){
            return  res.status(404).json({ message : "Resume not found"});
        }

        await Resume.deleteOne({ _id: resumeId });
        res.status(200).json({ message : "Resume deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteResume:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

//Get user resumes by ID
//GET /api/resume/get
export const getResumeByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // Use .lean() to get plain JS objects instead of Mongoose documents
    const resumes = await Resume.find({ userId, _id: resumeId }).lean();

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Assuming you only expect one resume for a given userId + resumeId
    let resume = resumes[0];

    // ✅ Normalize field name: personal_info → professional_info
    if (resume.personal_info && !resume.professional_info) {
      resume.professional_info = { ...resume.personal_info };
      delete resume.personal_info;
    }

    // ✅ Ensure consistent array fields
    resume.skills = Array.isArray(resume.skills) ? resume.skills : [];
    resume.education = Array.isArray(resume.education) ? resume.education : [];
    resume.experience = Array.isArray(resume.experience) ? resume.experience : [];
    resume.projects = Array.isArray(resume.projects) ? resume.projects : [];

    // ✅ Hide unwanted fields
    delete resume.__v;
    delete resume.createdAt;
    delete resume.updatedAt;

    // ✅ Send the normalized resume
    res.status(200).json({ resume });

  } catch (error) {
    console.error("Error in getResumeByUserId:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get Resume by public ID 

//Get : /api/resume/public

export const getResumeByPublicId = async (req, res) => {
    try{    
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public : true , _id : resumeId });
        if(!resume){
            return res.status(404).json({ message : "Resume not found"});
        }
        resume.__v = undefined; //hide __v field
        resume.createdAt = undefined; //hide createdAt field
        resume.updatedAt = undefined; //hide updatedAt field
        res.status(200).json({ resume });
    }
    catch (error) {
        console.error("Error in getResumeByPublicId:", error);
        res.status(500).json({ message: "Server Error" });
    }
}


//controller to update resume data
//PUT /api/resume/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData } = req.body;

    console.log("Received resumeData:", resumeData);

    if (!resumeId || !resumeData) {
      return res
        .status(400)
        .json({ message: "resumeId and resumeData are required" });
    }

    // ✅ If resumeData comes as string, parse it
    const resumeDataCopy =
      typeof resumeData === "string" ? JSON.parse(resumeData) : structuredClone(resumeData);

    // ✅ Normalize: Convert personal_info → professional_info
    if (resumeDataCopy.personal_info && !resumeDataCopy.professional_info) {
      resumeDataCopy.professional_info = { ...resumeDataCopy.personal_info };
      delete resumeDataCopy.personal_info;
    }

    // ✅ Ensure professional_info always exists
    if (!resumeDataCopy.professional_info) {
      resumeDataCopy.professional_info = {
        full_name: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        website: "",
        profession: "",
        image: "",
      };
    }

    // ✅ Ensure arrays exist
    resumeDataCopy.skills = Array.isArray(resumeDataCopy.skills)
      ? resumeDataCopy.skills
      : [];
    resumeDataCopy.education = Array.isArray(resumeDataCopy.education)
      ? resumeDataCopy.education
      : [];
    resumeDataCopy.experience = Array.isArray(resumeDataCopy.experience)
      ? resumeDataCopy.experience
      : [];
    resumeDataCopy.projects = Array.isArray(resumeDataCopy.projects)
      ? resumeDataCopy.projects
      : [];

    // ✅ Perform update
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeDataCopy,
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ Normalize before sending back
    const normalizedResume = updatedResume.toObject();
    if (normalizedResume.personal_info && !normalizedResume.professional_info) {
      normalizedResume.professional_info = { ...normalizedResume.personal_info };
      delete normalizedResume.personal_info;
    }

    res
      .status(200)
      .json({ message: "Resume updated successfully", resume: normalizedResume });
  } catch (error) {
    console.error("Error in updateResume:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
