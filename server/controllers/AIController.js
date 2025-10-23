//controller for enhacing a resume's professional summary
//POST : /api/ai/enchance-pro-sum

import openai from "../configs/openAI.js";
import Resume from "../models/Resume.js";

export const enchanceProfessinalSummary = async(req,res) => {
    try {
        const {userContent} = req.body;
        if(!userContent){
            res.status(400).json({message : "Missing required data"});

        }
    const response = await openai.chat.completions.create({
    model: process.env.OPEN_AI_MODEL,
    messages: [
        { role: "system", content: "Improve the Professional Summary section of my resume. Rewrite it to sound professional and concise (3-5 sentences), focused on measurable impact, leadership, and technical or domain expertise. Optimize it for ATS (App) Only return text"},
        {
            role: "user",
            content: userContent,
        },
    ],
});
 const enhanceSummary = response.choices[0].message;
 return res.status(200).json({enhanceSummary})
    }
    catch(error){
        return res.status(400).json({message : error.message})

    }
}


export const enchanceJobDesc = async(req,res) => {
    try {
        const {userContent} = req.body;
        if(!userContent){
            res.status(400).json({message : "Missing required data"});

        }
    const response = await openai.chat.completions.create({
    model: process.env.OPEN_AI_MODEL,
    messages: [
        { role: "system", content: "Improve the Job Description section of my resume. Rewrite it to sound professional and concise (3-5 sentences), focused on measurable impact, leadership, and technical or domain expertise. Optimize it for ATS (App) Only return text, Use Action Verbs and Quantifiable variables"},
        {
            role: "user",
            content: userContent,
        },
    ],
});
 const enhanceDesc = response.choices[0].message;
 return res.status(200).json({enhanceDesc})
    }
    catch(error){
        return res.status(400).json({message : error.message})

    }
}


//controller for uploading a resume to the database 
//POST : /api/ai/upload-resume

export const uploadResume = async(req,res) => {
    try {
        const {resumeText , title} = req.body;
        const userId = req.userId

        if(!resumeText){
             res.status(400).json({message : "Missing required data"});
        }

    const systemPrompt = "You are an expert AI agent to extract data from resume."
    const userPrompt = `extract data from this resume ${resumeText} 
    Provide data in the following JSON format with no additional text before or after:
    {
    professional_summary : {
        type: String,
        default : ""
    },
    skills: [String],
    personal_info: {
        full_name: {type : String , default : "" },
        email: {type : String , default : "" },
        phone: {type : String , default : "" },
        location: {type : String , default : "" },
        linkedIn: {type : String , default : "" },
        website: {type : String , default : "" },
        profession: {type : String , default : "" },
        image: {type : String , default : "" },
    },
    education: [
        {
            institution: {type : String  },
            degree: {type : String  },
            field: {type : String  },
            graduation_date: {type : String  },
            gpa: {type : String  } 
        }
    ],
    experience: [
        {
            company: {type : String  },
            position: {type : String  },
            start_date: {type : String  },
            end_date: {type : String  },
            description: {type : String },
            is_current: {type : Boolean , default : false },

        }
    ],
    
    projects: [
        {
            name: {type : String  },
            type : {type : String  },
            description: {type : String  },
        }
    ]
    }     
    `

  const response = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0,
    });

    const extracted = response.choices[0].message.content.trim().replace(/```json|```/g, "");
    const parsedData = JSON.parse(extracted);

    const newResume = await Resume.create({ userId, title, ...parsedData });
    return res.status(200).json({ resumeId: newResume._id });
    }
    catch (error) {
  console.error("Error uploading resume:", error.response?.data || error.message || error);
  return res.status(400).json({ message: error.message });
}

}